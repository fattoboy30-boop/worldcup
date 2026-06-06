"""
FIFA World Cup News Collector - Configuration
=============================================
Central configuration for all news sources and settings.
"""

# ===== Output Format =====
OUTPUT_FORMAT = {
    "fields": ["title", "source", "date", "url", "category", "thumbnail"],
    "date_format": "%Y-%m-%d %H:%M:%S",
}

# ===== FIFA Official Sources =====
FIFA_SOURCES = {
    "base_url": "https://www.fifa.com",
    "news_url": "https://www.fifa.com/fifaplus/en/articles",
    "worldcup_url": "https://www.fifa.com/fifa-world-cup",
    "api_url": "https://api.fifa.com/api/v3",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    },
}

# ===== RSS Feed Sources =====
RSS_FEEDS = {
    "fifa": "https://www.fifa.com/rss/fifa/1706/news.xml",
    "espn_fc": "https://www.espn.com/espn/rss/fc/news",
    "skysports": "https://www.skysports.com/rss/12040",
    "bbc_sport": "https://feeds.bbci.co.uk/sport/football/rss.xml",
    "guardian_football": "https://www.theguardian.com/football/rss",
    "reuters_sports": "https://www.reuters.com/arc/outboundfeeds/v3/all/rss.xml",
    ".goal": "https://www.goal.com/en/rss/feed",
    "marca": "https://e00-marca.uecdn.es/assets/rss/futbol.xml",
    "gazzetta": "https://www.gazzetta.it/rss/home.xml",
}

# ===== YouTube Channels =====
YOUTUBE_CHANNELS = {
    "fifa": {
        "name": "FIFA",
        "channel_id": "UCJ4y7GAy0uPCSQldlYIaSdA",
        "url": "https://www.youtube.com/@FIFA",
    },
    "fifawc": {
        "name": "FIFA World Cup",
        "channel_id": "UCY9V2L8n6Zy0Ys-7vYRvSjA",
        "url": "https://www.youtube.com/@FIFAWorldCup",
    },
    "bt_sport": {
        "name": "TNT Sports",
        "channel_id": "UCpYnTZRsKgKPfwMzIE1Kcwg",
        "url": "https://www.youtube.com/@btsport",
    },
    "espn": {
        "name": "ESPN FC",
        "channel_id": "UCkIimWZ9gBJRamKF0rmPU8w",
        "url": "https://www.youtube.com/@ESPNFC",
    },
    "sky_sports": {
        "name": "Sky Sports Football",
        "channel_id": "UCfMIbA7cLYpP6Cl7-RPNPOA",
        "url": "https://www.youtube.com/@SkySportsFootball",
    },
    "copa90": {
        "name": "COPA90",
        "channel_id": "UC6MnqBf7Lh15fO6uLnNB0Rw",
        "url": "https://www.youtube.com/@COPA90",
    },
    "football_daily": {
        "name": "Football Daily",
        "channel_id": "UCYUzf4a-bfOFtIYzo16AYrg",
        "url": "https://www.youtube.com/@FootballDaily",
    },
    "tifo_football": {
        "name": "TIFO Football",
        "channel_id": "UCIaOKk2bV22K3387f2yOCzA",
        "url": "https://www.youtube.com/@TifoFootball",
    },
}

# ===== Google News Configuration =====
GOOGLE_NEWS = {
    "base_url": "https://news.google.com/rss/search",
    "queries": [
        "FIFA World Cup 2026",
        "World Cup 2026 news",
        "FIFA World Cup qualification",
        "World Cup 2026 tickets",
        "World Cup 2026 venues",
        "World Cup 2026 teams",
    ],
    "language": "en",
    "country": "US",
}

# ===== Sports News APIs (Free) =====
SPORTS_APIS = {
    "newsapi": {
        "base_url": "https://newsapi.org/v2/everything",
        "api_key": "",  # Add your API key
        "query": "FIFA World Cup",
    },
    "thesportsdb": {
        "base_url": "https://www.thesportsdb.com/api/v1/json/3",
        "search": "searchevents.php?e=FIFA",
    },
}

# ===== Collector Settings =====
COLLECTOR_SETTINGS = {
    "max_articles_per_source": 50,
    "request_timeout": 30,
    "retry_attempts": 3,
    "retry_delay": 5,
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "output_dir": "output",
    "output_file": "fifa_news_{date}.json",
    "csv_file": "fifa_news_{date}.csv",
}

# ===== Categories =====
CATEGORIES = {
    "breaking": "Breaking News",
    "transfers": "Transfers",
    "match_reports": "Match Reports",
    "injuries": "Injuries & Team News",
    "tickets": "Tickets & Events",
    "venues": "Venues & Infrastructure",
    "qualifiers": "Qualifiers",
    "analysis": "Analysis & Opinion",
    "history": "History & Statistics",
    "other": "Other",
}

# ===== Keywords for Category Detection =====
CATEGORY_KEYWORDS = {
    "breaking": ["breaking", "urgent", "just in", "confirmed", "announced"],
    "transfers": ["transfer", "sign", "deal", "contract", "move", "bid"],
    "match_reports": ["match", "game", "result", "score", "win", "lose", "draw"],
    "injuries": ["injury", "injured", "out", "ruled out", "recovery", "fitness"],
    "tickets": ["ticket", "sale", "purchase", "price", "hospitality"],
    "venues": ["stadium", "venue", "host city", "infrastructure", "construction"],
    "qualifiers": ["qualifier", "qualification", "group", "draw", "seeded"],
    "analysis": ["analysis", "opinion", "review", "tactical", "preview"],
    "history": ["history", "record", "statistic", "milestone", "achievement"],
}
