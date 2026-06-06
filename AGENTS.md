# FIFA World Cup 2026 - Project Agents

## Project Overview

Interactive FIFA World Cup 2026 webpage with automated news collection and graphic design agents.

**Repository**: https://github.com/fattoboy30-boop/worldcup  
**Live Site**: https://fattoboy30-boop.github.io/worldcup/

---

## Agents

### 1. News Collector Agent
**Location**: `agent/news_collector/`

Collects FIFA World Cup news from multiple sources.

| Source | Status | Description |
|--------|--------|-------------|
| FIFA.com | Configured | Official FIFA website |
| RSS Feeds | Working | BBC Sport, Guardian, Sky Sports |
| YouTube | Configured | FIFA, ESPN FC, COPA90 |
| Google News | Working | Multiple search queries |

**Usage**:
```bash
cd agent/news_collector
python main.py --source all --format json csv markdown
```

**Output**: `title`, `source`, `date`, `url`, `category`, `thumbnail`

---

### 2. Graphic Designer Agent
**Location**: `agent/graphic_designer/`

Generates match posters, social media graphics, and team cards.

| Graphic Type | Status | Method |
|--------------|--------|--------|
| Match Posters | Working | Pillow, HTML/CSS |
| Team Cards | Working | Pillow, HTML/CSS |
| Social Media | Working | Pillow, HTML/CSS |
| AI Graphics | Configured | ComfyUI workflows |

**Usage**:
```bash
cd agent/graphic_designer

# Generate match poster
python graphic_designer.py poster --home "Brazil" --away "Argentina" --date "June 15" --time "20:00" --venue "MetLife Stadium"

# Generate team card
python graphic_designer.py card --team "Brazil"

# Batch generate
python graphic_designer.py batch --posters --cards --social-pack
```

**Browser Templates**: Open `templates/index.html` for interactive design.

---

## Main Webpage

**Files**:
- `index.html` - Main page structure
- `styles.css` - Styling (31KB)
- `script.js` - Interactivity (27KB)
- `news.json` - Curated news articles

**Features**:
- Live countdown to June 11, 2026
- 48 teams with flag images
- 16 host cities across 3 countries
- 6 featured player cards
- Interactive news section
- Fan zone with polls and quiz
- Facebook sharing integration
- Fully responsive design

---

## Team Colors

| Team | Primary | Secondary | Confederation |
|------|---------|-----------|---------------|
| Brazil | #009c3b | #ffdf00 | CONMEBOL |
| Argentina | #74acdf | #f6b40e | CONMEBOL |
| France | #002395 | #ed2939 | UEFA |
| England | #fff | #e3000b | UEFA |
| Germany | #000 | #dd0000 | UEFA |
| Spain | #aa151b | #f1bf00 | UEFA |
| USA | #3c3b6e | #b22234 | CONCACAF |
| Mexico | #006847 | #ce1126 | CONCACAF |
| Canada | #ff0000 | #fff | CONCACAF |

---

## Quick Commands

```bash
# Run news collector
python agent/news_collector/main.py --source all

# Generate graphics
python agent/graphic_designer/graphic_designer.py batch --cards

# Open in browser
start index.html

# Deploy to GitHub
git add . && git commit -m "update" && git push
```

---

## GitHub Pages

- **URL**: https://fattoboy30-boop.github.io/worldcup/
- **Auto-deploy**: Pushes to `main` branch auto-deploy
- **Workflow**: `.github/workflows/deploy.yml`

---

## Development

### Adding New Teams
Edit `script.js` and `agent/graphic_designer/graphic_designer.py` to add team data.

### Adding New News Sources
Edit `agent/news_collector/config.py` to add RSS feeds or YouTube channels.

### Customizing Graphics
Edit templates in `agent/graphic_designer/templates/` or modify the Pillow generator.

---

## License

Fan-made project for educational purposes. Not officially affiliated with FIFA.
