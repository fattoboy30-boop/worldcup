"""
Google News Collector
=====================
Collects news from Google News RSS feeds.
"""

import feedparser
import requests
from datetime import datetime
import json
import re
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import GOOGLE_NEWS, COLLECTOR_SETTINGS, CATEGORY_KEYWORDS


class GoogleNewsCollector:
    """Collects news from Google News RSS feeds."""

    def __init__(self):
        self.config = GOOGLE_NEWS
        self.timeout = COLLECTOR_SETTINGS["request_timeout"]
        self.max_articles = COLLECTOR_SETTINGS["max_articles_per_source"]

    def collect_all_queries(self):
        """Collect news for all configured search queries."""
        all_articles = []
        seen_titles = set()  # Avoid duplicates

        for query in self.config["queries"]:
            print(f"[Google News] Searching: {query}")
            articles = self._collect_query(query)

            # Deduplicate by title
            for article in articles:
                title_key = article["title"].lower().strip()
                if title_key not in seen_titles:
                    seen_titles.add(title_key)
                    all_articles.append(article)

            print(f"[Google News] Found {len(articles)} articles for '{query}'")

        print(f"[Google News] Total unique articles: {len(all_articles)}")
        return all_articles

    def _collect_query(self, query):
        """Collect news for a single search query."""
        articles = []

        try:
            # Build Google News RSS URL
            encoded_query = requests.utils.quote(query)
            rss_url = f"{self.config['base_url']}?q={encoded_query}&hl={self.config['language']}-{self.config['country']}&gl={self.config['country']}&ceid={self.config['country']}:en"

            response = requests.get(rss_url, timeout=self.timeout)
            response.raise_for_status()

            feed = feedparser.parse(response.content)

            for entry in feed.entries[: self.max_articles]:
                article = self._parse_entry(entry)
                if article:
                    articles.append(article)

        except Exception as e:
            print(f"[Google News] Error collecting for '{query}': {e}")

        return articles

    def _parse_entry(self, entry):
        """Parse a single Google News RSS entry."""
        try:
            title = entry.get("title", "").strip()
            if not title:
                return None

            # Google News adds " - Source" at the end
            source_name = "Google News"
            title_clean = title

            if " - " in title:
                parts = title.rsplit(" - ", 1)
                if len(parts) == 2 and len(parts[1]) < 50:
                    title_clean = parts[0].strip()
                    source_name = parts[1].strip()

            # Extract URL
            url = entry.get("link", "")

            # Extract date
            date = self._parse_date(entry)

            # Extract source from entry if available
            if hasattr(entry, "source") and entry.source:
                source_name = entry.source.get("title", source_name)

            # Extract thumbnail
            thumbnail = ""
            if hasattr(entry, "media_content") and entry.media_content:
                for media in entry.media_content:
                    if media.get("medium") == "image":
                        thumbnail = media.get("url", "")
                        break

            # Detect category
            category = self._detect_category(title_clean)

            return {
                "title": title_clean,
                "source": source_name,
                "date": date,
                "url": url,
                "category": category,
                "thumbnail": thumbnail,
            }

        except Exception as e:
            print(f"[Google News] Error parsing entry: {e}")
            return None

    def _parse_date(self, entry):
        """Parse date from Google News RSS entry."""
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

    def _detect_category(self, text):
        """Detect article category based on keywords."""
        text_lower = text.lower()

        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text_lower:
                    return category

        return "other"


class GoogleNewsSearch:
    """Advanced Google News search with filtering."""

    def __init__(self):
        self.collector = GoogleNewsCollector()

    def search_by_category(self, category, max_results=20):
        """Search news filtered by category."""
        all_articles = self.collector.collect_all_queries()

        filtered = [a for a in all_articles if a["category"] == category]
        return filtered[:max_results]

    def search_by_source(self, source_name, max_results=20):
        """Search news filtered by source."""
        all_articles = self.collector.collect_all_queries()

        filtered = [
            a for a in all_articles if source_name.lower() in a["source"].lower()
        ]
        return filtered[:max_results]

    def search_recent(self, hours=24, max_results=20):
        """Search for recent news within specified hours."""
        all_articles = self.collector.collect_all_queries()

        cutoff = datetime.now().timestamp() - (hours * 3600)
        recent = []

        for article in all_articles:
            try:
                article_time = datetime.strptime(
                    article["date"], "%Y-%m-%d %H:%M:%S"
                ).timestamp()
                if article_time >= cutoff:
                    recent.append(article)
            except:
                recent.append(article)  # Include if date parsing fails

        return recent[:max_results]


if __name__ == "__main__":
    collector = GoogleNewsCollector()
    articles = collector.collect_all_queries()
    print(json.dumps(articles[:5], indent=2))
