const fs = require('fs');

// ===== FLAG CODE CORRECTIONS =====
const flagFixes = {
  "United States": "us",
  "Cape Verde": "cv",
  "Cabo Verde": "cv",
  "Curaçao": "cw",
  "Curacao": "cw",
  "Jordan": "jo",
  "Algeria": "dz",
  "Uzbekistan": "uz",
  "Congo DR": "cd",
  "DR Congo": "cd",
};

// ===== TEAM NAME NORMALIZATION =====
// The fixtures.json and embedded_fixtures.js sometimes use different names
const nameNormalization = {
  "Bosnia and Herzegovina": "Bosnia-Herzegovina",
  "IR Iran": "IR Iran",
  "Iran": "IR Iran",
  "Cabo Verde": "Cape Verde",
  "DR Congo": "Congo DR",
  "Curaçao": "Curaçao",
  "Türkiye": "Türkiye",
};

// Reverse normalization for standings lookup (group def name → possible fixture names)
const reverseNameNormalization = {
  "IR Iran": ["IR Iran", "Iran"],
  "Cape Verde": ["Cape Verde", "Cabo Verde"],
  "Congo DR": ["Congo DR", "DR Congo"],
  "Curaçao": ["Curaçao", "Curacao"],
  "Türkiye": ["Türkiye", "Turkey"],
};

function normalizeName(name) {
  return nameNormalization[name] || name;
}

// ===== LOAD EMBEDDED FIXTURES FOR MATCHDAY LOOKUP =====
console.log('Loading embedded_fixtures.js for matchday lookup...');
const embeddedContent = fs.readFileSync('embedded_fixtures.js', 'utf8');
const embeddedMatch = embeddedContent.match(/const embeddedFixtures = (\[.*?\]);/s);
if (!embeddedMatch) {
  console.error('Could not parse embedded_fixtures.js');
  process.exit(1);
}
const embeddedFixtures = eval(embeddedMatch[1]);

// Build lookup: group + normalized homeTeam + normalized awayTeam → matchday
const matchdayLookup = {};
embeddedFixtures.forEach(f => {
  const home = normalizeName(f.homeTeam);
  const away = normalizeName(f.awayTeam);
  const key = `${f.group}|${home}|${away}`;
  matchdayLookup[key] = f.matchday;
});

console.log(`Built matchday lookup with ${Object.keys(matchdayLookup).length} entries`);

// ===== FIXTURES =====
console.log('\nReading fixtures.json...');
const fixtures = JSON.parse(fs.readFileSync('fixtures.json', 'utf8'));

let fixturesFixed = 0;
let matchdaysFixed = 0;

fixtures.fixtures.forEach(f => {
  // Fix flag codes
  if (flagFixes[f.homeTeam]) {
    f.homeCode = flagFixes[f.homeTeam];
    fixturesFixed++;
  }
  if (flagFixes[f.awayTeam]) {
    f.awayCode = flagFixes[f.awayTeam];
    fixturesFixed++;
  }

  // Fix matchday using embedded fixtures lookup
  if (f.stage === 'GROUP_STAGE' || f.stage === 'group') {
    const home = normalizeName(f.homeTeam);
    const away = normalizeName(f.awayTeam);
    const key = `${f.group}|${home}|${away}`;
    if (matchdayLookup[key] !== undefined) {
      if (f.matchday !== matchdayLookup[key]) {
        f.matchday = matchdayLookup[key];
        matchdaysFixed++;
      }
    }
  }
});

// Fix flag URLs
fixtures.fixtures.forEach(f => {
  if (f.homeCode) f.homeFlag = `https://flagcdn.com/w160/${f.homeCode}.png`;
  if (f.awayCode) f.awayFlag = `https://flagcdn.com/w160/${f.awayCode}.png`;
});

// ===== RESTRUCTURE KNOCKOUT STAGE FOR script.js =====
console.log('\nRestructuring knockout stage data...');

const knockoutStages = {
  ROUND_OF_32: { name: 'Round of 32', key: 'roundOf32' },
  ROUND_OF_16: { name: 'Round of 16', key: 'roundOf16' },
  QUARTERFINALS: { name: 'Quarterfinals', key: 'quarterfinals' },
  SEMIFINALS: { name: 'Semifinals', key: 'semifinals' },
  '3RD_PLACE_MATCH': { name: '3rd Place Match', key: 'thirdPlace' },
  FINAL: { name: 'Final', key: 'final' },
};

const knockoutStage = {};
for (const [stage, info] of Object.entries(knockoutStages)) {
  const matches = fixtures.fixtures
    .filter(f => f.stage === stage)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(f => ({
      id: f.id,
      date: f.date,
      time: f.time,
      venue: f.venue,
      city: f.city,
      label: f.label || `${f.homeTeam} vs ${f.awayTeam}`,
    }));
  
  knockoutStage[info.key] = {
    name: info.name,
    matches: matches,
  };
}

fixtures.knockoutStage = knockoutStage;

fixtures.lastUpdated = new Date().toISOString();
fs.writeFileSync('fixtures.json', JSON.stringify(fixtures, null, 2));
console.log(`Fixed ${fixturesFixed} flag codes in fixtures.json`);
console.log(`Fixed ${matchdaysFixed} matchday values in fixtures.json`);
console.log(`Restructured ${Object.keys(knockoutStage).length} knockout stages`);

// ===== SCORES =====
console.log('\nReading scores.json...');
const scores = JSON.parse(fs.readFileSync('scores.json', 'utf8'));

let scoresFixed = 0;
function fixScoreMatch(match) {
  if (flagFixes[match.homeTeam]) {
    match.homeCode = flagFixes[match.homeTeam];
    scoresFixed++;
  }
  if (flagFixes[match.awayTeam]) {
    match.awayCode = flagFixes[match.awayTeam];
    scoresFixed++;
  }
  if (match.stage === 'GROUP_STAGE' || match.stage === 'group') {
    const home = normalizeName(match.homeTeam);
    const away = normalizeName(match.awayTeam);
    const key = `${match.group}|${home}|${away}`;
    if (matchdayLookup[key] !== undefined) {
      match.matchday = matchdayLookup[key];
    }
  }
}

scores.liveMatches?.forEach(fixScoreMatch);
scores.recentResults?.forEach(fixScoreMatch);
scores.upcomingMatches?.forEach(fixScoreMatch);

scores.lastUpdated = new Date().toISOString();
fs.writeFileSync('scores.json', JSON.stringify(scores, null, 2));
console.log(`Fixed ${scoresFixed} flag codes in scores.json`);

// ===== COMPUTE STANDINGS FROM FIXTURES =====
console.log('\nComputing standings from fixtures...');

// Group definitions for 2026 World Cup
const groupDefs = {
  A: ["Mexico", "South Korea", "Czechia", "South Africa"],
  B: ["Canada", "Switzerland", "Bosnia-Herzegovina", "Qatar"],
  C: ["Brazil", "Morocco", "Scotland", "Haiti"],
  D: ["United States", "Australia", "Paraguay", "Türkiye"],
  E: ["Germany", "Ivory Coast", "Ecuador", "Curaçao"],
  F: ["Sweden", "Netherlands", "Japan", "Tunisia"],
  G: ["IR Iran", "New Zealand", "Belgium", "Egypt"],
  H: ["Saudi Arabia", "Uruguay", "Spain", "Cape Verde"],
  I: ["Norway", "France", "Senegal", "Iraq"],
  J: ["Argentina", "Austria", "Jordan", "Algeria"],
  K: ["Colombia", "Portugal", "Congo DR", "Uzbekistan"],
  L: ["England", "Ghana", "Panama", "Croatia"],
};

// Team name to code mapping
const teamCodes = {
  "Mexico": "mx", "South Korea": "kr", "Czechia": "cz", "South Africa": "za",
  "Canada": "ca", "Switzerland": "ch", "Bosnia-Herzegovina": "ba", "Qatar": "qa",
  "Brazil": "br", "Morocco": "ma", "Scotland": "gb-sct", "Haiti": "ht",
  "United States": "us", "Australia": "au", "Paraguay": "py", "Türkiye": "tr",
  "Germany": "de", "Ivory Coast": "ci", "Ecuador": "ec", "Curaçao": "cw",
  "Sweden": "se", "Netherlands": "nl", "Japan": "jp", "Tunisia": "tn",
  "IR Iran": "ir", "New Zealand": "nz", "Belgium": "be", "Egypt": "eg",
  "Saudi Arabia": "sa", "Uruguay": "uy", "Spain": "es", "Cape Verde": "cv",
  "Norway": "no", "France": "fr", "Senegal": "sn", "Iraq": "iq",
  "Argentina": "ar", "Austria": "at", "Jordan": "jo", "Algeria": "dz",
  "Colombia": "co", "Portugal": "pt", "Congo DR": "cd", "Uzbekistan": "uz",
  "England": "gb-eng", "Ghana": "gh", "Panama": "pa", "Croatia": "hr",
};

// Initialize standings
const standings = {};
for (const [group, teams] of Object.entries(groupDefs)) {
  standings[group] = {
    teams: teams.map(name => ({
      name,
      code: teamCodes[name] || "un",
      played: 0, won: 0, drawn: 0, lost: 0,
      gf: 0, ga: 0, gd: 0, points: 0, position: 0
    }))
  };
}

// Process finished group stage matches
const finishedFixtures = fixtures.fixtures.filter(f =>
  (f.stage === 'GROUP_STAGE' || f.stage === 'group') &&
  ['finished', 'ft', 'aet', 'pen'].includes(f.status) &&
  f.homeScore != null && f.awayScore != null
);

// Helper to find a team in standings by name (handles name variations)
function findTeamInStandings(group, fixtureTeamName) {
  // First try exact match
  let team = standings[group].teams.find(t => t.name === fixtureTeamName);
  if (team) return team;
  
  // Try normalizing the fixture team name
  const normalized = normalizeName(fixtureTeamName);
  team = standings[group].teams.find(t => t.name === normalized);
  if (team) return team;
  
  // Try reverse lookup (group def name → possible fixture names)
  for (const [groupName, possibleNames] of Object.entries(reverseNameNormalization)) {
    if (possibleNames.includes(fixtureTeamName)) {
      team = standings[group].teams.find(t => t.name === groupName);
      if (team) return team;
    }
  }
  
  return null;
}

finishedFixtures.forEach(f => {
  const group = f.group;
  if (!standings[group]) return;

  const homeTeam = findTeamInStandings(group, f.homeTeam);
  const awayTeam = findTeamInStandings(group, f.awayTeam);

  if (homeTeam && awayTeam) {
    homeTeam.played++;
    awayTeam.played++;
    homeTeam.gf += f.homeScore;
    homeTeam.ga += f.awayScore;
    awayTeam.gf += f.awayScore;
    awayTeam.ga += f.homeScore;

    if (f.homeScore > f.awayScore) {
      homeTeam.won++;
      homeTeam.points += 3;
      awayTeam.lost++;
    } else if (f.homeScore < f.awayScore) {
      awayTeam.won++;
      awayTeam.points += 3;
      homeTeam.lost++;
    } else {
      homeTeam.drawn++;
      awayTeam.drawn++;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }

    homeTeam.gd = homeTeam.gf - homeTeam.ga;
    awayTeam.gd = awayTeam.gf - awayTeam.ga;
  }
});

// Sort teams in each group by points, GD, GF
for (const group of Object.keys(standings)) {
  standings[group].teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
  standings[group].teams.forEach((t, i) => t.position = i + 1);
}

const standingsOutput = {
  lastUpdated: new Date().toISOString(),
  groups: standings
};

fs.writeFileSync('standings.json', JSON.stringify(standingsOutput, null, 2));
console.log('Standings computed and saved to standings.json');

// Print summary
console.log('\n=== STANDINGS SUMMARY ===');
for (const [group, data] of Object.entries(standings)) {
  console.log(`\nGroup ${group}:`);
  data.teams.forEach((t, i) => {
    console.log(`  ${i+1}. ${t.name.padEnd(20)} P:${t.played} W:${t.won} D:${t.drawn} L:${t.lost} GF:${t.gf} GA:${t.ga} GD:${t.gd > 0 ? '+' : ''}${t.gd} Pts:${t.points}`);
  });
}

console.log('\nDone!');
