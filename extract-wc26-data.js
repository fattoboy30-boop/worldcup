const fs = require('fs');
const path = require('path');

// Load wc26-mcp data
const matchesRaw = require('./node_modules/wc26-mcp/dist/data/matches.js');
const teamsRaw = require('./node_modules/wc26-mcp/dist/data/teams.js');
const venuesRaw = require('./node_modules/wc26-mcp/dist/data/venues.js');
const groupsRaw = require('./node_modules/wc26-mcp/dist/data/groups.js');
const profilesRaw = require('./node_modules/wc26-mcp/dist/data/team-profiles.js');
const injuriesRaw = require('./node_modules/wc26-mcp/dist/data/injuries.js');
const cityGuidesRaw = require('./node_modules/wc26-mcp/dist/data/city-guides.js');
const fanZonesRaw = require('./node_modules/wc26-mcp/dist/data/fan-zones.js');

const m = matchesRaw.default || matchesRaw;
const t = teamsRaw.default || teamsRaw;
const v = venuesRaw.default || venuesRaw;
const g = groupsRaw.default || groupsRaw;
const p = profilesRaw.default || profilesRaw;
const i = injuriesRaw.default || injuriesRaw;
const cg = cityGuidesRaw.default || cityGuidesRaw;
const fz = fanZonesRaw.default || fanZonesRaw;

const ROOT = __dirname;

// ===== Team code mapping (wc26-mcp id -> flagcdn code) =====
const TEAM_FLAG_MAP = {
  'mex':'mx','usa':'us','can':'ca','bra':'br','arg':'ar','fra':'fr',
  'eng':'gb-eng','esp':'es','ned':'nl','ger':'de','bel':'be','por':'pt',
  'col':'co','uru':'uy','cro':'hr','mar':'ma','jpn':'jp','sen':'sn',
  'ira':'ir','aus':'au','kor':'kr','ksa':'sa','egy':'eg','tun':'tn',
  'sui':'ch','ecu':'ec','par':'py','civ':'ci','nga':'ng','sct':'gb-sct',
  'nor':'no','swe':'se','cze':'cz','pol':'pl','ita':'it','tur':'tr',
  'hai':'ht','rsa':'za','irq':'iq','nzl':'nz','gha':'gh','cur':'cw',
  'jam':'jm','cpv':'cv','cod':'cd','aut':'at','den':'dk','srb':'rs',
  'hun':'hu','rom':'ro','svk':'sk','slo':'si','alb':'al','fin':'fi',
  'ice':'is','ukr':'ua','bih':'ba','cmr':'cm','dza':'dz','mla':'ml',
  'bfa':'bf','gui':'gn','uga':'ug','ken':'ke','tan':'tz','zam':'zm',
  'zim':'zw','ang':'ao','moz':'mz','mad':'mg','nam':'na','sud':'sd',
  'lib':'ly','gab':'ga','ben':'bj','per':'pe','chi':'cl','bol':'bo',
  'ven':'ve','crc':'cr','hon':'hn','pan':'pa','tri':'tt','cub':'cu',
  'esa':'sv','gua':'gt','nic':'ni','dom':'do','pur':'pr','bel':'bz',
  'bah':'bs','bar':'bb','sur':'sr','guy':'gy','sol':'sb','fij':'fj',
  'png':'pg','tah':'pf','sam':'ws','van':'vu','ton':'to',
};

function getFlagUrl(teamId) {
  const code = TEAM_FLAG_MAP[teamId] || 'un';
  return `https://flagcdn.com/w160/${code}.png`;
}

function getFlagCode(teamId) {
  return TEAM_FLAG_MAP[teamId] || 'un';
}

// ===== 1. Build enhanced fixtures.json (merge with football-data.org) =====
function buildEnhancedFixtures() {
  const matchesData = m.matches || [];
  const teamsData = t.teams || [];
  const venuesData = v.venues || [];

  const teamMap = {};
  teamsData.forEach(team => { teamMap[team.id] = team; });

  const venueMap = {};
  venuesData.forEach(venue => { venueMap[venue.id] = venue; });

  const fixtures = matchesData.map(match => {
    const home = teamMap[match.home_team_id] || {};
    const away = teamMap[match.away_team_id] || {};
    const venue = venueMap[match.venue_id] || {};

    return {
      id: match.match_number || match.id,
      date: match.date,
      time: match.time_utc,
      utcDate: `${match.date}T${match.time_utc}:00Z`,
      homeTeam: home.name || match.home_team_id,
      homeCode: getFlagCode(match.home_team_id),
      homeFlag: getFlagUrl(match.home_team_id),
      awayTeam: away.name || match.away_team_id,
      awayCode: getFlagCode(match.away_team_id),
      awayFlag: getFlagUrl(match.away_team_id),
      homeScore: null,
      awayScore: null,
      venue: venue.name || '',
      city: venue.city || '',
      country: venue.country || '',
      status: match.status || 'timed',
      group: match.group || null,
      stage: match.round === 'Group Stage' ? 'GROUP_STAGE' : match.round?.toUpperCase().replace(/\s+/g, '_') || '',
      matchday: match.round === 'Group Stage' ? Math.ceil(match.match_number / 12) : 0,
      minute: null,
    };
  });

  // Build knockout stage structure
  const knockoutMap = {
    'Round of 32': { key: 'roundOf32', name: 'Round of 32' },
    'Round of 16': { key: 'roundOf16', name: 'Round of 16' },
    'Quarter-Finals': { key: 'quarterFinals', name: 'Quarter-Finals' },
    'Semi-Finals': { key: 'semiFinals', name: 'Semi-Finals' },
    'Third Place': { key: 'thirdPlace', name: 'Third-Place Match' },
    'Final': { key: 'final', name: 'Final' },
  };

  const knockoutStage = {};
  for (const [roundName, meta] of Object.entries(knockoutMap)) {
    const stageMatches = fixtures.filter(f => f.stage === roundName.toUpperCase().replace(/\s+/g, '_') || f.stage === roundName);
    if (stageMatches.length) {
      knockoutStage[meta.key] = {
        name: meta.name,
        matches: stageMatches.map(m => ({
          id: m.id, date: m.date, time: m.time,
          venue: m.venue, city: m.city,
          label: m.homeTeam && m.awayTeam
            ? `${m.homeTeam} vs ${m.awayTeam}`
            : `Winner TBD vs Winner TBD`,
        })),
      };
    }
  }

  return { lastUpdated: new Date().toISOString(), fixtures, knockoutStage };
}

// ===== 2. Build team profiles JSON =====
function buildTeamProfiles() {
  const profilesData = p.teamProfiles || {};
  const teamsData = t.teams || [];
  const teamMap = {};
  teamsData.forEach(team => { teamMap[team.id] = team; });

  const result = {};
  for (const [teamId, profile] of Object.entries(profilesData)) {
    const team = teamMap[teamId] || {};
    result[teamId] = {
      name: team.name || teamId,
      code: getFlagCode(teamId),
      flag: getFlagUrl(teamId),
      confederation: team.confederation || '',
      fifaRanking: team.fifa_ranking || 0,
      group: team.group || '',
      isHost: team.is_host || false,
      coach: profile.coach || '',
      playingStyle: profile.playing_style || '',
      keyPlayers: (profile.key_players || []).map(p => ({
        name: p.name,
        position: p.position,
        club: p.club,
      })),
      worldCupHistory: profile.world_cup_history || {},
      qualifyingSummary: profile.qualifying_summary || '',
    };
  }

  return result;
}

// ===== 3. Build injuries JSON =====
function buildInjuries() {
  const injuriesData = i.injuries || [];
  return {
    lastUpdated: new Date().toISOString(),
    injuries: injuriesData.map(inj => ({
      player: inj.player,
      teamId: inj.team_id,
      team: (t.teams || []).find(t => t.id === inj.team_id)?.name || inj.team_id,
      flag: getFlagUrl(inj.team_id),
      position: inj.position,
      injury: inj.injury,
      status: inj.status,
      expectedReturn: inj.expected_return,
      lastUpdated: inj.last_updated,
      source: inj.source,
    })),
  };
}

// ===== 4. Build venues JSON =====
function buildVenues() {
  const venuesData = v.venues || [];
  return {
    venues: venuesData.map(venue => ({
      id: venue.id,
      name: venue.name,
      city: venue.city,
      state: venue.state_province || '',
      country: venue.country,
      capacity: venue.capacity,
      coordinates: venue.coordinates,
      address: venue.address,
      timezone: venue.timezone,
      region: venue.region,
      notable: venue.notable || [],
      weather: venue.weather || {},
    })),
  };
}

// ===== 5. Build city guides JSON =====
function buildCityGuides() {
  return cg.cityGuides || {};
}

// ===== 6. Build fan zones JSON =====
function buildFanZones() {
  return fz.fanZones || [];
}

// ===== Save helpers =====
function saveJson(filename, data) {
  const fp = path.join(ROOT, filename);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
  console.log(`  Saved: ${filename}`);
}

// ===== Main =====
console.log('Extracting wc26-mcp data...\n');

const fixturesResult = buildEnhancedFixtures();
saveJson('data/wc26-fixtures.json', fixturesResult);
console.log(`  Fixtures: ${fixturesResult.fixtures.length} matches`);

const teamProfiles = buildTeamProfiles();
saveJson('data/wc26-team-profiles.json', teamProfiles);
console.log(`  Team profiles: ${Object.keys(teamProfiles).length} teams`);

const injuriesResult = buildInjuries();
saveJson('data/wc26-injuries.json', injuriesResult);
console.log(`  Injuries: ${injuriesResult.injuries.length} players`);

const venuesResult = buildVenues();
saveJson('data/wc26-venues.json', venuesResult);
console.log(`  Venues: ${venuesResult.venues.length} stadiums`);

const cityGuides = buildCityGuides();
saveJson('data/wc26-city-guides.json', cityGuides);
console.log(`  City guides: ${Object.keys(cityGuides).length} cities`);

const fanZones = buildFanZones();
saveJson('data/wc26-fan-zones.json', fanZones);
console.log(`  Fan zones: ${Array.isArray(fanZones) ? fanZones.length : Object.keys(fanZones).length} locations`);

console.log('\nAll wc26-mcp data extracted!');
