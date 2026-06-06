"""
FIFA Official Website Scraper
=============================
Scrapes news from FIFA.com official website.
"""

import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json
import re
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import FIFA_SOURCES, COLLECTOR_SETTINGS, CATEGORY_KEYWORDS


class FIFAScraper:
    """Scrapes news articles from FIFA.com official website."""

    def __init__(self):
        self.base_url = FIFA_SOURCES["base_url"]
        self.news_url = FIFA_SOURCES["news_url"]
        self.headers = FIFA_SOURCES["headers"]
        self.timeout = COLLECTOR_SETTINGS["request_timeout"]
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def scrape_fifa_news(self, max_articles=50):
        """Scrape news from FIFA website."""
        articles = []

        try:
            print("[FIFA] Fetching news from FIFA.com...")
            response = self.session.get(self.news_url, timeout=self.timeout)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, "html.parser")

            # Find article cards - FIFA uses various class names
            article_selectors = [
                "article",
                "[data-testid='article-card']",
                ".news-card",
                ".article-card",
                ".story-card",
            ]

            for selector in article_selectors:
                items = soup.select(selector)
                if items:
                    for item in items[:max_articles]:
                        article = self._parse_article(item)
                        if article:
                            articles.append(article)
                    break

            # If no articles found with selectors, try generic approach
            if not articles:
                articles = self._scrape_generic(soup, max_articles)

            print(f"[FIFA] Collected {len(articles)} articles")

        except requests.RequestException as e:
            print(f"[FIFA] Error fetching news: {e}")

        return articles

    def _parse_article(self, item):
        """Parse a single article from FIFA website."""
        try:
            # Extract title
            title_elem = item.find(["h1", "h2", "h3", "h4", "a"])
            title = title_elem.get_text(strip=True) if title_elem else None

            if not title:
                return None

            # Extract URL
            link = item.find("a")
            url = link.get("href", "") if link else ""
            if url and not url.startswith("http"):
                url = self.base_url + url

            # Extract date
            date_elem = item.find("time") or item.find(
                class_=re.compile(r"date|time|published", re.I)
            )
            date = self._parse_date(
                date_elem.get_text(strip=True) if date_elem else None
            )

            # Extract image
            img = item.find("img")
            thumbnail = img.get("src", "") if img else ""

            # Detect category
            category = self._detect_category(title)

            return {
                "title": title,
                "source": "FIFA.com",
                "date": date,
                "url": url,
                "category": category,
                "thumbnail": thumbnail,
            }

        except Exception as e:
            print(f"[FIFA] Error parsing article: {e}")
            return None

    def _scrape_generic(self, soup, max_articles):
        """Generic scraping approach for FIFA website."""
        articles = []

        # Look for any links with article-like content
        for link in soup.find_all("a", href=True):
            if len(articles) >= max_articles:
                break

            href = link.get("href", "")
            text = link.get_text(strip=True)

            # Filter for article links
            if len(text) > 20 and (
                "/news/" in href or "/article/" in href or "/story/" in href
            ):
                url = href if href.startswith("http") else self.base_url + href

                articles.append(
                    {
                        "title": text,
                        "source": "FIFA.com",
                        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "url": url,
                        "category": self._detect_category(text),
                        "thumbnail": "",
                    }
                )

        return articles

    def _parse_date(self, date_str):
        """Parse date string into standard format."""
        if not date_str:
            return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        formats = [
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%d",
            "%d/%m/%Y",
            "%B %d, %Y",
            "%b %d, %Y",
        ]

        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d %H:%M:%S")
            except ValueError:
                continue

        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def _detect_category(self, title):
        """Detect article category based on keywords."""
        title_lower = title.lower()

        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in title_lower:
                    return category

        return "other"


if __name__ == "__main__":
    scraper = FIFAScraper()
    articles = scraper.scrape_fifa_news()
    print(json.dumps(articles[:5], indent=2))
