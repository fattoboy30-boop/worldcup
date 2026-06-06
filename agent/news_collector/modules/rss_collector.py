"""
RSS Feed Collector
==================
Collects news from various sports RSS feeds.
"""

import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json
import re
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import RSS_FEEDS, COLLECTOR_SETTINGS, CATEGORY_KEYWORDS


class RSSCollector:
    """Collects news from RSS feeds."""

    def __init__(self):
        self.feeds = RSS_FEEDS
        self.timeout = COLLECTOR_SETTINGS["request_timeout"]
        self.max_articles = COLLECTOR_SETTINGS["max_articles_per_source"]
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": COLLECTOR_SETTINGS["user_agent"]})

    def collect_all_feeds(self):
        """Collect news from all configured RSS feeds."""
        all_articles = []

        for feed_name, feed_url in self.feeds.items():
            print(f"[RSS] Collecting from {feed_name}...")
            articles = self._collect_feed(feed_name, feed_url)
            all_articles.extend(articles)
            print(f"[RSS] Collected {len(articles)} articles from {feed_name}")

        print(f"[RSS] Total articles collected: {len(all_articles)}")
        return all_articles

    def _collect_feed(self, feed_name, feed_url):
        """Collect articles from a single RSS feed."""
        articles = []

        try:
            response = self.session.get(feed_url, timeout=self.timeout)
            response.raise_for_status()

            feed = feedparser.parse(response.content)

            for entry in feed.entries[: self.max_articles]:
                article = self._parse_entry(feed_name, entry)
                if article:
                    articles.append(article)

        except Exception as e:
            print(f"[RSS] Error collecting from {feed_name}: {e}")

        return articles

    def _parse_entry(self, feed_name, entry):
        """Parse a single RSS entry."""
        try:
            title = entry.get("title", "").strip()
            if not title:
                return None

            # Filter for FIFA/World Cup related content
            if not self._is_fifa_related(title):
                return None

            # Extract URL
            url = entry.get("link", "")

            # Extract date
            date = self._parse_date(entry)

            # Extract description/summary
            description = ""
            if hasattr(entry, "summary"):
                description = BeautifulSoup(entry.summary, "html.parser").get_text(
                    strip=True
                )
            elif hasattr(entry, "description"):
                description = BeautifulSoup(entry.description, "html.parser").get_text(
                    strip=True
                )

            # Extract thumbnail if available
            thumbnail = ""
            if hasattr(entry, "media_content") and entry.media_content:
                thumbnail = entry.media_content[0].get("url", "")
            elif hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
                thumbnail = entry.media_thumbnail[0].get("url", "")

            # Get source name
            source = self._get_source_name(feed_name)

            # Detect category
            category = self._detect_category(title + " " + description)

            return {
                "title": title,
                "source": source,
                "date": date,
                "url": url,
                "category": category,
                "thumbnail": thumbnail,
                "description": description[:200] if description else "",
            }

        except Exception as e:
            print(f"[RSS] Error parsing entry: {e}")
            return None

    def _is_fifa_related(self, text):
        """Check if text is related to FIFA/World Cup."""
        keywords = [
            "fifa",
            "world cup",
            "worldcup",
            "world cup 2026",
            "qualification",
            "qualifier",
            "national team",
            "football",
            "soccer",
            "tournament",
            "mbappe",
            "messi",
            "haaland",
            "bellingham",
        ]

        text_lower = text.lower()
        return any(keyword in text_lower for keyword in keywords)

    def _parse_date(self, entry):
        """Parse date from RSS entry."""
        try:
            if hasattr(entry, "published_parsed") and entry.published_parsed:
                return datetime(*entry.published_parsed[:6]).strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
            elif hasattr(entry, "updated_parsed") and entry.updated_parsed:
                return datetime(*entry.updated_parsed[:6]).strftime("%Y-%m-%d %H:%M:%S")
        except:
            pass

        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def _get_source_name(self, feed_name):
        """Get readable source name from feed name."""
        source_names = {
            "fifa": "FIFA Official",
            "espn_fc": "ESPN FC",
            "skysports": "Sky Sports",
            "bbc_sport": "BBC Sport",
            "guardian_football": "The Guardian Football",
            "reuters_sports": "Reuters Sports",
            ".goal": "Goal.com",
            "marca": "Marca",
            "gazzetta": "La Gazzetta dello Sport",
        }
        return source_names.get(feed_name, feed_name.replace("_", " ").title())

    def _detect_category(self, text):
        """Detect article category based on keywords."""
        text_lower = text.lower()

        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text_lower:
                    return category

        return "other"


if __name__ == "__main__":
    collector = RSSCollector()
    articles = collector.collect_all_feeds()
    print(json.dumps(articles[:3], indent=2))
