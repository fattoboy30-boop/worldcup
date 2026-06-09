const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const NEWS_FILE = path.join(__dirname, 'news.json');
const RSS_FEEDS = [
  { name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/football/rss.xml' },
  { name: 'ESPN FC', url: 'https://www.espn.com/espn/rss/fc/news' },
  { name: 'The Guardian', url: 'https://www.theguardian.com/football/rss' },
  { name: 'Sky Sports', url: 'https://www.skysports.com/rss/12040' }
];

const GOOGLE_NEWS_QUERIES = [
  'FIFA World Cup 2026',
  'World Cup 2026 news today',
  'FIFA World Cup latest',
  'World Cup 2026 injury update',
  'World Cup 2026 squad',
  'World Cup 2026 tickets',
  'World Cup 2026 venue'
];

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchURL(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractCDATA(str) {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function parseRSS(xml, sourceName) {
  const articles = [];
  const items = xml.split('<item>').slice(1);

  for (const item of items) {
    const title = extractCDATA(extractBetween(item, '<title>', '</title>'));
    const link = extractBetween(item, '<link>', '</link>') || extractBetween(item, '<link/>', '');
    const pubDate = extractBetween(item, '<pubDate>', '</pubDate>');
    const description = extractCDATA(extractBetween(item, '<description>', '</description>'));
    const thumbnail = extractBetween(item, '<media:thumbnail', '/>') ||
                      extractBetween(item, '<media:content', '/>') ||
                      extractBetween(item, '<enclosure', '/>');
    let thumbUrl = '';
    const thumbMatch = thumbnail.match(/url="([^"]+)"/);
    if (thumbMatch) thumbUrl = thumbMatch[1];

    if (title && link && isWorldCupRelated(title + ' ' + description)) {
      articles.push({
        title: cleanHTML(title),
        source: sourceName,
        date: pubDate ? (() => { try { return new Date(pubDate).toISOString().split('T')[0]; } catch(e) { return new Date().toISOString().split('T')[0]; } })() : new Date().toISOString().split('T')[0],
        url: link.trim(),
        category: categorizeNews(title + ' ' + description),
        thumbnail: thumbUrl,
        description: cleanHTML(description).substring(0, 300)
      });
    }
  }
  return articles;
}

function parseGoogleNews(xml, query) {
  const articles = [];
  const items = xml.split('<item>').slice(1);

  for (const item of items) {
    const title = extractCDATA(extractBetween(item, '<title>', '</title>'));
    const link = extractBetween(item, '<link>', '</link>');
    const source = extractBetween(item, '<source', '</source>');
    const pubDate = extractBetween(item, '<pubDate>', '</pubDate>');
    const description = extractCDATA(extractBetween(item, '<description>', '</description>'));

    if (title && link && isWorldCupRelated(title + ' ' + description)) {
      articles.push({
        title: cleanHTML(title).replace(/ - [^-]+$/, ''),
        source: source || 'Google News',
        date: pubDate ? (() => { try { return new Date(pubDate).toISOString().split('T')[0]; } catch(e) { return new Date().toISOString().split('T')[0]; } })() : new Date().toISOString().split('T')[0],
        url: link.trim(),
        category: categorizeNews(title + ' ' + description),
        thumbnail: '',
        description: cleanHTML(description).substring(0, 300)
      });
    }
  }
  return articles;
}

function isWorldCupRelated(text) {
  const lower = text.toLowerCase();
  const keywords = [
    'world cup', 'fifa', 'qatar', 'soccer', 'football',
    'messi', 'mbappe', 'neymar', 'ronaldo', 'kane',
    'brazil', 'argentina', 'france', 'germany', 'england', 'spain',
    'usa 2026', 'worldcup', 'world cup 2026',
    'group a', 'group b', 'group c', 'group d',
    'knockout', 'quarter-final', 'semi-final', 'final',
    'transfer', 'injury', 'squad', 'roster', 'training',
    'metlife', 'sofi stadium', 'at&t stadium',
    'friendly', 'qualifier', 'warm-up'
  ];
  return keywords.some(kw => lower.includes(kw));
}

function categorizeNews(text) {
  const lower = text.toLowerCase();
  if (lower.includes('injury') || lower.includes('injured') || lower.includes('ruled out') || lower.includes('fitness'))
    return 'injuries';
  if (lower.includes('transfer') || lower.includes('sign') || lower.includes('deal') || lower.includes('contract'))
    return 'transfers';
  if (lower.includes('ticket') || lower.includes('stadium') || lower.includes('venue') || lower.includes('host'))
    return 'venues';
  if (lower.includes('result') || lower.includes('score') || lower.includes('win') || lower.includes('draw') || lower.includes('friendly'))
    return 'results';
  if (lower.includes('squad') || lower.includes('roster') || lower.includes('team') || lower.includes('lineup'))
    return 'squad';
  if (lower.includes('breaking') || lower.includes('confirm') || lower.includes('announce'))
    return 'breaking';
  return 'general';
}

function extractBetween(str, start, end) {
  const i = str.indexOf(start);
  if (i === -1) return '';
  const from = i + start.length;
  const j = str.indexOf(end, from);
  if (j === -1) return '';
  return str.substring(from, j);
}

function cleanHTML(str) {
  return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ').trim();
}

async function main() {
  const allArticles = [];
  const seenUrls = new Set();

  // Fetch from RSS feeds
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching from ${feed.name}...`);
      const xml = await fetchURL(feed.url);
      const articles = parseRSS(xml, feed.name);
      for (const article of articles) {
        if (!seenUrls.has(article.url)) {
          seenUrls.add(article.url);
          allArticles.push(article);
        }
      }
      console.log(`  ${feed.name}: ${articles.length} World Cup articles`);
    } catch (error) {
      console.error(`  Error fetching ${feed.name}: ${error.message}`);
    }
  }

  // Fetch from Google News RSS
  for (const query of GOOGLE_NEWS_QUERIES) {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
      console.log(`Fetching Google News: "${query}"...`);
      const xml = await fetchURL(url);
      const articles = parseGoogleNews(xml, query);
      for (const article of articles) {
        if (!seenUrls.has(article.url)) {
          seenUrls.add(article.url);
          allArticles.push(article);
        }
      }
      console.log(`  "${query}": ${articles.length} articles`);
    } catch (error) {
      console.error(`  Error for "${query}": ${error.message}`);
    }
  }

  // Sort by date (newest first)
  allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Load existing news and merge
  let existing = { lastUpdated: '', totalArticles: 0, articles: [] };
  try {
    existing = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
  } catch (e) {}

  // Merge with existing, keeping existing thumbnails for duplicates
  const existingMap = new Map(existing.articles.map(a => [a.url, a]));
  const merged = [];
  const mergedUrls = new Set();

  for (const article of allArticles) {
    if (!mergedUrls.has(article.url)) {
      mergedUrls.add(article.url);
      const existingArticle = existingMap.get(article.url);
      merged.push({
        ...article,
        thumbnail: article.thumbnail || existingArticle?.thumbnail || ''
      });
    }
  }

  // Add remaining existing articles not in new fetch
  for (const article of existing.articles) {
    if (!mergedUrls.has(article.url)) {
      mergedUrls.add(article.url);
      merged.push(article);
    }
  }

  const output = {
    lastUpdated: new Date().toISOString(),
    totalArticles: merged.length,
    articles: merged
  };

  fs.writeFileSync(NEWS_FILE, JSON.stringify(output, null, 2));
  console.log(`\nUpdated ${NEWS_FILE} with ${merged.length} articles`);
  console.log(`Categories: ${JSON.stringify(merged.reduce((acc, a) => { acc[a.category] = (acc[a.category] || 0) + 1; return acc; }, {}))}`);
}

main();
