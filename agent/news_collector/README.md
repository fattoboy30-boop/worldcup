# FIFA World Cup News Collector Agent

An automated news collection agent that gathers FIFA World Cup news from multiple sources.

## Features

- **Multi-source collection**: FIFA.com, RSS feeds, YouTube, Google News
- **Smart filtering**: Only collects FIFA/World Cup related content
- **Category detection**: Automatically categorizes articles
- **Multiple output formats**: JSON, CSV, Markdown
- **Deduplication**: Avoids duplicate articles

## Sources

### FIFA Official
- FIFA.com news pages
- FIFA API endpoints

### RSS Feeds
- BBC Sport Football
- The Guardian Football
- Sky Sports
- ESPN FC
- And more...

### YouTube Channels
- FIFA
- FIFA World Cup
- ESPN FC
- Sky Sports Football
- COPA90
- Football Daily
- TIFO Football

### Google News
- FIFA World Cup 2026
- World Cup qualification
- World Cup venues
- World Cup teams
- And more...

## Usage

### Collect from all sources
```bash
python main.py --source all
```

### Collect from specific source
```bash
python main.py --source rss
python main.py --source youtube
python main.py --source google
python main.py --source fifa
```

### Output formats
```bash
python main.py --format json csv markdown
```

### Search collected articles
```bash
python main.py --search "Mbappe"
python main.py --category transfers
python main.py --recent 24
```

## Output Format

Each article contains:
```json
{
  "title": "Article Title",
  "source": "Source Name",
  "date": "2026-06-07 12:00:00",
  "url": "https://example.com/article",
  "category": "transfers",
  "thumbnail": "https://example.com/image.jpg",
  "description": "Article description..."
}
```

## Categories

- **breaking**: Breaking news
- **transfers**: Player transfers
- **match_reports**: Match reports
- **injuries**: Injuries & team news
- **tickets**: Tickets & events
- **venues**: Venues & infrastructure
- **qualifiers**: World Cup qualifiers
- **analysis**: Analysis & opinion
- **history**: History & statistics

## Installation

```bash
pip install -r requirements.txt
```

## Files

- `main.py` - Main orchestrator script
- `config.py` - Configuration for all sources
- `modules/` - Collection modules
  - `fifa_scraper.py` - FIFA website scraper
  - `rss_collector.py` - RSS feed collector
  - `youtube_collector.py` - YouTube channel collector
  - `google_news_collector.py` - Google News collector
  - `output_formatter.py` - Output formatting and storage
- `output/` - Collected news data
