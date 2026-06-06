#!/usr/bin/env python3
"""
FIFA World Cup 2026 Archive Script
Run this script daily to archive news, matches, and standings.
Usage: python archive_data.py
"""

import json
import shutil
import sys
import io
from datetime import datetime
from pathlib import Path

# Fix encoding for Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE_DIR = Path(__file__).parent
ARCHIVE_DIR = BASE_DIR / "archive"
TODAY = datetime.now().strftime("%Y-%m-%d")


def ensure_dirs():
    """Ensure archive directories exist."""
    (ARCHIVE_DIR / "news").mkdir(parents=True, exist_ok=True)
    (ARCHIVE_DIR / "matches").mkdir(parents=True, exist_ok=True)
    (ARCHIVE_DIR / "standings").mkdir(parents=True, exist_ok=True)
    (ARCHIVE_DIR / "daily").mkdir(parents=True, exist_ok=True)


def load_json(filepath):
    """Load JSON file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def save_json(filepath, data):
    """Save JSON file."""
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def archive_news():
    """Archive current news."""
    news_file = BASE_DIR / "news.json"
    archive_file = ARCHIVE_DIR / "news" / f"news_{TODAY}.json"

    if news_file.exists():
        if not archive_file.exists():
            shutil.copy2(news_file, archive_file)
            print(f"✓ Archived news to {archive_file.name}")
        else:
            print(f"• News already archived for {TODAY}")


def archive_matches():
    """Archive current matches/scores."""
    scores_file = BASE_DIR / "scores.json"
    archive_file = ARCHIVE_DIR / "matches" / f"matches_{TODAY}.json"

    if scores_file.exists():
        if not archive_file.exists():
            shutil.copy2(scores_file, archive_file)
            print(f"✓ Archived matches to {archive_file.name}")
        else:
            print(f"• Matches already archived for {TODAY}")


def archive_standings():
    """Archive current standings."""
    standings_file = BASE_DIR / "standings.json"
    archive_file = ARCHIVE_DIR / "standings" / f"standings_{TODAY}.json"

    if standings_file.exists():
        if not archive_file.exists():
            shutil.copy2(standings_file, archive_file)
            print(f"✓ Archived standings to {archive_file.name}")
        else:
            print(f"• Standings already archived for {TODAY}")


def create_daily_summary():
    """Create a daily summary file."""
    daily_file = ARCHIVE_DIR / "daily" / f"daily_{TODAY}.json"

    if daily_file.exists():
        print(f"• Daily summary already exists for {TODAY}")
        return

    summary = {
        "date": TODAY,
        "tournament": "FIFA World Cup 2026",
        "news": load_json(BASE_DIR / "news.json"),
        "matches": load_json(BASE_DIR / "scores.json"),
        "standings": load_json(BASE_DIR / "standings.json"),
    }

    save_json(daily_file, summary)
    print(f"✓ Created daily summary for {TODAY}")


def update_archive_index():
    """Update the archive index with all archived files."""
    index_file = ARCHIVE_DIR / "index.json"

    # Load existing index or create new one
    index = load_json(index_file) or {
        "lastUpdated": datetime.now().isoformat() + "Z",
        "tournament": "FIFA World Cup 2026",
        "hostCountries": ["USA", "Canada", "Mexico"],
        "startDate": "2026-06-11",
        "endDate": "2026-07-19",
        "totalTeams": 48,
        "totalMatches": 104,
        "archiveIndex": {"news": [], "matches": [], "standings": [], "daily": []},
    }

    # Update timestamps
    index["lastUpdated"] = datetime.now().isoformat() + "Z"

    # Scan archive directories
    for category in ["news", "matches", "standings", "daily"]:
        category_dir = ARCHIVE_DIR / category
        if category_dir.exists():
            files = sorted([f.name for f in category_dir.glob("*.json")])
            index["archiveIndex"][category] = files

    save_json(index_file, index)
    print("✓ Updated archive index")


def main():
    """Main archive function."""
    print(f"FIFA World Cup 2026 Archive - {TODAY}")
    print("=" * 40)

    ensure_dirs()
    archive_news()
    archive_matches()
    archive_standings()
    create_daily_summary()
    update_archive_index()

    print("=" * 40)
    print("Archive complete!")


if __name__ == "__main__":
    main()
