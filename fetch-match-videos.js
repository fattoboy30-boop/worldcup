const fs = require('fs');
const https = require('https');
const path = require('path');

const ROOT = __dirname;
const SCORES_FILE = path.join(ROOT, 'scores.json');
const VIDEOS_FILE = path.join(ROOT, 'data', 'videos.json');

function fetchURL(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        clearTimeout(timer);
        return fetchURL(res.headers.location, timeout).then(resolve, reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => { clearTimeout(timer); resolve(data); });
    }).on('error', (e) => { clearTimeout(timer); reject(e); });
  });
}

function extractYouTubeLinks(html) {
  const links = [];
  // Find YouTube URLs
  const ytRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/g;
  let match;
  while ((match = ytRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return [...new Set(links)];
}

function extractTitlesNearVideo(html) {
  const results = [];
  // Find all result blocks
  const resultRegex = /<a[^>]*class="result__a"[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  while ((match = resultRegex.exec(html)) !== null) {
    const title = match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').trim();
    results.push(title);
  }
  return results;
}

function categorizeVideo(title) {
  const lower = title.toLowerCase();
  if (lower.includes('full match') || lower.includes('full replay') || lower.includes('full game'))
    return 'Full Match';
  if (lower.includes('viral') || lower.includes('funny') || lower.includes('best moment') || lower.includes('reaction') || lower.includes('celebration') || lower.includes('skill') || lower.includes('dribble'))
    return 'Viral';
  if (lower.includes('highlight') || lower.includes('goal') || lower.includes('all goals') || lower.includes('extended') || lower.includes('summary') || lower.includes('recap') || lower.includes('score'))
    return 'Highlights';
  if (lower.includes('press conference') || lower.includes('interview') || lower.includes('post-match') || lower.includes('preview') || lower.includes('prediction'))
    return 'Highlights';
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
    'Czechia', 'Czech', 'Sweden', 'Turkey', 'Norway', 'Ukraine', 'Wales', 'Austria',
    'Denmark', 'Haiti', 'Bosnia', 'New Zealand', 'Korea Republic', 'Korea'
  ];
  return teams.filter(team => title.toLowerCase().includes(team.toLowerCase()));
}

function getRecentMatches(scores) {
  const matches = [];
  const today = new Date();

  for (const match of scores.recentResults || []) {
    const matchDate = new Date(match.date);
    const daysAgo = (today - matchDate) / (1000 * 60 * 60 * 24);
    if (daysAgo <= 3) matches.push(match);
  }

  for (const match of scores.liveMatches || []) {
    matches.push(match);
  }

  for (const match of scores.upcomingMatches || []) {
    if (match.utcDate) {
      const matchTime = new Date(match.utcDate);
      const hoursUntil = (matchTime - today) / (1000 * 60 * 60);
      if (hoursUntil >= -2 && hoursUntil <= 12) matches.push(match);
    }
  }

  return matches;
}

function buildSearchQueries(match) {
  const home = match.homeTeam;
  const away = match.awayTeam;
  const queries = [];

  if (match.status === 'finished') {
    queries.push(`${home} vs ${away} World Cup 2026 highlights youtube`);
    queries.push(`${home} vs ${away} goals World Cup 2026 youtube`);
  } else if (['in_play', 'paused', 'live', '1h', '2h', 'ht'].includes(match.status)) {
    queries.push(`${home} vs ${away} live World Cup 2026 youtube`);
  } else {
    queries.push(`${home} vs ${away} World Cup 2026 preview youtube`);
  }

  return queries;
}

async function main() {
  console.log('=== Match Video Auto-Search (DuckDuckGo) ===\n');

  let scores;
  try {
    scores = JSON.parse(fs.readFileSync(SCORES_FILE, 'utf8'));
  } catch (e) {
    console.log('ERROR: Cannot read scores.json');
    process.exit(1);
  }

  let existingVideos;
  try {
    existingVideos = JSON.parse(fs.readFileSync(VIDEOS_FILE, 'utf8'));
  } catch (e) {
    existingVideos = { lastUpdated: new Date().toISOString(), featured: {}, videos: [] };
  }

  const existingIds = new Set(existingVideos.videos.map(v => v.videoId));
  const matches = getRecentMatches(scores);
  console.log(`Found ${matches.length} recent/live/upcoming matches\n`);

  if (matches.length === 0) {
    console.log('No matches to search for. Done.');
    return;
  }

  const newVideos = [];
  const seen = new Set();

  for (const match of matches) {
    const queries = buildSearchQueries(match);
    const matchLabel = `${match.homeTeam} vs ${match.awayTeam}`;
    console.log(`Searching: ${matchLabel} (${match.status})`);

    for (const query of queries) {
      try {
        console.log(`  Query: "${query}"`);
        const encodedQuery = encodeURIComponent(query);
        const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`;
        const html = await fetchURL(url);

        const videoIds = extractYouTubeLinks(html);
        const titles = extractTitlesNearVideo(html);

        let count = 0;
        for (let i = 0; i < videoIds.length; i++) {
          const videoId = videoIds[i];
          if (seen.has(videoId) || existingIds.has(videoId)) continue;
          seen.add(videoId);

          const title = titles[i] || `Match video: ${matchLabel}`;
          if (!title) continue;

          const titleLower = title.toLowerCase();
          const isWorldCup = titleLower.includes('world cup') || titleLower.includes('fifa') || titleLower.includes('2026');
          const isMatchRelated = titleLower.includes(match.homeTeam.toLowerCase()) || titleLower.includes(match.awayTeam.toLowerCase());
          if (!isWorldCup && !isMatchRelated) continue;

          newVideos.push({
            title,
            videoId,
            channel: 'Web Search',
            publishedAt: new Date().toISOString().split('T')[0],
            category: categorizeVideo(title),
            team: extractTeams(title).length ? extractTeams(title) : [match.homeTeam, match.awayTeam],
            duration: 'N/A',
            views: 0,
            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            matchday: match.group ? 1 : null,
            stage: match.stage || 'GROUP_STAGE',
            fixtureTeams: matchLabel,
            source: 'match-search'
          });
          count++;
        }
        console.log(`    Found ${count} new videos (${videoIds.length} total links)`);
      } catch (error) {
        console.log(`    Error: ${error.message}`);
      }

      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\nFound ${newVideos.length} new match videos total`);

  if (newVideos.length === 0) {
    console.log('No new videos to add. Done.');
    return;
  }

  const allVideos = [...newVideos, ...existingVideos.videos];
  const deduped = [];
  const finalSeen = new Set();
  for (const v of allVideos) {
    if (!finalSeen.has(v.videoId)) {
      finalSeen.add(v.videoId);
      deduped.push(v);
    }
  }

  deduped.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const trimmed = deduped.slice(0, 50);

  const matchHighlights = trimmed.filter(v => v.source === 'match-search' && v.category === 'Highlights');
  const matchFull = trimmed.filter(v => v.source === 'match-search' && v.category === 'Full Match');

  const output = {
    lastUpdated: new Date().toISOString(),
    featured: {
      match: matchHighlights[0]?.videoId || trimmed[0]?.videoId || '',
      highlight: matchFull[0]?.videoId || matchHighlights[0]?.videoId || trimmed[0]?.videoId || '',
      interview: trimmed.find(v => v.category === 'Viral')?.videoId || trimmed[0]?.videoId || ''
    },
    videos: trimmed
  };

  fs.writeFileSync(VIDEOS_FILE, JSON.stringify(output, null, 2));
  console.log(`\nUpdated videos.json: ${trimmed.length} total (${newVideos.length} new match videos)`);
}

main();
