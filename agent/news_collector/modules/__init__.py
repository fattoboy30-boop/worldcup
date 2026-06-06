"""
News Collector Modules
======================
Package containing all news collection modules.
"""

from .fifa_scraper import FIFAScraper
from .rss_collector import RSSCollector
from .youtube_collector import YouTubeCollector
from .google_news_collector import GoogleNewsCollector
from .output_formatter import OutputFormatter, NewsDatabase

__all__ = [
    "FIFAScraper",
    "RSSCollector",
    "YouTubeCollector",
    "GoogleNewsCollector",
    "OutputFormatter",
    "NewsDatabase",
]
