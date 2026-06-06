"""
YouTube Channel Collector
=========================
Collects videos from FIFA-related YouTube channels using RSS feeds.
"""

import feedparser
import requests
from datetime import datetime
import json
import re
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import YOUTUBE_CHANNELS, COLLECTOR_SETTINGS, CATEGORY_KEYWORDS


class YouTubeCollector:
    """Collects videos from YouTube channels via RSS feeds."""

    def __init__(self):
        self.channels = YOUTUBE_CHANNELS
        self.timeout = COLLECTOR_SETTINGS["request_timeout"]
        self.max_videos = COLLECTOR_SETTINGS["max_articles_per_source"]

    def collect_all_channels(self):
        """Collect videos from all configured YouTube channels."""
        all_videos = []

        for channel_key, channel_info in self.channels.items():
            print(f"[YouTube] Collecting from {channel_info['name']}...")
            videos = self._collect_channel(channel_key, channel_info)
            all_videos.extend(videos)
            print(
                f"[YouTube] Collected {len(videos)} videos from {channel_info['name']}"
            )

        print(f"[YouTube] Total videos collected: {len(all_videos)}")
        return all_videos

    def _collect_channel(self, channel_key, channel_info):
        """Collect videos from a single YouTube channel."""
        videos = []

        try:
            # YouTube provides RSS feeds for channels
            rss_url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_info['channel_id']}"

            response = requests.get(rss_url, timeout=self.timeout)
            response.raise_for_status()

            feed = feedparser.parse(response.content)

            for entry in feed.entries[: self.max_videos]:
                video = self._parse_entry(channel_info, entry)
                if video:
                    videos.append(video)

        except Exception as e:
            print(f"[YouTube] Error collecting from {channel_info['name']}: {e}")

        return videos

    def _parse_entry(self, channel_info, entry):
        """Parse a single YouTube RSS entry."""
        try:
            title = entry.get("title", "").strip()
            if not title:
                return None

            # Filter for FIFA/World Cup related content
            if not self._is_fifa_related(title):
                return None

            # Extract URL
            video_id = entry.get("yt_videoid", "")
            url = f"https://www.youtube.com/watch?v={video_id}" if video_id else ""

            # Extract date
            date = self._parse_date(entry)

            # Extract thumbnail
            thumbnail = ""
            if hasattr(entry, "media_thumbnail") and entry.media_thumbnail:
                thumbnail = entry.media_thumbnail[0].get("url", "")

            # Extract description
            description = ""
            if hasattr(entry, "media_group") and entry.media_group:
                for media in entry.media_group:
                    if hasattr(media, "media_description"):
                        description = media.media_description.get("content", "")
                        break

            # Detect category
            category = self._detect_category(title + " " + description)

            return {
                "title": title,
                "source": f"YouTube - {channel_info['name']}",
                "date": date,
                "url": url,
                "category": category,
                "thumbnail": thumbnail,
                "description": description[:200] if description else "",
                "video_id": video_id,
            }

        except Exception as e:
            print(f"[YouTube] Error parsing entry: {e}")
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
            "goal",
            "highlight",
            "match",
            "game",
        ]

        text_lower = text.lower()
        return any(keyword in text_lower for keyword in keywords)

    def _parse_date(self, entry):
        """Parse date from YouTube RSS entry."""
        try:
            if hasattr(entry, "published") and entry.published:
                # YouTube uses ISO 8601 format
                date_str = entry.published
                # Remove timezone info for parsing
                date_str = re.sub(r"[+-]\d{2}:\d{2}$", "", date_str)
                return datetime.fromisoformat(date_str).strftime("%Y-%m-%d %H:%M:%S")
        except:
            pass

        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def _detect_category(self, text):
        """Detect video category based on keywords."""
        text_lower = text.lower()

        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text_lower:
                    return category

        return "other"


class YouTubeAPICollector:
    """Collects videos using YouTube Data API (requires API key)."""

    def __init__(self, api_key=None):
        self.api_key = api_key
        self.base_url = "https://www.googleapis.com/youtube/v3"
        self.channels = YOUTUBE_CHANNELS

    def collect_channel_videos(self, channel_key, max_results=25):
        """Collect videos from a channel using YouTube API."""
        if not self.api_key:
            print("[YouTube API] No API key provided. Using RSS method instead.")
            collector = YouTubeCollector()
            return collector._collect_channel(channel_key, self.channels[channel_key])

        channel_info = self.channels.get(channel_key)
        if not channel_info:
            return []

        videos = []

        try:
            # Get recent videos from channel
            url = f"{self.base_url}/search"
            params = {
                "part": "snippet",
                "channelId": channel_info["channel_id"],
                "maxResults": max_results,
                "order": "date",
                "type": "video",
                "key": self.api_key,
            }

            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()

            for item in data.get("items", []):
                snippet = item.get("snippet", {})
                video_id = item.get("id", {}).get("videoId", "")

                title = snippet.get("title", "")
                if not self._is_fifa_related(title):
                    continue

                videos.append(
                    {
                        "title": title,
                        "source": f"YouTube - {channel_info['name']}",
                        "date": self._parse_api_date(snippet.get("publishedAt", "")),
                        "url": f"https://www.youtube.com/watch?v={video_id}",
                        "category": "other",
                        "thumbnail": snippet.get("thumbnails", {})
                        .get("high", {})
                        .get("url", ""),
                        "description": snippet.get("description", "")[:200],
                        "video_id": video_id,
                    }
                )

        except Exception as e:
            print(f"[YouTube API] Error: {e}")

        return videos

    def _is_fifa_related(self, text):
        """Check if text is related to FIFA/World Cup."""
        keywords = ["fifa", "world cup", "football", "soccer", "tournament"]
        text_lower = text.lower()
        return any(keyword in text_lower for keyword in keywords)

    def _parse_api_date(self, date_str):
        """Parse ISO 8601 date from YouTube API."""
        try:
            if date_str:
                date_str = re.sub(r"[+-]\d{2}:\d{2}$", "", date_str)
                return datetime.fromisoformat(date_str).strftime("%Y-%m-%d %H:%M:%S")
        except:
            pass
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


if __name__ == "__main__":
    collector = YouTubeCollector()
    videos = collector.collect_all_channels()
    print(json.dumps(videos[:3], indent=2))
