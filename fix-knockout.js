const fs = require('fs');

// ===== TEAM CODE MAP =====
const teamCodes = {
  'Mexico': 'mx', 'South Korea': 'kr', 'Czechia': 'cz', 'South Africa': 'za',
  'Canada': 'ca', 'Switzerland': 'ch', 'Bosnia-Herzegovina': 'ba', 'Qatar': 'qa',
  'Brazil': 'br', 'Morocco': 'ma', 'Scotland': 'gb-sct', 'Haiti': 'ht',
  'United States': 'us', 'Australia': 'au', 'Paraguay': 'py', 'Türkiye': 'tr',
  'Germany': 'de', 'Ivory Coast': 'ci', 'Ecuador': 'ec', 'Curaçao': 'cw',
  'Sweden': 'se', 'Netherlands': 'nl', 'Japan': 'jp', 'Tunisia': 'tn',
  'IR Iran': 'ir', 'Iran': 'ir', 'New Zealand': 'nz', 'Belgium': 'be', 'Egypt': 'eg',
  'Saudi Arabia': 'sa', 'Uruguay': 'uy', 'Spain': 'es', 'Cape Verde': 'cv',
  'Norway': 'no', 'France': 'fr', 'Senegal': 'sn', 'Iraq': 'iq',
  'Argentina': 'ar', 'Austria': 'at', 'Jordan': 'jo', 'Algeria': 'dz',
  'Colombia': 'co', 'Portugal': 'pt', 'Congo DR': 'cd', 'Uzbekistan': 'uz',
  'England': 'gb-eng', 'Ghana': 'gh', 'Panama': 'pa', 'Croatia': 'hr',
};

function getCode(teamName) { return teamCodes[teamName] || null; }
function getFlagUrl(code) { return code ? `https://flagcdn.com/w160/${code}.png` : null; }

// ===== LOAD DATA =====
console.log('Loading data...');
const fixtures = JSON.parse(fs.readFileSync('fixtures.json', 'utf8'));
const standings = JSON.parse(fs.readFileSync('standings.json', 'utf8'));

// Track used 3rd-place teams to avoid duplicates
const usedThirdPlaces = new Set();

// ===== RESOLVE TEAM =====
function resolveTeam(label, isThirdPlaceSlot) {
  if (!label) return { name: label, code: null, flag: null };

  // Already a real team name
  const code = getCode(label);
  if (code) return { name: label, code, flag: getFlagUrl(code) };

  // "Runner-up Group X" -> 2nd place
  const ruMatch = label.match(/Runner-up Group ([A-L])/i);
  if (ruMatch) {
    const group = ruMatch[1].toUpperCase();
    const t = standings.groups[group]?.teams?.[1];
    if (t) {
      const c = getCode(t.name);
      return { name: t.name, code: c, flag: getFlagUrl(c) };
    }
  }

  // "Winner Group X" or "Group X Winner" -> 1st place
  const wMatch = label.match(/(?:Winner Group|Group) ([A-L])(?:\s*Winner)?/i);
  if (wMatch && !label.match(/2nd Place/i)) {
    const group = wMatch[1].toUpperCase();
    const t = standings.groups[group]?.teams?.[0];
    if (t) {
      const c = getCode(t.name);
      return { name: t.name, code: c, flag: getFlagUrl(c) };
    }
  }

  // "Group X 2nd Place" -> 2nd place
  const g2Match = label.match(/Group ([A-L]) 2nd Place/i);
  if (g2Match) {
    const group = g2Match[1].toUpperCase();
    const t = standings.groups[group]?.teams?.[1];
    if (t) {
      const c = getCode(t.name);
      return { name: t.name, code: c, flag: getFlagUrl(c) };
    }
  }

  // "3rd Place X/Y/Z" or "Third Place Group X/Y/Z" -> best 3rd place from eligible groups (excluding used)
  const tpMatch = label.match(/(?:3rd Place|Third Place)\s*(?:Group\s*)?([A-L\/]+)/i);
  if (tpMatch) {
    const eligibleGroups = tpMatch[1].split('/').map(g => g.trim().toUpperCase());
    const candidates = eligibleGroups
      .map(grp => {
        const t = standings.groups[grp]?.teams?.[2];
        if (t && !usedThirdPlaces.has(t.name)) {
          return { ...t, group: grp };
        }
        return null;
      })
      .filter(Boolean);

    if (candidates.length > 0) {
      candidates.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });
      const best = candidates[0];
      usedThirdPlaces.add(best.name);
      const c = getCode(best.name);
      return { name: best.name, code: c, flag: getFlagUrl(c), group: best.group };
    }
  }

  // Can't resolve yet (e.g. "Round of 32 1 Winner")
  return { name: label, code: null, flag: null };
}

// ===== FIXTURES ARRAY - KNOCKOUT ENTRIES =====
console.log('Fixing knockout fixtures...');

let flagsFixed = 0;
const knockoutStages = {
  ROUND_OF_32: { name: 'Round of 32', key: 'roundOf32' },
  ROUND_OF_16: { name: 'Round of 16', key: 'roundOf16' },
  QUARTERFINALS: { name: 'Quarterfinals', key: 'quarterfinals' },
  SEMIFINALS: { name: 'Semifinals', key: 'semifinals' },
  '3RD_PLACE_MATCH': { name: '3rd Place Match', key: 'thirdPlace' },
  FINAL: { name: 'Final', key: 'final' },
};

// First pass: resolve all knockout entries
fixtures.fixtures.forEach(f => {
  if (f.stage === 'GROUP_STAGE') return;

  const homeResolved = resolveTeam(f.homeTeam, false);
  if (homeResolved.code) {
    f.homeTeam = homeResolved.name;
    f.homeCode = homeResolved.code;
    f.homeFlag = homeResolved.flag;
    flagsFixed++;
  } else if (homeResolved.flag) {
    f.homeFlag = homeResolved.flag;
  }

  const awayResolved = resolveTeam(f.awayTeam, true);
  if (awayResolved.code) {
    f.awayTeam = awayResolved.name;
    f.awayCode = awayResolved.code;
    f.awayFlag = awayResolved.flag;
    flagsFixed++;
  } else if (awayResolved.flag) {
    f.awayFlag = awayResolved.flag;
  }
});

// Build knockoutStage structure
const knockoutStage = {};
for (const [stage, info] of Object.entries(knockoutStages)) {
  const matches = fixtures.fixtures
    .filter(f => f.stage === stage)
    .sort((a, b) => {
      const dateCmp = new Date(a.date) - new Date(b.date);
      if (dateCmp !== 0) return dateCmp;
      return (a.time || '').localeCompare(b.time || '');
    })
    .map(f => {
      const homeName = f.homeCode && f.homeCode !== 'un' ? f.homeTeam : (f.homeTeam || 'TBD');
      const awayName = f.awayCode && f.awayCode !== 'un' ? f.awayTeam : (f.awayTeam || 'TBD');

      let label = f.label;
      if (!label || label === 'undefined') {
        label = `${homeName} vs ${awayName}`;
      }

      return {
        id: f.id,
        date: f.date,
        time: f.time,
        venue: f.venue,
        city: f.city,
        label,
        homeTeam: f.homeTeam,
        homeCode: f.homeCode,
        homeFlag: f.homeFlag,
        awayTeam: f.awayTeam,
        awayCode: f.awayCode,
        awayFlag: f.awayFlag,
        status: f.status || 'timed',
        homeScore: f.homeScore,
        awayScore: f.awayScore,
      };
    });

  knockoutStage[info.key] = { name: info.name, matches };
}

fixtures.knockoutStage = knockoutStage;

// Ensure all flag URLs are set
fixtures.fixtures.forEach(f => {
  if (f.homeCode && f.homeCode !== 'un') f.homeFlag = getFlagUrl(f.homeCode);
  if (f.awayCode && f.awayCode !== 'un') f.awayFlag = getFlagUrl(f.awayCode);
});

fixtures.lastUpdated = new Date().toISOString();
fs.writeFileSync('fixtures.json', JSON.stringify(fixtures, null, 2));
console.log(`Fixed ${flagsFixed} flag codes`);

// ===== SCORES =====
console.log('\nFixing scores.json...');
const scores = JSON.parse(fs.readFileSync('scores.json', 'utf8'));

// Update existing scores entries with resolved team names/flags
const updateEntry = (entry) => {
  const fix = fixtures.fixtures.find(f => f.id === entry.id);
  if (fix) {
    if (fix.homeCode !== 'un') { entry.homeTeam = fix.homeTeam; entry.homeCode = fix.homeCode; }
    if (fix.awayCode !== 'un') { entry.awayTeam = fix.awayTeam; entry.awayCode = fix.awayCode; }
  }
};
scores.liveMatches?.forEach(updateEntry);
scores.recentResults?.forEach(updateEntry);
scores.upcomingMatches?.forEach(updateEntry);

// Add finished knockout to recentResults
const finishedKO = fixtures.fixtures.filter(f =>
  f.stage !== 'GROUP_STAGE' &&
  ['finished', 'ft', 'aet', 'pen'].includes(f.status) &&
  f.homeScore != null && f.awayScore != null
);
finishedKO.forEach(f => {
  if (!scores.recentResults?.some(r => r.id === f.id)) {
    if (!scores.recentResults) scores.recentResults = [];
    scores.recentResults.unshift({
      id: f.id, date: f.date, time: f.time, utcDate: f.utcDate,
      homeTeam: f.homeTeam, homeCode: f.homeCode, homeScore: f.homeScore,
      awayTeam: f.awayTeam, awayCode: f.awayCode, awayScore: f.awayScore,
      venue: f.venue, city: f.city, status: f.status, stage: f.stage,
      matchday: f.matchday, minute: f.minute, halfTime: f.halfTime,
    });
  }
});

// Add upcoming knockout to upcomingMatches
const upcomingKO = fixtures.fixtures.filter(f =>
  f.stage !== 'GROUP_STAGE' && ['timed', 'scheduled'].includes(f.status)
);
upcomingKO.forEach(f => {
  if (!scores.upcomingMatches?.some(r => r.id === f.id)) {
    if (!scores.upcomingMatches) scores.upcomingMatches = [];
    scores.upcomingMatches.push({
      id: f.id, date: f.date, time: f.time, utcDate: f.utcDate,
      homeTeam: f.homeTeam, homeCode: f.homeCode,
      awayTeam: f.awayTeam, awayCode: f.awayCode,
      venue: f.venue, city: f.city, status: f.status, stage: f.stage, matchday: f.matchday || 0,
    });
  }
});

scores.lastUpdated = new Date().toISOString();
fs.writeFileSync('scores.json', JSON.stringify(scores, null, 2));
console.log(`Added ${finishedKO.length} finished + ${upcomingKO.length} upcoming knockout to scores`);

// ===== SUMMARY =====
console.log('\n=== ROUND OF 32 ===');
knockoutStage.roundOf32.matches.forEach((m, i) => {
  const hf = m.homeCode && m.homeCode !== 'un' ? `[${m.homeCode}]` : '[???]';
  const af = m.awayCode && m.awayCode !== 'un' ? `[${m.awayCode}]` : '[???]';
  const score = m.homeScore != null ? ` (${m.homeScore}-${m.awayScore})` : '';
  console.log(`  ${i+1}. ${m.homeTeam || 'TBD'} ${hf} vs ${m.awayTeam || 'TBD'} ${af}${score}`);
});

console.log('\n=== ROUND OF 16 ===');
knockoutStage.roundOf16.matches.forEach((m, i) => {
  const hf = m.homeCode && m.homeCode !== 'un' ? `[${m.homeCode}]` : '[???]';
  const af = m.awayCode && m.awayCode !== 'un' ? `[${m.awayCode}]` : '[???]';
  console.log(`  ${i+1}. ${m.homeTeam || 'TBD'} ${hf} vs ${m.awayTeam || 'TBD'} ${af}`);
});

console.log('\nDone!');
