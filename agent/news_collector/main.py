"""
FIFA World Cup News Collector Agent
====================================
Main orchestrator that collects news from multiple sources.
"""

import sys
import os
import argparse
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from modules.fifa_scraper import FIFAScraper
from modules.rss_collector import RSSCollector
from modules.youtube_collector import YouTubeCollector
from modules.google_news_collector import GoogleNewsCollector
from modules.output_formatter import OutputFormatter, NewsDatabase


class NewsCollectorAgent:
    """Main agent that orchestrates news collection from all sources."""

    def __init__(self):
        self.db = NewsDatabase()
        self.formatter = OutputFormatter()
        self.fifa_scraper = FIFAScraper()
        self.rss_collector = RSSCollector()
        self.youtube_collector = YouTubeCollector()
        self.google_news_collector = GoogleNewsCollector()

    def collect_from_fifa(self):
        """Collect news from FIFA website."""
        print("\n" + "=" * 60)
        print("COLLECTING FROM FIFA.COM")
        print("=" * 60)
        articles = self.fifa_scraper.scrape_fifa_news()
        added = self.db.add_articles(articles)
        print(f"Added {added} new articles from FIFA.com")
        return added

    def collect_from_rss(self):
        """Collect news from RSS feeds."""
        print("\n" + "=" * 60)
        print("COLLECTING FROM RSS FEEDS")
        print("=" * 60)
        articles = self.rss_collector.collect_all_feeds()
        added = self.db.add_articles(articles)
        print(f"Added {added} new articles from RSS feeds")
        return added

    def collect_from_youtube(self):
        """Collect news from YouTube channels."""
        print("\n" + "=" * 60)
        print("COLLECTING FROM YOUTUBE")
        print("=" * 60)
        articles = self.youtube_collector.collect_all_channels()
        added = self.db.add_articles(articles)
        print(f"Added {added} new articles from YouTube")
        return added

    def collect_from_google_news(self):
        """Collect news from Google News."""
        print("\n" + "=" * 60)
        print("COLLECTING FROM GOOGLE NEWS")
        print("=" * 60)
        articles = self.google_news_collector.collect_all_queries()
        added = self.db.add_articles(articles)
        print(f"Added {added} new articles from Google News")
        return added

    def collect_all(self):
        """Collect news from all sources."""
        print("\n" + "#" * 60)
        print(f"FIFA WORLD CUP NEWS COLLECTOR")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("#" * 60)

        total_added = 0

        # Collect from each source
        total_added += self.collect_from_fifa()
        total_added += self.collect_from_rss()
        total_added += self.collect_from_youtube()
        total_added += self.collect_from_google_news()

        print("\n" + "#" * 60)
        print(f"COLLECTION COMPLETE")
        print(f"Total unique articles collected: {len(self.db.get_all())}")
        print("#" * 60)

        return self.db.get_all()

    def save_results(self, formats=None):
        """Save collected results to files."""
        articles = self.db.get_all()

        if not articles:
            print("[Output] No articles to save")
            return []

        return self.formatter.format_output(articles, formats)

    def search(self, query):
        """Search collected articles."""
        return self.db.search(query)

    def get_by_category(self, category):
        """Get articles by category."""
        return self.db.get_by_category(category)

    def get_by_source(self, source):
        """Get articles by source."""
        return self.db.get_by_source(source)

    def get_recent(self, hours=24):
        """Get recent articles."""
        return self.db.get_recent(hours)


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="FIFA World Cup News Collector Agent")
    parser.add_argument(
        "--source",
        choices=["fifa", "rss", "youtube", "google", "all"],
        default="all",
        help="News source to collect from",
    )
    parser.add_argument(
        "--format",
        nargs="+",
        choices=["json", "csv", "markdown"],
        default=["json", "csv", "markdown"],
        help="Output formats",
    )
    parser.add_argument("--search", type=str, help="Search query")
    parser.add_argument("--category", type=str, help="Filter by category")
    parser.add_argument("--recent", type=int, help="Get articles from last N hours")

    args = parser.parse_args()

    agent = NewsCollectorAgent()

    # Collect news
    if args.source == "all":
        agent.collect_all()
    elif args.source == "fifa":
        agent.collect_from_fifa()
    elif args.source == "rss":
        agent.collect_from_rss()
    elif args.source == "youtube":
        agent.collect_from_youtube()
    elif args.source == "google":
        agent.collect_from_google_news()

    # Handle search/filter options
    if args.search:
        results = agent.search(args.search)
        print(f"\nSearch results for '{args.search}': {len(results)} articles")
        for article in results[:10]:
            print(f"  - {article['title']} ({article['source']})")
    elif args.category:
        results = agent.get_by_category(args.category)
        print(f"\nArticles in category '{args.category}': {len(results)}")
    elif args.recent:
        results = agent.get_recent(args.recent)
        print(f"\nRecent articles (last {args.recent} hours): {len(results)}")

    # Save results
    agent.save_results(args.format)


if __name__ == "__main__":
    main()
