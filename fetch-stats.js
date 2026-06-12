const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = __dirname;
const FILES = {
  fixtures: path.join(ROOT, 'fixtures.json'),
  scores: path.join(ROOT, 'scores.json'),
  standings: path.join(ROOT, 'standings.json'),
};

const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Parse error: ${data.substring(0, 200)}`)); }
      });
    }).on('error', reject);
  });
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  Saved: ${path.basename(filePath)}`);
}

const FLAG_SOURCE = 'https://flagcdn.com/w160';

// Load group assignments from wc26-mcp
let TEAM_GROUPS = {};
try {
  const g = require('./node_modules/wc26-mcp/dist/data/groups.js');
  const t = require('./node_modules/wc26-mcp/dist/data/teams.js');
  const groups = (g.default || g).groups || [];
  const teams = (t.default || t).teams || [];
  const teamMap = {};
  teams.forEach(team => teamMap[team.id] = team.name);
  groups.forEach(gr => {
    gr.teams.forEach(tid => {
      const name = teamMap[tid] || tid;
      TEAM_GROUPS[name.toLowerCase()] = gr.id;
    });
  });
} catch (e) {}

function getGroup(teamName) {
  return TEAM_GROUPS[teamName.toLowerCase()] || null;
}

const TEAM_FLAGS = {
  'Mexico':'mx','Canada':'ca','USA':'us','Brazil':'br','Argentina':'ar','France':'fr',
  'England':'gb-eng','Spain':'es','Netherlands':'nl','Germany':'de','Belgium':'be','Portugal':'pt',
  'Colombia':'co','Uruguay':'uy','Croatia':'hr','Morocco':'ma','Japan':'jp','Senegal':'sn',
  'Iran':'ir','Australia':'au','South Korea':'kr','Korea Republic':'kr','Saudi Arabia':'sa','Egypt':'eg',
  'Tunisia':'tn','Switzerland':'ch','Ecuador':'ec','Paraguay':'py',"Côte d'Ivoire":'ci',
  'Ivory Coast':'ci','Nigeria':'ng','Scotland':'gb-sct','Norway':'no','Sweden':'se','Qatar':'qa',
  'Czechia':'cz','Czech Republic':'cz','Poland':'pl','Italy':'it','Turkey':'tr','Türkiye':'tr',
  'Haiti':'ht','South Africa':'za','Iraq':'iq','New Zealand':'nz','Ghana':'gh',
  'Jamaica':'jm','Austria':'at','Wales':'gb-wls','Denmark':'dk','Serbia':'rs',
  'Hungary':'hu','Romania':'ro','Slovakia':'sk','Slovenia':'si','Albania':'al',
  'Ukraine':'ua','Bosnia and Herzegovina':'ba','Bosnia-Herzegovina':'ba',
  'Cameroon':'cm','Peru':'pe','Chile':'cl','Bolivia':'bo','Panama':'pa',
  'Costa Rica':'cr','Honduras':'hn','Korea Republic':'kr','Korea':'kr',
};

function getFlagCode(teamName) {
  if (TEAM_FLAGS[teamName]) return TEAM_FLAGS[teamName];
  const lower = teamName.toLowerCase();
  for (const [name, code] of Object.entries(TEAM_FLAGS)) {
    if (name.toLowerCase() === lower) return code;
  }
  return 'un';
}

function getFlagUrl(teamName) {
  return `${FLAG_SOURCE}/${getFlagCode(teamName)}.png`;
}

// Map ESPN status to our status
function mapStatus(espnStatus) {
  const type = espnStatus?.type || {};
  const state = type.state || '';
  const name = (type.name || '').toUpperCase();

  if (state === 'in') return 'in_play';
  if (state === 'post') return 'finished';
  if (state === 'pre') return 'timed';
  if (name.includes('HALFTIME') || name.includes('HALF_TIME')) return 'ht';
  if (name.includes('FULL_TIME') || name.includes('STATUS_FULL_TIME')) return 'finished';
  return 'timed';
}

// Extract match group from event name or competition details
function extractGroup(competition) {
  // ESPN sometimes includes group info in the competition
  const group = competition.group?.name || competition.group?.id || '';
  if (group) {
    const match = group.match(/Group\s+([A-L])/i);
    if (match) return match[1].toUpperCase();
  }
  // Try to find from slug or type
  const slug = competition.season?.slug || '';
  if (slug.includes('group-stage')) {
    // Can't determine specific group from ESPN easily
    return null;
  }
  return null;
}

// Fetch all matches across date ranges
async function fetchAllMatches() {
  // World Cup runs June 11 - July 19
  // Fetch in batches to cover all dates
  const dateRanges = [
    '20260611-20260614',  // Matchday 1
    '20260615-20260619',  // Matchday 2
    '20260620-20260624',  // Matchday 3
    '20260625-20260630',  // Group stage end
    '20260701-20260705',  // Round of 32
    '20260706-20260710',  // Round of 16
    '20260711-20260715',  // QF/SF
    '20260716-20260720',  // Final
  ];

  const allEvents = [];
  const seen = new Set();

  for (const range of dateRanges) {
    try {
      const url = `${ESPN_BASE}/scoreboard?dates=${range}`;
      const data = await fetchJSON(url);
      for (const event of (data.events || [])) {
        if (!seen.has(event.id)) {
          seen.add(event.id);
          allEvents.push(event);
        }
      }
    } catch (e) {
      console.log(`  Warning: Failed to fetch ${range}: ${e.message}`);
    }
  }

  return allEvents;
}

// Fetch standings
async function fetchStandings() {
  try {
    const url = `${ESPN_BASE}/standings`;
    const data = await fetchJSON(url);
    return data;
  } catch (e) {
    console.log(`  Warning: Standings fetch failed: ${e.message}`);
    return null;
  }
}

function parseEvent(event) {
  const comp = event.competitions?.[0];
  if (!comp) return null;

  const home = comp.competitors?.find(c => c.homeAway === 'home');
  const away = comp.competitors?.find(c => c.homeAway === 'away');
  if (!home || !away) return null;

  const homeName = home.team?.displayName || home.team?.shortDisplayName || 'TBD';
  const awayName = away.team?.displayName || away.team?.shortDisplayName || 'TBD';
  const status = mapStatus(comp.status);
  const utcDate = event.date || '';

  const homeScore = home.score ? parseInt(home.score) : null;
  const awayScore = away.score ? parseInt(away.score) : null;

  // Half-time scores from linescores if available
  const ht = [null, null];
  const homeLinescores = home.linescores || [];
  const awayLinescores = away.linescores || [];
  if (homeLinescores.length >= 1) ht[0] = homeLinescores[0]?.value ?? null;
  if (awayLinescores.length >= 1) ht[1] = awayLinescores[0]?.value ?? null;

  const venue = comp.venue?.fullName || '';
  const city = comp.venue?.address?.city || '';
  const minute = comp.status?.displayClock && status === 'in_play' ? comp.status.displayClock : null;

  // Group from wc26-mcp team mapping
  const group = getGroup(homeName) || getGroup(awayName) || null;

  return {
    id: parseInt(event.id) || event.id,
    date: utcDate ? utcDate.split('T')[0] : '',
    time: utcDate ? new Date(utcDate).toISOString().split('T')[1]?.slice(0, 5) : '',
    utcDate,
    homeTeam: homeName,
    homeCode: getFlagCode(homeName),
    homeScore,
    awayTeam: awayName,
    awayCode: getFlagCode(awayName),
    awayScore,
    venue, city,
    status,
    group,
    stage: event.season?.slug === 'group-stage' ? 'GROUP_STAGE' : (event.season?.slug || '').toUpperCase().replace(/-/g, '_'),
    matchday: 0,
    minute,
    halfTime: ht,
  };
}

async function main() {
  console.log('Fetching from ESPN API...\n');

  // Fetch all matches
  console.log('Fetching matches...');
  const events = await fetchAllMatches();
  console.log(`  Found ${events.length} total events`);

  // Parse matches
  const matches = events.map(parseEvent).filter(Boolean);
  console.log(`  Parsed ${matches.length} matches`);

  const finished = matches.filter(m => m.status === 'finished');
  const live = matches.filter(m => m.status === 'in_play' || m.status === 'ht');
  const upcoming = matches.filter(m => m.status === 'timed');
  console.log(`  Finished: ${finished.length}, Live: ${live.length}, Upcoming: ${upcoming.length}`);

  // Build scores
  const scoresData = {
    lastUpdated: new Date().toISOString(),
    liveMatches: live,
    recentResults: finished,
    upcomingMatches: upcoming,
  };
  saveJson(FILES.scores, scoresData);

  // Build fixtures (with knockout stage structure)
  const knockoutMap = {
    'round-of-32': { key: 'roundOf32', name: 'Round of 32' },
    'round-of-16': { key: 'roundOf16', name: 'Round of 16' },
    'quarter-finals': { key: 'quarterFinals', name: 'Quarter-Finals' },
    'semi-finals': { key: 'semiFinals', name: 'Semi-Finals' },
    'third-place': { key: 'thirdPlace', name: 'Third-Place Match' },
    'final': { key: 'final', name: 'Final' },
  };

  const fixtures = matches.map(m => ({
    ...m,
    homeFlag: getFlagUrl(m.homeTeam),
    awayFlag: getFlagUrl(m.awayTeam),
  }));

  const knockoutStage = {};
  for (const [slug, meta] of Object.entries(knockoutMap)) {
    const stageMatches = fixtures.filter(f => f.stage.toLowerCase() === slug);
    if (stageMatches.length) {
      knockoutStage[meta.key] = {
        name: meta.name,
        matches: stageMatches.map(m => ({
          id: m.id, date: m.date, time: m.time,
          venue: m.venue, city: m.city,
          label: `${m.homeTeam} vs ${m.awayTeam}`,
        })),
      };
    }
  }

  const fixturesData = {
    lastUpdated: new Date().toISOString(),
    fixtures,
    knockoutStage,
  };
  saveJson(FILES.fixtures, fixturesData);

  // Build standings from match results
  const groups = {};
  for (const m of finished) {
    if (!m.group) continue;
    if (!groups[m.group]) groups[m.group] = {};
    const g = groups[m.group];

    // Initialize teams if not present
    for (const teamName of [m.homeTeam, m.awayTeam]) {
      if (!g[teamName]) {
        g[teamName] = {
          name: teamName, code: getFlagCode(teamName),
          played: 0, won: 0, drawn: 0, lost: 0,
          gf: 0, ga: 0, gd: 0, points: 0,
        };
      }
    }

    const home = g[m.homeTeam];
    const away = g[m.awayTeam];

    if (m.homeScore != null && m.awayScore != null) {
      home.played++;
      away.played++;
      home.gf += m.homeScore;
      home.ga += m.awayScore;
      away.gf += m.awayScore;
      away.ga += m.homeScore;
      home.gd = home.gf - home.ga;
      away.gd = away.gf - away.ga;

      if (m.homeScore > m.awayScore) {
        home.won++; home.points += 3;
        away.lost++;
      } else if (m.homeScore < m.awayScore) {
        away.won++; away.points += 3;
        home.lost++;
      } else {
        home.drawn++; home.points += 1;
        away.drawn++; away.points += 1;
      }
    }
  }

  // Sort groups by points, then GD
  const standingsGroups = {};
  for (const [group, teams] of Object.entries(groups)) {
    const sorted = Object.values(teams).sort((a, b) =>
      b.points - a.points || b.gd - a.gd || b.gf - a.gf
    );
    standingsGroups[group] = { teams: sorted.map((t, i) => ({ ...t, position: i + 1 })) };
  }

  const standingsData = {
    lastUpdated: new Date().toISOString(),
    groups: standingsGroups,
  };
  saveJson(FILES.standings, standingsData);

  console.log('\nAll stats updated via ESPN!');
}

main();
