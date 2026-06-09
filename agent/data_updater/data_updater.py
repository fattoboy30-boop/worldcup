#!/usr/bin/env python3
"""
FIFA World Cup 2026 - Data Updater Agent

Fetches live World Cup data from football-data.org API and updates
the project's JSON files (fixtures, scores, standings, scorers, statistics).

Based on the data structure from:
https://github.com/Adya84/ha-world-cup-2026

API: https://api.football-data.org/v4/
Competition code: WC (FIFA World Cup)

Usage:
    python data_updater.py                    # Update all files
    python data_updater.py -- fixtures scores # Update specific files only
    python data_updater.py --dry-run          # Preview without writing
    python data_updater.py --api-key YOUR_KEY # Use specific API key
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

try:
    import requests
except ImportError:
    print("ERROR: 'requests' library required. Install with: pip install requests")
    sys.exit(1)


# =============================================================================
# Configuration
# =============================================================================

BASE_URL = "https://api.football-data.org/v4"
COMPETITION = "WC"

DEFAULT_API_KEY = os.environ.get("FOOTBALL_DATA_API_KEY", "")

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
JSON_DIR = PROJECT_ROOT

FILES = {
    "fixtures": JSON_DIR / "fixtures.json",
    "scores": JSON_DIR / "scores.json",
    "standings": JSON_DIR / "standings.json",
    "scorers": JSON_DIR / "scorers.json",
    "statistics": JSON_DIR / "statistics.json",
}

LIVE_STATUSES = {"IN_PLAY", "PAUSED", "LIVE", "1H", "2H", "HT"}
FINISHED_STATUSES = {"FINISHED", "FT", "AET", "PEN"}
SCHEDULED_STATUSES = {"TIMED", "SCHEDULED"}

FLAG_SOURCE = "https://flagcdn.com/w160"

# =============================================================================
# Team Name -> Country Code Mapping (for flag images)
# Maps football-data.org team names to ISO country codes for flagcdn
# =============================================================================

TEAM_CODE_MAP = {
    # Pot 1 (Hosts + top ranked)
    "Mexico": "mx",
    "Canada": "ca",
    "USA": "us",
    "Brazil": "br",
    "Argentina": "ar",
    "France": "fr",
    "England": "gb-eng",
    "Spain": "es",
    "Netherlands": "nl",
    "Germany": "de",
    "Belgium": "be",
    "Portugal": "pt",
    # Pot 2
    "Colombia": "co",
    "Uruguay": "uy",
    "Croatia": "hr",
    "Morocco": "ma",
    "Japan": "jp",
    "Senegal": "sn",
    "IR Iran": "ir",
    "Iran": "ir",
    "Australia": "au",
    "South Korea": "kr",
    "Saudi Arabia": "sa",
    "Egypt": "eg",
    "Tunisia": "tn",
    "Switzerland": "ch",
    # Pot 3
    "USA": "us",
    "Ecuador": "ec",
    "Paraguay": "py",
    "Côte d'Ivoire": "ci",
    "Ivory Coast": "ci",
    "Nigeria": "ng",
    "Scotland": "gb-sct",
    "Norway": "no",
    "Japan": "jp",
    "Sweden": "se",
    "Panama": "pa",
    "Algeria": "dz",
    "Austria": "at",
    "Qatar": "qa",
    "Czechia": "cz",
    "Czech Republic": "cz",
    # Pot 4
    "New Zealand": "nz",
    "Ghana": "gh",
    "Curaçao": "cw",
    "Jamaica": "jm",
    "Cabo Verde": "cv",
    "Cape Verde": "cv",
    "Haiti": "ht",
    "South Africa": "za",
    "DR Congo": "cd",
    "Iraq": "iq",
    "Jordan": "jo",
    "Uzbekistan": "uz",
    "Saudi Arabia": "sa",
    # Additional teams that may appear
    "Italy": "it",
    "Turkey": "tr",
    "Türkiye": "tr",
    "Poland": "pl",
    "Wales": "gb-wls",
    "Scotland": "gb-sct",
    "Nigeria": "ng",
    "Cameroon": "cm",
    "Ghana": "gh",
    "Senegal": "sn",
    "Morocco": "ma",
    "Tunisia": "tn",
    "Algeria": "dz",
    "Egypt": "eg",
    "Iran": "ir",
    "Iraq": "iq",
    "Saudi Arabia": "sa",
    "Qatar": "qa",
    "Japan": "jp",
    "South Korea": "kr",
    "Australia": "au",
    "China PR": "cn",
    "China": "cn",
    "India": "in",
    "Thailand": "th",
    "Vietnam": "vn",
    "Canada": "ca",
    "Mexico": "mx",
    "USA": "us",
    "Costa Rica": "cr",
    "Honduras": "hn",
    "Jamaica": "jm",
    "Panama": "pa",
    "Trinidad and Tobago": "tt",
    "Brazil": "br",
    "Argentina": "ar",
    "Uruguay": "uy",
    "Colombia": "co",
    "Peru": "pe",
    "Chile": "cl",
    "Ecuador": "ec",
    "Paraguay": "py",
    "Bolivia": "bo",
    "Venezuela": "ve",
    "Germany": "de",
    "France": "fr",
    "Spain": "es",
    "England": "gb-eng",
    "Italy": "it",
    "Netherlands": "nl",
    "Portugal": "pt",
    "Belgium": "be",
    "Croatia": "hr",
    "Denmark": "dk",
    "Switzerland": "ch",
    "Austria": "at",
    "Czech Republic": "cz",
    "Czechia": "cz",
    "Poland": "pl",
    "Sweden": "se",
    "Norway": "no",
    "Serbia": "rs",
    "Scotland": "gb-sct",
    "Wales": "gb-wls",
    "Hungary": "hu",
    "Romania": "ro",
    "Greece": "gr",
    "Ireland": "ie",
    "Rep. Ireland": "ie",
    "Northern Ireland": "gb-nir",
    "Finland": "fi",
    "Iceland": "is",
    "Slovakia": "sk",
    "Slovenia": "si",
    "Albania": "al",
    "North Macedonia": "mk",
    "Bulgaria": "bg",
    "Belarus": "by",
    "Ukraine": "ua",
    "Bosnia and Herzegovina": "ba",
    "Montenegro": "me",
    "Kosovo": "xk",
    "Moldova": "md",
    "Georgia": "ge",
    "Armenia": "am",
    "Azerbaijan": "az",
    "Israel": "il",
    "Cyprus": "cy",
    "Estonia": "ee",
    "Latvia": "lv",
    "Lithuania": "lt",
    "Luxembourg": "lu",
    "Malta": "mt",
    "Faroe Islands": "fo",
    "Kazakhstan": "kz",
    # Africa
    "Cameroon": "cm",
    "Nigeria": "ng",
    "Senegal": "sn",
    "Ghana": "gh",
    "Morocco": "ma",
    "Tunisia": "tn",
    "Algeria": "dz",
    "Egypt": "eg",
    "South Africa": "za",
    "DR Congo": "cd",
    "Côte d'Ivoire": "ci",
    "Mali": "ml",
    "Burkina Faso": "bf",
    "Guinea": "gn",
    "Benin": "bj",
    "Uganda": "ug",
    "Zambia": "zm",
    "Zimbabwe": "zw",
    "Angola": "ao",
    "Mozambique": "mz",
    "Madagascar": "mg",
    "Namibia": "na",
    "Tanzania": "tz",
    "Kenya": "ke",
    "Sudan": "sd",
    # Asia
    "Japan": "jp",
    "South Korea": "kr",
    "Australia": "au",
    "Iran": "ir",
    "Saudi Arabia": "sa",
    "Iraq": "iq",
    "Qatar": "qa",
    "UAE": "ae",
    "China PR": "cn",
    "China": "cn",
    "Syria": "sy",
    "Lebanon": "lb",
    "Jordan": "jo",
    "Kyrgyzstan": "kg",
    "Tajikistan": "tj",
    "India": "in",
    "Thailand": "th",
    "Vietnam": "vn",
    "Oman": "om",
    "Bahrain": "bh",
    "Palestine": "ps",
    "Yemen": "ye",
    "Turkmenistan": "tm",
    "Uzbekistan": "uz",
    "Kazakhstan": "kz",
    "Chinese Taipei": "tw",
    # North/Central America & Caribbean
    "Mexico": "mx",
    "USA": "us",
    "Canada": "ca",
    "Costa Rica": "cr",
    "Panama": "pa",
    "Honduras": "hn",
    "Jamaica": "jm",
    "Trinidad and Tobago": "tt",
    "Haiti": "ht",
    "Cuba": "cu",
    "El Salvador": "sv",
    "Guatemala": "gt",
    "Nicaragua": "ni",
    "Belize": "bz",
    "Curaçao": "cw",
    "Suriname": "sr",
    "Grenada": "gd",
    "Barbados": "bb",
    "Saint Lucia": "lc",
    "Saint Vincent and the Grenadines": "vc",
    "Saint Kitts and Nevis": "kn",
    "Antigua and Barbuda": "ag",
    "Dominican Republic": "do",
    "Bermuda": "bm",
    # Oceania
    "New Zealand": "nz",
    "Solomon Islands": "sb",
    "Fiji": "fj",
    "Papua New Guinea": "pg",
    "Tahiti": "pf",
}


def get_country_code(team_name: str) -> str:
    """Get ISO country code for a team name for flag image lookup."""
    code = TEAM_CODE_MAP.get(team_name)
    if code:
        return code
    # Fuzzy fallback: try lowercase match
    name_lower = team_name.lower()
    for name, code in TEAM_CODE_MAP.items():
        if name.lower() == name_lower:
            return code
    # Try partial match
    for name, code in TEAM_CODE_MAP.items():
        if name_lower in name.lower() or name.lower() in name_lower:
            return code
    return "un"  # unknown flag


def get_flag_url(team_name: str) -> str:
    """Get flagcdn URL for a team."""
    code = get_country_code(team_name)
    return f"{FLAG_SOURCE}/{code}.png"


# =============================================================================
# API Client
# =============================================================================


class WorldCupAPI:
    """Client for football-data.org World Cup API."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = BASE_URL
        self.headers = {"X-Auth-Token": api_key} if api_key else {}

    def _get(self, endpoint: str) -> dict:
        """Make GET request to API."""
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, headers=self.headers, timeout=30)
        response.raise_for_status()
        return response.json()

    def get_matches(self) -> list[dict]:
        """Fetch all World Cup matches."""
        data = self._get(f"/competitions/{COMPETITION}/matches")
        return data.get("matches", [])

    def get_standings(self) -> list[dict]:
        """Fetch group stage standings."""
        data = self._get(f"/competitions/{COMPETITION}/standings")
        return data.get("standings", [])

    def get_scorers(self) -> list[dict]:
        """Fetch top scorers (up to 100)."""
        data = self._get(f"/competitions/{COMPETITION}/scorers?limit=100")
        return data.get("scorers", [])


# =============================================================================
# Data Conversion: football-data.org -> Our Format
# =============================================================================


def parse_utc_date(utc_date: str) -> tuple[str, str]:
    """Parse UTC date string to (date, time) in local display format."""
    dt = datetime.fromisoformat(utc_date.replace("Z", "+00:00"))
    return dt.strftime("%Y-%m-%d"), dt.strftime("%H:%M")


def clean_group_name(api_group: str | None) -> str | None:
    """Convert 'GROUP_A' to 'A'."""
    if api_group and api_group.startswith("GROUP_"):
        return api_group.replace("GROUP_", "")
    return api_group


def get_score_full(match: dict) -> tuple[int | None, int | None]:
    """Extract full-time scores from match."""
    score = match.get("score", {})
    ft = score.get("fullTime", {})
    return ft.get("home"), ft.get("away")


def get_score_half(match: dict) -> tuple[int | None, int | None]:
    """Extract half-time scores from match."""
    score = match.get("score", {})
    ht = score.get("halfTime", {})
    return ht.get("home"), ht.get("away")


def team_name_from_api(team: dict) -> str:
    """Extract best team name from API team object."""
    return team.get("shortName") or team.get("name") or team.get("tla") or "TBD"


def match_stage_label(match: dict) -> str:
    """Get human-readable stage label."""
    stage = match.get("stage", "")
    stage_map = {
        "GROUP_STAGE": "group",
        "ROUND_OF_32": "roundOf32",
        "ROUND_OF_16": "roundOf16",
        "QUARTER_FINALS": "quarterFinals",
        "SEMI_FINALS": "semiFinals",
        "THIRD_PLACE": "thirdPlace",
        "FINAL": "final",
    }
    return stage_map.get(stage, stage.lower())


# =============================================================================
# Converter: Matches -> fixtures.json update
# =============================================================================


def update_fixtures(api_matches: list[dict], existing: dict) -> dict:
    """
    Update fixtures.json with live scores from API.
    Preserves the existing fixture structure and adds score data.
    """
    # Build lookup by match ID from API
    api_by_id = {}
    for m in api_matches:
        api_by_id[m.get("id")] = m

    # Update group stage fixtures
    for fixture in existing.get("fixtures", []):
        api_match = api_by_id.get(fixture.get("id"))
        if api_match:
            home_score, away_score = get_score_full(api_match)
            status = api_match.get("status", "")
            fixture["status"] = status.lower()
            if home_score is not None:
                fixture["homeScore"] = home_score
            if away_score is not None:
                fixture["awayScore"] = away_score
            ht_home, ht_away = get_score_half(api_match)
            if ht_home is not None:
                fixture["homeScoreHT"] = ht_home
            if ht_away is not None:
                fixture["awayScoreHT"] = ht_away
            # Update team names if API has better data
            if api_match.get("homeTeam", {}).get("shortName"):
                fixture["homeTeam"] = team_name_from_api(api_match["homeTeam"])
                fixture["homeFlag"] = get_flag_url(fixture["homeTeam"])
            if api_match.get("awayTeam", {}).get("shortName"):
                fixture["awayTeam"] = team_name_from_api(api_match["awayTeam"])
                fixture["awayFlag"] = get_flag_url(fixture["awayTeam"])

    # Update knockout stage fixtures
    knockout = existing.get("knockoutStage", {})
    for round_key in [
        "roundOf32",
        "roundOf16",
        "quarterFinals",
        "semiFinals",
        "thirdPlace",
        "final",
    ]:
        round_data = knockout.get(round_key, {})
        for fixture in round_data.get("matches", []):
            api_match = api_by_id.get(fixture.get("id"))
            if api_match:
                home_score, away_score = get_score_full(api_match)
                status = api_match.get("status", "")
                fixture["status"] = status.lower()
                if home_score is not None:
                    fixture["homeScore"] = home_score
                if away_score is not None:
                    fixture["awayScore"] = away_score
                # Update team names for resolved knockout matches
                if api_match.get("homeTeam", {}).get("shortName"):
                    tn = team_name_from_api(api_match["homeTeam"])
                    if tn != "TBC":
                        fixture["homeTeam"] = tn
                        fixture["homeFlag"] = get_flag_url(tn)
                if api_match.get("awayTeam", {}).get("shortName"):
                    tn = team_name_from_api(api_match["awayTeam"])
                    if tn != "TBC":
                        fixture["awayTeam"] = tn
                        fixture["awayFlag"] = get_flag_url(tn)

    existing["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    return existing


# =============================================================================
# Converter: Matches -> scores.json
# =============================================================================


def build_scores(api_matches: list[dict]) -> dict:
    """Build scores.json from API matches."""
    live_matches = []
    recent_results = []
    upcoming_matches = []

    for match in api_matches:
        status = match.get("status", "")
        date, time = parse_utc_date(match.get("utcDate", ""))
        home_name = team_name_from_api(match.get("homeTeam", {}))
        away_name = team_name_from_api(match.get("awayTeam", {}))
        home_code = get_country_code(home_name)
        away_code = get_country_code(away_name)
        home_score, away_score = get_score_full(match)
        group = clean_group_name(match.get("group"))
        stage = match_stage_label(match)

        venue = match.get("venue", "")
        if not venue:
            # Try to infer from match area
            area = match.get("area", {})
            venue = area.get("name", "")

        base = {
            "id": match.get("id"),
            "date": date,
            "time": time,
            "homeTeam": home_name,
            "homeCode": home_code,
            "homeScore": home_score,
            "awayTeam": away_name,
            "awayCode": away_code,
            "awayScore": away_score,
            "venue": venue,
            "city": "",
            "status": status.lower(),
            "group": group,
            "stage": stage,
        }

        if status in LIVE_STATUSES:
            base["minute"] = match.get("minute")
            base["halfTime"] = get_score_half(match)
            live_matches.append(base)
        elif status in FINISHED_STATUSES:
            recent_results.append(base)
        elif status in SCHEDULED_STATUSES:
            upcoming_matches.append(base)

    return {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "liveMatches": live_matches,
        "recentResults": recent_results,
        "upcomingMatches": upcoming_matches,
    }


# =============================================================================
# Converter: Standings -> standings.json
# =============================================================================


def build_standings(api_standings: list[dict]) -> dict:
    """Build standings.json from API standings data."""
    groups = {}

    for standing in api_standings:
        if standing.get("stage") != "GROUP_STAGE":
            continue
        group_name = clean_group_name(standing.get("group"))
        if not group_name:
            continue

        teams = []
        for entry in standing.get("table", []):
            team_info = entry.get("team", {})
            team_name = team_name_from_api(team_info)
            code = get_country_code(team_name)
            teams.append(
                {
                    "name": team_name,
                    "code": code,
                    "played": entry.get("playedGames", 0),
                    "won": entry.get("won", 0),
                    "drawn": entry.get("draw", 0),
                    "lost": entry.get("lost", 0),
                    "gf": entry.get("goalsFor", 0),
                    "ga": entry.get("goalsAgainst", 0),
                    "gd": entry.get("goalDifference", 0),
                    "points": entry.get("points", 0),
                    "form": entry.get("form", ""),
                    "position": entry.get("position"),
                }
            )

        groups[group_name] = {"teams": teams}

    return {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "groups": groups,
    }


# =============================================================================
# Converter: Scorers -> scorers.json
# =============================================================================


def build_scorers(api_scorers: list[dict]) -> dict:
    """Build scorers.json from API scorers data."""
    scorers = []
    for s in api_scorers:
        player = s.get("player", {})
        team = s.get("team", {})
        goals = s.get("goals", 0)
        assists = s.get("assists", 0) or 0
        penalties = s.get("penalties", 0) or 0

        scorers.append(
            {
                "name": player.get("name", "Unknown"),
                "firstName": player.get("firstName"),
                "lastName": player.get("lastName"),
                "nationality": player.get("nationality"),
                "position": player.get("position"),
                "dateOfBirth": player.get("dateOfBirth"),
                "team": team_name_from_api(team),
                "teamCode": get_country_code(team_name_from_api(team)),
                "goals": goals,
                "assists": assists,
                "penalties": penalties,
                "nonPenaltyGoals": goals - penalties,
                "goalContributions": goals + assists,
            }
        )

    # Sort by goals (desc), then assists (desc)
    scorers.sort(key=lambda x: (-x["goals"], -x["assists"]))

    return {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "totalScorers": len(scorers),
        "scorers": scorers,
    }


# =============================================================================
# Converter: Statistics -> statistics.json
# =============================================================================


def build_statistics(
    api_matches: list[dict], api_standings: list[dict], api_scorers: list[dict]
) -> dict:
    """Build tournament statistics from all API data."""
    finished = [m for m in api_matches if m.get("status") in FINISHED_STATUSES]
    live = [m for m in api_matches if m.get("status") in LIVE_STATUSES]
    scheduled = [m for m in api_matches if m.get("status") in SCHEDULED_STATUSES]

    total_goals = 0
    draws = 0
    btts = 0
    over_25 = 0
    clean_sheets_home = 0
    clean_sheets_away = 0
    highest_scoring_match = None
    highest_total = 0
    biggest_win = None
    biggest_margin = 0

    for match in finished:
        home_score, away_score = get_score_full(match)
        if home_score is None or away_score is None:
            continue

        goals = home_score + away_score
        total_goals += goals

        if home_score == away_score:
            draws += 1
        if home_score > 0 and away_score > 0:
            btts += 1
        if goals >= 3:
            over_25 += 1
        if away_score == 0:
            clean_sheets_home += 1
        if home_score == 0:
            clean_sheets_away += 1

        if goals > highest_total:
            highest_total = goals
            home_name = team_name_from_api(match.get("homeTeam", {}))
            away_name = team_name_from_api(match.get("awayTeam", {}))
            date, time = parse_utc_date(match.get("utcDate", ""))
            highest_scoring_match = {
                "homeTeam": home_name,
                "awayTeam": away_name,
                "homeScore": home_score,
                "awayScore": away_score,
                "totalGoals": goals,
                "date": date,
                "status": match.get("status"),
            }

        margin = abs(home_score - away_score)
        if margin > biggest_margin:
            biggest_margin = margin
            home_name = team_name_from_api(match.get("homeTeam", {}))
            away_name = team_name_from_api(match.get("awayTeam", {}))
            date, time = parse_utc_date(match.get("utcDate", ""))
            biggest_win = {
                "homeTeam": home_name,
                "awayTeam": away_name,
                "homeScore": home_score,
                "awayScore": away_score,
                "margin": margin,
                "date": date,
                "status": match.get("status"),
            }

    played = len(finished)
    total_matches = len(api_matches)

    # Build group summaries
    group_stats = {}
    for standing in api_standings:
        if standing.get("stage") != "GROUP_STAGE":
            continue
        group_name = clean_group_name(standing.get("group"))
        if not group_name:
            continue
        table = standing.get("table", [])
        if table:
            top_team = table[0].get("team", {})
            group_stats[group_name] = {
                "leader": team_name_from_api(top_team),
                "leaderPoints": table[0].get("points", 0),
                "teams": len(table),
            }

    return {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "tournament": "FIFA World Cup 2026",
        "matchesTotal": total_matches,
        "matchesPlayed": played,
        "matchesRemaining": max(total_matches - played, 0),
        "progress": round((played / total_matches) * 100, 1) if total_matches else 0,
        "totalGoals": total_goals,
        "goalsPerMatch": round(total_goals / played, 2) if played else 0,
        "draws": draws,
        "drawRate": round((draws / played) * 100, 1) if played else 0,
        "btts": btts,
        "bttsRate": round((btts / played) * 100, 1) if played else 0,
        "over25": over_25,
        "over25Rate": round((over_25 / played) * 100, 1) if played else 0,
        "liveMatches": len(live),
        "scheduledMatches": len(scheduled),
        "cleanSheetsHome": clean_sheets_home,
        "cleanSheetsAway": clean_sheets_away,
        "highestScoringMatch": highest_scoring_match,
        "biggestWin": biggest_win,
        "groupStats": group_stats,
        "topScorers": [
            {
                "name": s.get("player", {}).get("name", "Unknown"),
                "team": team_name_from_api(s.get("team", {})),
                "goals": s.get("goals", 0),
                "assists": s.get("assists", 0) or 0,
            }
            for s in api_scorers[:10]
        ],
    }


# =============================================================================
# File I/O
# =============================================================================


def load_json(path: Path) -> dict:
    """Load JSON file, return empty dict if not found."""
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_json(path: Path, data: dict) -> None:
    """Save data to JSON file with pretty formatting."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {path.name}")


# =============================================================================
# Main
# =============================================================================


def main():
    parser = argparse.ArgumentParser(
        description="FIFA World Cup 2026 - Data Updater",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python data_updater.py                    # Update all JSON files
  python data_updater.py -- files scores    # Update specific files only
  python data_updater.py --dry-run          # Preview without writing
  python data_updater.py --api-key abc123   # Use specific API key
        """,
    )
    parser.add_argument(
        "--api-key",
        default=DEFAULT_API_KEY,
        help="football-data.org API key (or set FOOTBALL_DATA_API_KEY env var)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch data but don't write files",
    )
    parser.add_argument(
        "--files",
        nargs="*",
        choices=list(FILES.keys()),
        default=list(FILES.keys()),
        help="Which JSON files to update (default: all)",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show detailed output",
    )

    args = parser.parse_args()

    print("=" * 60)
    print("  FIFA World Cup 2026 - Data Updater")
    print("  Based on football-data.org API")
    print("=" * 60)
    print()

    if not args.api_key:
        print("WARNING: No API key provided.")
        print("  Set FOOTBALL_DATA_API_KEY environment variable, or")
        print("  Use --api-key YOUR_KEY")
        print("  Get a free key at: https://www.football-data.org/client/register")
        print()

    # Initialize API client
    api = WorldCupAPI(args.api_key)

    # Fetch data from API
    print("Fetching data from football-data.org API...")
    try:
        print("  Fetching matches...")
        api_matches = api.get_matches()
        print(f"    Got {len(api_matches)} matches")

        print("  Fetching standings...")
        api_standings = api.get_standings()
        print(f"    Got {len(api_standings)} standings groups")

        print("  Fetching scorers...")
        api_scorers = api.get_scorers()
        print(f"    Got {len(api_scorers)} scorers")

    except requests.exceptions.HTTPError as e:
        print(f"\n  API ERROR: {e}")
        if e.response is not None and e.response.status_code == 403:
            print("  This usually means your API key is invalid or expired.")
            print("  Get a new key at: https://www.football-data.org/client/register")
        elif e.response is not None and e.response.status_code == 429:
            print("  Rate limited. Wait a moment and try again.")
        sys.exit(1)
    except requests.exceptions.ConnectionError:
        print("\n  CONNECTION ERROR: Could not reach football-data.org")
        print("  Check your internet connection.")
        sys.exit(1)
    except Exception as e:
        print(f"\n  ERROR: {e}")
        sys.exit(1)

    print()

    # Show summary
    if args.verbose:
        finished = [m for m in api_matches if m.get("status") in FINISHED_STATUSES]
        live = [m for m in api_matches if m.get("status") in LIVE_STATUSES]
        scheduled = [m for m in api_matches if m.get("status") in SCHEDULED_STATUSES]
        print(
            f"  Match summary: {len(finished)} finished, {len(live)} live, {len(scheduled)} scheduled"
        )
        print()

    # Update each requested file
    for file_key in args.files:
        file_path = FILES[file_key]
        print(f"Updating {file_key}.json...")

        if file_key == "fixtures":
            existing = load_json(file_path)
            if not existing:
                print(f"  WARNING: {file_path} not found, creating new file")
                existing = {
                    "tournament": "FIFA World Cup 2026",
                    "groups": {},
                    "fixtures": [],
                    "knockoutStage": {},
                }
            data = update_fixtures(api_matches, existing)

        elif file_key == "scores":
            data = build_scores(api_matches)

        elif file_key == "standings":
            data = build_standings(api_standings)

        elif file_key == "scorers":
            data = build_scorers(api_scorers)

        elif file_key == "statistics":
            data = build_statistics(api_matches, api_standings, api_scorers)

        else:
            print(f"  Unknown file key: {file_key}")
            continue

        if args.dry_run:
            print(f"  [DRY RUN] Would write to {file_path}")
            if args.verbose:
                print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
        else:
            save_json(file_path, data)

        print()

    print("=" * 60)
    if args.dry_run:
        print("  DRY RUN complete - no files were modified")
    else:
        print("  All updates complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
