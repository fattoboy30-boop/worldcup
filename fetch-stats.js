const fs = require('fs');
const https = require('https');
const path = require('path');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
  } catch (e) {}
}
loadEnv();

const API_KEY = process.env.FOOTBALL_DATA_API_KEY || '';
const BASE_URL = 'https://api.football-data.org/v4';
const COMPETITION = 'WC';
const ROOT = __dirname;

const FILES = {
  fixtures: path.join(ROOT, 'fixtures.json'),
  scores: path.join(ROOT, 'scores.json'),
  standings: path.join(ROOT, 'standings.json'),
};

function apiGet(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: API_KEY ? { 'X-Auth-Token': API_KEY } : {},
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 200)}`));
        }
      });
    }).on('error', reject);
  });
}

const FLAG_SOURCE = 'https://flagcdn.com/w160';

const TEAM_CODES = {
  'Mexico':'mx','Canada':'ca','USA':'us','Brazil':'br','Argentina':'ar','France':'fr',
  'England':'gb-eng','Spain':'es','Netherlands':'nl','Germany':'de','Belgium':'be','Portugal':'pt',
  'Colombia':'co','Uruguay':'uy','Croatia':'hr','Morocco':'ma','Japan':'jp','Senegal':'sn',
  'IR Iran':'ir','Iran':'ir','Australia':'au','South Korea':'kr','Saudi Arabia':'sa','Egypt':'eg',
  'Tunisia':'tn','Switzerland':'ch','Ecuador':'ec','Paraguay':'py',"Côte d'Ivoire":'ci',
  'Ivory Coast':'ci','Nigeria':'ng','Scotland':'gb-sct','Norway':'no','Sweden':'se','Qatar':'qa',
  'Czechia':'cz','Czech Republic':'cz','Poland':'pl','Italy':'it','Turkey':'tr','Türkiye':'tr',
  'Haiti':'ht','South Africa':'za','Iraq':'iq','New Zealand':'nz','Ghana':'gh','Curaçao':'cw',
  'Jamaica':'jm','Cape Verde':'cv','DR Congo':'cd','Austria':'at','Wales':'gb-wls','Denmark':'dk',
  'Serbia':'rs','Hungary':'hu','Romania':'ro','Slovakia':'sk','Slovenia':'si','Albania':'al',
  'Finland':'fi','Iceland':'is','Ukraine':'ua','Bosnia and Herzegovina':'ba','Scotland':'gb-sct',
  'Cameroon':'cm','Algeria':'dz','Mali':'ml','Burkina Faso':'bf','Guinea':'gn','Uganda':'ug',
  'Kenya':'ke','Tanzania':'tz','Zambia':'zm','Zimbabwe':'zw','Angola':'ao','Mozambique':'mz',
  'Madagascar':'mg','Namibia':'na','Sudan':'sd','Libya':'ly','Gabon':'ga','Benin':'bj',
  'Peru':'pe','Chile':'cl','Bolivia':'bo','Venezuela':'ve','Costa Rica':'cr','Honduras':'hn',
  'Panama':'pa','Trinidad and Tobago':'tt','Cuba':'cu','El Salvador':'sv','Guatemala':'gt',
  'Nicaragua':'ni','Dominican Republic':'do','Puerto Rico':'pr','Honduras':'hn','India':'in',
  'China PR':'cn','China':'cn','Thailand':'th','Vietnam':'vn','North Korea':'kp','Korea DPR':'kp',
  'Korea Republic':'kr','UAE':'ae','Oman':'om','Bahrain':'bh','Palestine':'ps','Syria':'sy',
  'Lebanon':'lb','Jordan':'jo','Uzbekistan':'uz','Kyrgyzstan':'kg','Tajikistan':'tj','Turkmenistan':'tm',
  'Kazakhstan':'kz','Chinese Taipei':'tw','Hong Kong':'hk','Myanmar':'mm','Philippines':'ph',
  'Malaysia':'my','Singapore':'sg','Indonesia':'id','Brunei':'bn','Timor-Leste':'tl',
  'Solomon Islands':'sb','Fiji':'fj','Papua New Guinea':'pg','Tahiti':'pf','Samoa':'ws',
  'Vanuatu':'vu','Tonga':'to','Micronesia':'fm','Cook Islands':'ck','American Samoa':'as',
  'Aruba':'aw','Bermuda':'bm','Cayman Islands':'ky','British Virgin Islands':'vg','USVI':'vi',
  'Belize':'bz','Bahamas':'bs','Barbados':'bb','Suriname':'sr','Guyana':'gy','French Guiana':'gf',
  'Guadeloupe':'gp','Martinique':'mq','Saint Lucia':'lc','Saint Vincent':'vc',
  'Grenada':'gd','Antigua and Barbuda':'ag','Saint Kitts and Nevis':'kn','Montserrat':'ms',
  'Guam':'gu','Northern Mariana Islands':'mp','Liechtenstein':'li','San Marino':'sm','Andorra':'ad',
  'Faroe Islands':'fo','Gibraltar':'gi','Kosovo':'xk','Moldova':'md','Georgia':'ge',
  'Armenia':'am','Azerbaijan':'az','Israel':'il','Cyprus':'cy','Estonia':'ee','Latvia':'lv',
  'Lithuania':'lt','Luxembourg':'lu','Malta':'mt','Belarus':'by','Macedonia':'mk',
  'North Macedonia':'mk','Montenegro':'me','Rep. Ireland':'ie','Northern Ireland':'gb-nir',
  'Monaco':'mc',
};

function getFlagUrl(teamName) {
  const code = TEAM_CODES[teamName] || 'un';
  return `${FLAG_SOURCE}/${code}.png`;
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return {};
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  Saved: ${path.basename(filePath)}`);
}

function parseDate(utcDate) {
  const d = new Date(utcDate);
  return {
    date: d.toISOString().split('T')[0],
    time: d.toTimeString().slice(0, 5),
  };
}

function teamName(team) {
  return team?.shortName || team?.name || team?.tla || 'TBD';
}

function cleanGroup(g) {
  return g?.replace('GROUP_', '') || null;
}

function buildScores(matches) {
  const live = [], results = [], upcoming = [];
  const LIVE = ['IN_PLAY','PAUSED','LIVE','1H','2H','HT'];
  const FINISHED = ['FINISHED','FT','AET','PEN'];
  const SCHEDULED = ['TIMED','SCHEDULED'];

  for (const m of matches) {
    const { date, time } = parseDate(m.utcDate || '');
    const home = teamName(m.homeTeam);
    const away = teamName(m.awayTeam);
    const ft = m.score?.fullTime || {};
    const ht = m.score?.halfTime || {};
    const status = m.status || '';
    const group = cleanGroup(m.group);

    const base = {
      id: m.id, date, time, utcDate: m.utcDate || '',
      homeTeam: home, homeCode: TEAM_CODES[home] || 'un',
      homeScore: ft.home, awayTeam: away, awayCode: TEAM_CODES[away] || 'un',
      awayScore: ft.away, venue: m.venue || '', city: '',
      status: status.toLowerCase(), group, stage: m.stage || '',
      minute: m.minute || null,
      halfTime: [ht.home, ht.away],
    };

    if (LIVE.includes(status)) live.push(base);
    else if (FINISHED.includes(status)) results.push(base);
    else if (SCHEDULED.includes(status)) upcoming.push(base);
  }

  return {
    lastUpdated: new Date().toISOString(),
    liveMatches: live, recentResults: results, upcomingMatches: upcoming,
  };
}

function buildFixtures(matches) {
  const TEAM_FLAGS = {};
  for (const [name, code] of Object.entries(TEAM_CODES)) {
    TEAM_FLAGS[name] = `https://flagcdn.com/w160/${code}.png`;
  }

  const fixtures = matches.map(m => {
    const home = teamName(m.homeTeam);
    const away = teamName(m.awayTeam);
    return {
      id: m.id,
      date: m.utcDate ? new Date(m.utcDate).toISOString().split('T')[0] : '',
      time: m.utcDate ? new Date(m.utcDate).toISOString().split('T')[1].slice(0, 5) : '',
      utcDate: m.utcDate || '',
      homeTeam: home, homeCode: TEAM_CODES[home] || 'un',
      homeFlag: TEAM_FLAGS[home] || '',
      awayTeam: away, awayCode: TEAM_CODES[away] || 'un',
      awayFlag: TEAM_FLAGS[away] || '',
      homeScore: m.score?.fullTime?.home,
      awayScore: m.score?.fullTime?.away,
      venue: m.venue || '', city: m.area?.name || '',
      status: (m.status || '').toLowerCase(),
      group: cleanGroup(m.group),
      stage: m.stage || '',
      matchday: m.matchday || 0,
      minute: m.minute || null,
    };
  });

  const knockoutMap = {
    LAST_32: { key: 'roundOf32', name: 'Round of 32' },
    LAST_16: { key: 'roundOf16', name: 'Round of 16' },
    QUARTER_FINALS: { key: 'quarterFinals', name: 'Quarter-Finals' },
    SEMI_FINALS: { key: 'semiFinals', name: 'Semi-Finals' },
    THIRD_PLACE: { key: 'thirdPlace', name: 'Third-Place Match' },
    FINAL: { key: 'final', name: 'Final' },
  };

  const knockoutStage = {};
  for (const [apiStage, meta] of Object.entries(knockoutMap)) {
    const stageMatches = fixtures.filter(f => f.stage === apiStage);
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

function buildStandings(standingsData) {
  const groups = {};
  for (const s of standingsData) {
    if (s.stage !== 'GROUP_STAGE') continue;
    const g = cleanGroup(s.group);
    if (!g) continue;
    groups[g] = {
      teams: (s.table || []).map(e => {
        const name = teamName(e.team);
        return {
          name, code: TEAM_CODES[name] || 'un',
          played: e.playedGames || 0, won: e.won || 0, drawn: e.draw || 0,
          lost: e.lost || 0, gf: e.goalsFor || 0, ga: e.goalsAgainst || 0,
          gd: e.goalDifference || 0, points: e.points || 0,
          form: e.form || '', position: e.position,
        };
      })
    };
  }
  return { lastUpdated: new Date().toISOString(), groups };
}

async function main() {
  if (!API_KEY) {
    console.log('ERROR: FOOTBALL_DATA_API_KEY not set in .env');
    console.log('Get a free key at: https://www.football-data.org/client/register');
    console.log('Add to .env: FOOTBALL_DATA_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log('Fetching from football-data.org...');
  try {
    const [matchesRes, standingsRes] = await Promise.all([
      apiGet(`/competitions/${COMPETITION}/matches`),
      apiGet(`/competitions/${COMPETITION}/standings`),
    ]);

    const matches = matchesRes.matches || [];
    const standings = standingsRes.standings || [];

    console.log(`  Matches: ${matches.length}`);
    console.log(`  Groups: ${standings.filter(s => s.stage === 'GROUP_STAGE').length}`);

    const finished = matches.filter(m => ['FINISHED','FT','AET','PEN'].includes(m.status));
    const live = matches.filter(m => ['IN_PLAY','PAUSED','LIVE','1H','2H','HT'].includes(m.status));
    console.log(`  Finished: ${finished.length}, Live: ${live.length}`);

    // Update scores
    const scoresData = buildScores(matches);
    saveJson(FILES.scores, scoresData);

    // Update standings
    const standingsData = buildStandings(standings);
    saveJson(FILES.standings, standingsData);

    // Update fixtures (full rebuild from API)
    const fixturesData = buildFixtures(matches);
    saveJson(FILES.fixtures, fixturesData);

    console.log('\nAll stats updated!');
  } catch (err) {
    if (err.message?.includes('403')) {
      console.log('API ERROR 403: Invalid or expired API key');
    } else if (err.message?.includes('429')) {
      console.log('API ERROR 429: Rate limited. Wait a moment.');
    } else {
      console.log(`ERROR: ${err.message}`);
    }
    process.exit(1);
  }
}

main();
