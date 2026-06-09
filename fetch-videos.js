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

const API_KEY = process.env.YOUTUBE_API_KEY;
const VIDEO_FILE = path.join(__dirname, 'data', 'videos.json');
const FIXTURES_FILE = path.join(__dirname, 'fixtures.json');

const CHANNELS = [
  { id: 'UCpcTrCXblq78GZrTUTLWeBw', name: 'FIFA', rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCpcTrCXblq78GZrTUTLWeBw' },
  { id: 'UC6c1z7bA__85CIWZ_jpCK-Q', name: 'ESPN FC', rss: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC6c1z7bA__85CIWZ_jpCK-Q' }
];

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function loadFixtures() {
  try {
    const data = JSON.parse(fs.readFileSync(FIXTURES_FILE, 'utf8'));
    return data.fixtures || [];
  } catch (e) {
    console.log('Could not load fixtures.json, matchday tagging disabled');
    return [];
  }
}

function getMatchdayFromDate(dateStr, fixtures) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;

  for (const match of fixtures) {
    const matchDate = new Date(match.date);
    const diffDays = Math.abs((date - matchDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 3) {
      return {
        matchday: match.matchday || 1,
        stage: match.stage || 'group',
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam
      };
    }
  }
  return null;
}

function categorizeVideo(title) {
  const lower = title.toLowerCase();
  if (lower.includes('full match') || lower.includes('full replay') || lower.includes('full game') || lower.includes('90 minutes'))
    return 'Full Match';
  if (lower.includes('viral') || lower.includes('funny') || lower.includes('best moment') || lower.includes('incredible') || lower.includes('unbelievable') || lower.includes('reaction') || lower.includes('celebration'))
    return 'Viral';
  if (lower.includes('highlight') || lower.includes('goal') || lower.includes('best') || lower.includes('all goals') || lower.includes('extended'))
    return 'Highlights';
  if (lower.includes('press conference') || lower.includes('interview') || lower.includes('post-match') || lower.includes('preview'))
    return 'Highlights';
  if (lower.includes('training') || lower.includes('squad') || lower.includes('session'))
    return 'Viral';
  if (lower.includes('skills') || lower.includes('trick') || lower.includes('dribble'))
    return 'Viral';
  return 'Highlights';
}

function extractTeams(title) {
  const teams = [
    'Brazil', 'Argentina', 'France', 'England', 'Germany', 'Spain', 'Portugal',
    'Italy', 'Netherlands', 'Belgium', 'Croatia', 'Morocco', 'Japan', 'South Korea',
    'USA', 'Mexico', 'Canada', 'Uruguay', 'Colombia', 'Senegal', 'Australia',
    'Switzerland', 'Ecuador', 'Ghana', 'Cameroon', 'Serbia', 'Poland',
    'Tunisia', 'Saudi Arabia', 'Iran', 'Qatar', 'Paraguay', 'Chile', 'Peru',
    'Ivory Coast', 'Nigeria', 'Algeria', 'Egypt', 'South Africa', 'Scotland',
    'Czechia', 'Sweden', 'Turkey', 'Norway', 'Ukraine', 'Wales', 'Austria',
    'Denmark', 'Haiti', 'Bosnia'
  ];
  return teams.filter(team => title.toLowerCase().includes(team.toLowerCase()));
}

function extractBetween(str, start, end) {
  const i = str.indexOf(start);
  if (i === -1) return '';
  const from = i + start.length;
  const j = str.indexOf(end, from);
  if (j === -1) return '';
  return str.substring(from, j);
}

function extractCDATA(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function parseRSS(xml) {
  const videos = [];
  const entries = xml.split('<entry>').slice(1);

  for (const entry of entries) {
    const title = extractCDATA(extractBetween(entry, '<title>', '</title>'));
    const videoId = extractBetween(entry, 'yt:videoId>', '<');
    const published = extractBetween(entry, '<published>', '</published>');
    const channel = extractBetween(entry, '<name>', '</name>');

    if (title && videoId) {
      videos.push({
        title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        videoId,
        channel: channel || 'Unknown',
        publishedAt: published ? published.split('T')[0] : new Date().toISOString().split('T')[0],
        category: categorizeVideo(title),
        team: extractTeams(title),
        duration: 'N/A',
        views: 0,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      });
    }
  }
  return videos;
}

async function getVideoDetails(videoIds) {
  if (!videoIds.length || !API_KEY) return [];
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=contentDetails,statistics`;
  const data = await fetchURL(url);
  return JSON.parse(data);
}

function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'N/A';
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

async function main() {
  const fixtures = loadFixtures();
  console.log(`Loaded ${fixtures.length} fixtures for matchday tagging`);

  const seen = new Set();
  const allVideos = [];

  for (const channel of CHANNELS) {
    try {
      console.log(`Fetching from ${channel.name} (RSS)...`);
      const xml = await fetchURL(channel.rss);
      const videos = parseRSS(xml);
      for (const video of videos) {
        if (!seen.has(video.videoId)) {
          seen.add(video.videoId);
          allVideos.push(video);
        }
      }
      console.log(`  ${channel.name}: ${videos.length} videos`);
    } catch (error) {
      console.error(`  Error fetching ${channel.name}: ${error.message}`);
    }
  }

  // Enrich with video details (duration, views) via API
  if (API_KEY) {
    const videoIds = allVideos.map(v => v.videoId);
    for (let i = 0; i < videoIds.length; i += 50) {
      const batch = videoIds.slice(i, i + 50);
      try {
        const details = await getVideoDetails(batch);
        if (details.items) {
          for (const detail of details.items) {
            const video = allVideos.find(v => v.videoId === detail.id);
            if (video) {
              video.duration = parseDuration(detail.contentDetails.duration);
              video.views = parseInt(detail.statistics?.viewCount || 0);
            }
          }
        }
      } catch (error) {
        console.error(`  Error fetching video details: ${error.message}`);
      }
    }
  }

  // Tag matchdays based on fixture dates
  for (const video of allVideos) {
    const matchInfo = getMatchdayFromDate(video.publishedAt, fixtures);
    if (matchInfo) {
      video.matchday = matchInfo.matchday;
      video.stage = matchInfo.stage;
      video.fixtureTeams = `${matchInfo.homeTeam} vs ${matchInfo.awayTeam}`;
    } else {
      video.matchday = null;
      video.stage = null;
      video.fixtureTeams = null;
    }
  }

  // Sort by date (newest first)
  allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Keep latest 40
  const trimmed = allVideos.slice(0, 40);

  const output = {
    lastUpdated: new Date().toISOString(),
    featured: {
      match: trimmed.find(v => v.category === 'Full Match')?.videoId || trimmed[0]?.videoId || '',
      highlight: trimmed.find(v => v.category === 'Highlights')?.videoId || trimmed[0]?.videoId || '',
      interview: trimmed.find(v => v.category === 'Viral')?.videoId || trimmed[0]?.videoId || ''
    },
    videos: trimmed
  };

  fs.writeFileSync(VIDEO_FILE, JSON.stringify(output, null, 2));
  console.log(`\nUpdated ${VIDEO_FILE} with ${trimmed.length} videos`);
  console.log(`Categories: ${JSON.stringify(trimmed.reduce((acc, v) => { acc[v.category] = (acc[v.category] || 0) + 1; return acc; }, {}))}`);
  console.log(`Matchdays tagged: ${trimmed.filter(v => v.matchday).length}/${trimmed.length}`);
}

main();
