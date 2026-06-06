"""
Output Formatter & Storage
===========================
Formats and stores collected news data in multiple formats.
"""

import json
import csv
import os
from datetime import datetime
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import OUTPUT_FORMAT, COLLECTOR_SETTINGS


class OutputFormatter:
    """Formats and stores news data."""

    def __init__(self):
        self.output_dir = COLLECTOR_SETTINGS["output_dir"]
        self.date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        self._ensure_output_dir()

    def _ensure_output_dir(self):
        """Ensure output directory exists."""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def save_json(self, articles, filename=None):
        """Save articles to JSON file."""
        if not filename:
            filename = f"fifa_news_{self.date_str}.json"

        filepath = os.path.join(self.output_dir, filename)

        output = {
            "metadata": {
                "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "total_articles": len(articles),
                "sources": list(set(a.get("source", "") for a in articles)),
                "categories": list(set(a.get("category", "") for a in articles)),
            },
            "articles": articles,
        }

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)

        print(f"[Output] Saved {len(articles)} articles to {filepath}")
        return filepath

    def save_csv(self, articles, filename=None):
        """Save articles to CSV file."""
        if not filename:
            filename = f"fifa_news_{self.date_str}.csv"

        filepath = os.path.join(self.output_dir, filename)

        # Filter to output fields
        fields = OUTPUT_FORMAT["fields"]
        filtered_articles = []

        for article in articles:
            filtered = {k: article.get(k, "") for k in fields}
            filtered_articles.append(filtered)

        with open(filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fields)
            writer.writeheader()
            writer.writerows(filtered_articles)

        print(f"[Output] Saved {len(articles)} articles to {filepath}")
        return filepath

    def save_markdown(self, articles, filename=None):
        """Save articles to Markdown file."""
        if not filename:
            filename = f"fifa_news_{self.date_str}.md"

        filepath = os.path.join(self.output_dir, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write("# FIFA World Cup News Collection\n\n")
            f.write(
                f"**Collected at:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
            )
            f.write(f"**Total Articles:** {len(articles)}\n\n")

            # Group by category
            categories = {}
            for article in articles:
                cat = article.get("category", "other")
                if cat not in categories:
                    categories[cat] = []
                categories[cat].append(article)

            for category, cat_articles in sorted(categories.items()):
                f.write(f"## {category.replace('_', ' ').title()}\n\n")

                for article in cat_articles:
                    f.write(f"### {article.get('title', 'No Title')}\n\n")
                    f.write(f"- **Source:** {article.get('source', 'Unknown')}\n")
                    f.write(f"- **Date:** {article.get('date', 'Unknown')}\n")
                    if article.get("url"):
                        f.write(f"- **Link:** [{article['url']}]({article['url']})\n")
                    if article.get("description"):
                        f.write(f"\n{article['description']}\n")
                    f.write("\n---\n\n")

        print(f"[Output] Saved {len(articles)} articles to {filepath}")
        return filepath

    def print_summary(self, articles):
        """Print a summary of collected articles."""
        print("\n" + "=" * 60)
        print("COLLECTION SUMMARY")
        print("=" * 60)
        print(f"Total articles collected: {len(articles)}")

        # Source breakdown
        sources = {}
        for article in articles:
            source = article.get("source", "Unknown")
            sources[source] = sources.get(source, 0) + 1

        print("\nBy Source:")
        for source, count in sorted(sources.items(), key=lambda x: x[1], reverse=True):
            try:
                print(f"  {source}: {count}")
            except UnicodeEncodeError:
                print(f"  [Encoded Source]: {count}")

        # Category breakdown
        categories = {}
        for article in articles:
            category = article.get("category", "other")
            categories[category] = categories.get(category, 0) + 1

        print("\nBy Category:")
        for category, count in sorted(
            categories.items(), key=lambda x: x[1], reverse=True
        ):
            print(f"  {category.replace('_', ' ').title()}: {count}")

        print("=" * 60 + "\n")

    def format_output(self, articles, formats=None):
        """Save articles in multiple formats."""
        if formats is None:
            formats = ["json", "csv", "markdown"]

        saved_files = []

        if "json" in formats:
            saved_files.append(self.save_json(articles))

        if "csv" in formats:
            saved_files.append(self.save_csv(articles))

        if "markdown" in formats:
            saved_files.append(self.save_markdown(articles))

        self.print_summary(articles)

        return saved_files


class NewsDatabase:
    """Simple in-memory database for news articles."""

    def __init__(self):
        self.articles = []
        self.seen_urls = set()

    def add_article(self, article):
        """Add an article to the database."""
        url = article.get("url", "")
        if url and url not in self.seen_urls:
            self.seen_urls.add(url)
            self.articles.append(article)
            return True
        return False

    def add_articles(self, articles):
        """Add multiple articles to the database."""
        added = 0
        for article in articles:
            if self.add_article(article):
                added += 1
        return added

    def get_all(self):
        """Get all articles."""
        return self.articles

    def get_by_category(self, category):
        """Get articles by category."""
        return [a for a in self.articles if a.get("category") == category]

    def get_by_source(self, source):
        """Get articles by source."""
        return [
            a for a in self.articles if source.lower() in a.get("source", "").lower()
        ]

    def get_recent(self, hours=24):
        """Get recent articles."""
        cutoff = datetime.now().timestamp() - (hours * 3600)
        recent = []

        for article in self.articles:
            try:
                article_time = datetime.strptime(
                    article["date"], "%Y-%m-%d %H:%M:%S"
                ).timestamp()
                if article_time >= cutoff:
                    recent.append(article)
            except:
                recent.append(article)

        return recent

    def search(self, query):
        """Search articles by query."""
        query_lower = query.lower()
        results = []

        for article in self.articles:
            title = article.get("title", "").lower()
            desc = article.get("description", "").lower()

            if query_lower in title or query_lower in desc:
                results.append(article)

        return results

    def clear(self):
        """Clear all articles."""
        self.articles = []
        self.seen_urls = set()
