"""
FIFA World Cup Graphic Designer Agent
=====================================
Generates match posters, social media graphics, and team cards.
Supports ComfyUI, Pillow, and HTML/CSS rendering methods.
"""

import os
import json
import requests
from datetime import datetime
from pathlib import Path

# Try to import Pillow for image generation
try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False
    print("[Warning] Pillow not installed. Install with: pip install Pillow")


class GraphicDesignerAgent:
    """Main graphic designer agent for FIFA World Cup graphics."""

    def __init__(self, output_dir="output"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.workflows_dir = Path("workflows")
        self.templates_dir = Path("templates")

        # ComfyUI settings
        self.comfyui_url = "http://127.0.0.1:8188"
        self.comfyui_available = self._check_comfyui()

        # Team data with colors
        self.teams = self._load_team_data()

        print(f"[Graphic Designer] Initialized")
        print(
            f"  - ComfyUI: {'Available' if self.comfyui_available else 'Not Available'}"
        )
        print(f"  - Pillow: {'Available' if HAS_PILLOW else 'Not Available'}")
        print(f"  - Output: {self.output_dir.absolute()}")

    def _check_comfyui(self):
        """Check if ComfyUI is running."""
        try:
            response = requests.get(f"{self.comfyui_url}/system_stats", timeout=5)
            return response.status_code == 200
        except:
            return False

    def _load_team_data(self):
        """Load team data with colors and info."""
        return {
            "Brazil": {
                "code": "br",
                "colors": ["#009c3b", "#ffdf00"],
                "confederation": "CONMEBOL",
            },
            "Argentina": {
                "code": "ar",
                "colors": ["#74acdf", "#f6b40e"],
                "confederation": "CONMEBOL",
            },
            "France": {
                "code": "fr",
                "colors": ["#002395", "#ed2939"],
                "confederation": "UEFA",
            },
            "England": {
                "code": "gb-eng",
                "colors": ["#fff", "#e3000b"],
                "confederation": "UEFA",
            },
            "Germany": {
                "code": "de",
                "colors": ["#000", "#dd0000"],
                "confederation": "UEFA",
            },
            "Spain": {
                "code": "es",
                "colors": ["#aa151b", "#f1bf00"],
                "confederation": "UEFA",
            },
            "Portugal": {
                "code": "pt",
                "colors": ["#006600", "#ff0000"],
                "confederation": "UEFA",
            },
            "Netherlands": {
                "code": "nl",
                "colors": ["#ae1c28", "#fff"],
                "confederation": "UEFA",
            },
            "Belgium": {
                "code": "be",
                "colors": ["#000", "#fdda24"],
                "confederation": "UEFA",
            },
            "Croatia": {
                "code": "hr",
                "colors": ["#ff0000", "#fff"],
                "confederation": "UEFA",
            },
            "Morocco": {
                "code": "ma",
                "colors": ["#c1272d", "#006233"],
                "confederation": "CAF",
            },
            "Japan": {
                "code": "jp",
                "colors": ["#bc002d", "#fff"],
                "confederation": "AFC",
            },
            "South Korea": {
                "code": "kr",
                "colors": ["#003478", "#c60c30"],
                "confederation": "AFC",
            },
            "USA": {
                "code": "us",
                "colors": ["#3c3b6e", "#b22234"],
                "confederation": "CONCACAF",
            },
            "Mexico": {
                "code": "mx",
                "colors": ["#006847", "#ce1126"],
                "confederation": "CONCACAF",
            },
            "Canada": {
                "code": "ca",
                "colors": ["#ff0000", "#fff"],
                "confederation": "CONCACAF",
            },
            "Uruguay": {
                "code": "uy",
                "colors": ["#5b9fae", "#fff"],
                "confederation": "CONMEBOL",
            },
            "Colombia": {
                "code": "co",
                "colors": ["#fcd116", "#003893"],
                "confederation": "CONMEBOL",
            },
            "Senegal": {
                "code": "sn",
                "colors": ["#00853f", "#fdef42"],
                "confederation": "CAF",
            },
            "Nigeria": {
                "code": "ng",
                "colors": ["#008751", "#fff"],
                "confederation": "CAF",
            },
        }

    # ===== Match Poster Generation =====

    def generate_match_poster(
        self, home_team, away_team, match_date, match_time, venue, output_name=None
    ):
        """Generate a match poster."""
        print(f"[Poster] Generating: {home_team} vs {away_team}")

        if self.comfyui_available:
            return self._generate_with_comfyui(
                "match_poster",
                {
                    "home_team": home_team,
                    "away_team": away_team,
                    "match_date": match_date,
                    "match_time": match_time,
                    "venue": venue,
                },
            )
        elif HAS_PILLOW:
            return self._generate_poster_pillow(
                home_team, away_team, match_date, match_time, venue, output_name
            )
        else:
            print("[Poster] No generation method available")
            return None

    def _generate_poster_pillow(
        self, home_team, away_team, match_date, match_time, venue, output_name
    ):
        """Generate match poster using Pillow."""
        width, height = 1080, 1350

        # Create base image with gradient
        img = Image.new("RGB", (width, height))
        draw = ImageDraw.Draw(img)

        # Get team colors
        home_colors = self.teams.get(home_team, {}).get("colors", ["#1a1a2e", "#fff"])
        away_colors = self.teams.get(away_team, {}).get("colors", ["#16213e", "#fff"])

        # Draw gradient background
        for y in range(height):
            r = int(20 + (y / height) * 30)
            g = int(10 + (y / height) * 20)
            b = int(40 + (y / height) * 40)
            draw.line([(0, y), (width, y)], fill=(r, g, b))

        # Draw team color panels
        panel_width = width // 2 - 20
        draw.rounded_rectangle(
            [20, 50, panel_width, height - 50], radius=20, fill=home_colors[0]
        )
        draw.rounded_rectangle(
            [width // 2 + 20, 50, width - 20, height - 50],
            radius=20,
            fill=away_colors[0],
        )

        # Draw VS text
        try:
            font_large = ImageFont.truetype("arial.ttf", 120)
            font_medium = ImageFont.truetype("arial.ttf", 48)
            font_small = ImageFont.truetype("arial.ttf", 36)
        except:
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()

        # VS circle
        vs_x, vs_y = width // 2, height // 2
        draw.ellipse([vs_x - 60, vs_y - 60, vs_x + 60, vs_y + 60], fill="#c8102e")
        draw.text((vs_x, vs_y), "VS", fill="white", font=font_large, anchor="mm")

        # Team names
        draw.text(
            (width // 4, height // 3),
            home_team,
            fill="white",
            font=font_medium,
            anchor="mm",
        )
        draw.text(
            (3 * width // 4, height // 3),
            away_team,
            fill="white",
            font=font_medium,
            anchor="mm",
        )

        # Match info
        draw.text(
            (width // 2, height - 200),
            f"{match_date}",
            fill="#ffc72c",
            font=font_medium,
            anchor="mm",
        )
        draw.text(
            (width // 2, height - 140),
            f"{match_time}",
            fill="white",
            font=font_small,
            anchor="mm",
        )
        draw.text(
            (width // 2, height - 100),
            venue,
            fill="#b0b0b0",
            font=font_small,
            anchor="mm",
        )

        # FIFA World Cup header
        draw.text(
            (width // 2, 30),
            "FIFA WORLD CUP 2026",
            fill="#ffc72c",
            font=font_medium,
            anchor="mm",
        )

        # Save
        if not output_name:
            output_name = f"match_poster_{home_team.lower()}_vs_{away_team.lower()}"

        filepath = self.output_dir / f"{output_name}.png"
        img.save(filepath, quality=95)
        print(f"[Poster] Saved: {filepath}")
        return filepath

    # ===== Social Media Graphics =====

    def generate_social_media(
        self, graphic_type, title, subtitle="", team=None, output_name=None
    ):
        """Generate social media graphic."""
        print(f"[Social] Generating: {graphic_type} - {title}")

        if self.comfyui_available:
            return self._generate_with_comfyui(
                "social_media",
                {
                    "type": graphic_type,
                    "title": title,
                    "subtitle": subtitle,
                    "team": team,
                },
            )
        elif HAS_PILLOW:
            return self._generate_social_pillow(
                graphic_type, title, subtitle, team, output_name
            )
        else:
            print("[Social] No generation method available")
            return None

    def _generate_social_pillow(self, graphic_type, title, subtitle, team, output_name):
        """Generate social media graphic using Pillow."""
        width, height = 1080, 1080

        img = Image.new("RGB", (width, height))
        draw = ImageDraw.Draw(img)

        # Get team colors if specified
        team_colors = (
            self.teams.get(team, {}).get("colors", ["#c8102e", "#003087"])
            if team
            else ["#c8102e", "#003087"]
        )

        # Draw gradient background
        for y in range(height):
            r = int(10 + (y / height) * 20)
            g = int(10 + (y / height) * 10)
            b = int(30 + (y / height) * 30)
            draw.line([(0, y), (width, y)], fill=(r, g, b))

        # Draw decorative elements
        draw.rounded_rectangle(
            [40, 40, width - 40, height - 40], radius=30, outline="#c8102e", width=3
        )

        # Draw accent bars
        draw.rectangle([0, 0, width, 8], fill="#ffc72c")
        draw.rectangle([0, height - 8, width, height], fill="#ffc72c")

        # Load fonts
        try:
            font_xl = ImageFont.truetype("arial.ttf", 72)
            font_large = ImageFont.truetype("arial.ttf", 56)
            font_medium = ImageFont.truetype("arial.ttf", 40)
            font_small = ImageFont.truetype("arial.ttf", 28)
        except:
            font_xl = ImageFont.load_default()
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()

        # Draw content based on type
        if graphic_type == "countdown":
            draw.text(
                (width // 2, height // 3),
                title,
                fill="#ffc72c",
                font=font_xl,
                anchor="mm",
            )
            draw.text(
                (width // 2, height // 2),
                subtitle,
                fill="white",
                font=font_large,
                anchor="mm",
            )
        elif graphic_type == "result":
            draw.rounded_rectangle(
                [100, 150, width - 100, height - 150], radius=20, fill=team_colors[0]
            )
            draw.text(
                (width // 2, height // 3),
                title,
                fill="white",
                font=font_xl,
                anchor="mm",
            )
            draw.text(
                (width // 2, height // 2),
                subtitle,
                fill="#ffc72c",
                font=font_large,
                anchor="mm",
            )
        elif graphic_type == "announcement":
            draw.text(
                (width // 2, height // 3),
                "ANNOUNCEMENT",
                fill="#ffc72c",
                font=font_medium,
                anchor="mm",
            )
            draw.text(
                (width // 2, height // 2),
                title,
                fill="white",
                font=font_large,
                anchor="mm",
            )
            if subtitle:
                draw.text(
                    (width // 2, height * 2 // 3),
                    subtitle,
                    fill="#b0b0b0",
                    font=font_medium,
                    anchor="mm",
                )
        else:
            draw.text(
                (width // 2, height // 3),
                title,
                fill="white",
                font=font_xl,
                anchor="mm",
            )
            if subtitle:
                draw.text(
                    (width // 2, height // 2),
                    subtitle,
                    fill="#ffc72c",
                    font=font_large,
                    anchor="mm",
                )

        # Footer
        draw.text(
            (width // 2, height - 60),
            "FIFA WORLD CUP 2026",
            fill="#ffc72c",
            font=font_small,
            anchor="mm",
        )

        # Save
        if not output_name:
            output_name = (
                f"social_{graphic_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            )

        filepath = self.output_dir / f"{output_name}.png"
        img.save(filepath, quality=95)
        print(f"[Social] Saved: {filepath}")
        return filepath

    # ===== Team Cards =====

    def generate_team_card(self, team_name, players=None, output_name=None):
        """Generate a team card."""
        print(f"[Card] Generating: {team_name}")

        if self.comfyui_available:
            return self._generate_with_comfyui(
                "team_card", {"team": team_name, "players": players}
            )
        elif HAS_PILLOW:
            return self._generate_team_card_pillow(team_name, players, output_name)
        else:
            print("[Card] No generation method available")
            return None

    def _generate_team_card_pillow(self, team_name, players, output_name):
        """Generate team card using Pillow."""
        width, height = 700, 1000

        img = Image.new("RGB", (width, height))
        draw = ImageDraw.Draw(img)

        # Get team colors
        team_data = self.teams.get(team_name, {})
        team_colors = team_data.get("colors", ["#1a1a2e", "#fff"])

        # Parse hex color to RGB
        def hex_to_rgb(hex_color):
            hex_color = hex_color.lstrip("#")
            if len(hex_color) == 3:
                hex_color = "".join([c * 2 for c in hex_color])
            return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))

        primary_rgb = hex_to_rgb(team_colors[0])

        # Draw gradient background with team color
        for y in range(height):
            r = int(primary_rgb[0] * (1 - y / height) + 20 * (y / height))
            g = int(primary_rgb[1] * (1 - y / height) + 10 * (y / height))
            b = int(primary_rgb[2] * (1 - y / height) + 30 * (y / height))
            draw.line(
                [(0, y), (width, y)], fill=(min(r, 255), min(g, 255), min(b, 255))
            )

        # Load fonts
        try:
            font_xl = ImageFont.truetype("arial.ttf", 64)
            font_large = ImageFont.truetype("arial.ttf", 40)
            font_medium = ImageFont.truetype("arial.ttf", 32)
            font_small = ImageFont.truetype("arial.ttf", 24)
        except:
            font_xl = ImageFont.load_default()
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()

        # Draw header
        draw.rounded_rectangle(
            [20, 20, width - 20, 150], radius=15, fill=(0, 0, 0, 100)
        )
        draw.text(
            (width // 2, 60),
            "FIFA WORLD CUP 2026",
            fill="#ffc72c",
            font=font_small,
            anchor="mm",
        )
        draw.text(
            (width // 2, 110),
            team_name.upper(),
            fill="white",
            font=font_xl,
            anchor="mm",
        )

        # Draw flag placeholder
        flag_size = 120
        draw.rounded_rectangle(
            [
                width // 2 - flag_size // 2,
                180,
                width // 2 + flag_size // 2,
                180 + flag_size,
            ],
            radius=10,
            fill="white",
        )
        draw.text(
            (width // 2, 180 + flag_size // 2),
            team_data.get("code", "??").upper(),
            fill=team_colors[0],
            font=font_large,
            anchor="mm",
        )

        # Draw team info
        info_y = 340
        draw.rounded_rectangle(
            [40, info_y, width - 40, info_y + 60], radius=10, fill=(0, 0, 0, 80)
        )
        draw.text(
            (width // 2, info_y + 30),
            f"Confederation: {team_data.get('confederation', 'N/A')}",
            fill="white",
            font=font_small,
            anchor="mm",
        )

        # Draw players section
        if players:
            players_y = 430
            draw.rounded_rectangle(
                [40, players_y, width - 40, players_y + 400],
                radius=15,
                fill=(0, 0, 0, 100),
            )
            draw.text(
                (width // 2, players_y + 30),
                "KEY PLAYERS",
                fill="#ffc72c",
                font=font_medium,
                anchor="mm",
            )

            for i, player in enumerate(players[:5]):
                y_pos = players_y + 80 + i * 60
                draw.text(
                    (80, y_pos),
                    f"#{player.get('number', i + 1)}",
                    fill="#ffc72c",
                    font=font_medium,
                )
                draw.text(
                    (150, y_pos),
                    player.get("name", f"Player {i + 1}"),
                    fill="white",
                    font=font_medium,
                )
                draw.text(
                    (width - 80, y_pos),
                    player.get("position", ""),
                    fill="#b0b0b0",
                    font=font_small,
                    anchor="rm",
                )

        # Footer
        draw.rectangle([0, height - 50, width, height], fill=(0, 0, 0, 120))
        draw.text(
            (width // 2, height - 25),
            "UNITED 2026",
            fill="#ffc72c",
            font=font_small,
            anchor="mm",
        )

        # Save
        if not output_name:
            output_name = f"team_card_{team_name.lower().replace(' ', '_')}"

        filepath = self.output_dir / f"{output_name}.png"
        img.save(filepath, quality=95)
        print(f"[Card] Saved: {filepath}")
        return filepath

    # ===== ComfyUI Integration =====

    def _generate_with_comfyui(self, workflow_name, params):
        """Generate image using ComfyUI."""
        workflow_path = self.workflows_dir / f"{workflow_name}.json"

        if not workflow_path.exists():
            print(f"[ComfyUI] Workflow not found: {workflow_path}")
            return None

        with open(workflow_path, "r") as f:
            workflow = json.load(f)

        # Modify workflow with params
        # (This is a simplified example - actual implementation depends on workflow structure)

        try:
            # Queue prompt
            response = requests.post(
                f"{self.comfyui_url}/prompt",
                json={"prompt": workflow["nodes"]},
                timeout=30,
            )

            if response.status_code == 200:
                prompt_id = response.json().get("prompt_id")
                print(f"[ComfyUI] Prompt queued: {prompt_id}")
                # In production, you'd poll for completion
                return prompt_id
            else:
                print(f"[ComfyUI] Error: {response.status_code}")
                return None

        except Exception as e:
            print(f"[ComfyUI] Error: {e}")
            return None

    # ===== Player Poster Generation =====

    def generate_player_poster(self, player_data, output_name=None):
        """Generate a player poster card."""
        print(f"[Player Poster] Generating: {player_data.get('name', 'Unknown')}")

        if self.comfyui_available:
            return self._generate_with_comfyui("player_poster", player_data)
        elif HAS_PILLOW:
            return self._generate_player_poster_pillow(player_data, output_name)
        else:
            print("[Player Poster] No generation method available")
            return None

    def _generate_player_poster_pillow(self, player_data, output_name):
        """Generate player poster using Pillow."""
        width, height = 1080, 1350

        img = Image.new("RGB", (width, height))
        draw = ImageDraw.Draw(img)

        # Get team colors
        team_name = player_data.get("country", "")
        team_colors = self.teams.get(team_name, {}).get("colors", ["#1a1a2e", "#fff"])

        # Parse hex color to RGB
        def hex_to_rgb(hex_color):
            hex_color = hex_color.lstrip("#")
            if len(hex_color) == 3:
                hex_color = "".join([c * 2 for c in hex_color])
            return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))

        primary_rgb = hex_to_rgb(team_colors[0])
        secondary_rgb = (
            hex_to_rgb(team_colors[1]) if len(team_colors) > 1 else (255, 255, 255)
        )

        # Draw gradient background
        for y in range(height):
            ratio = y / height
            r = int(primary_rgb[0] * (1 - ratio) + 20 * ratio)
            g = int(primary_rgb[1] * (1 - ratio) + 10 * ratio)
            b = int(primary_rgb[2] * (1 - ratio) + 30 * ratio)
            draw.line(
                [(0, y), (width, y)], fill=(min(r, 255), min(g, 255), min(b, 255))
            )

        # Draw diagonal accent
        draw.polygon([(0, 0), (width, 0), (width, height // 3)], fill=primary_rgb)

        # Draw decorative elements
        draw.rounded_rectangle(
            [30, 30, width - 30, height - 30], radius=25, outline=secondary_rgb, width=3
        )

        # Load fonts
        try:
            font_xl = ImageFont.truetype("arial.ttf", 80)
            font_large = ImageFont.truetype("arial.ttf", 48)
            font_medium = ImageFont.truetype("arial.ttf", 36)
            font_small = ImageFont.truetype("arial.ttf", 28)
            font_number = ImageFont.truetype("arial.ttf", 200)
        except:
            font_xl = ImageFont.load_default()
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()
            font_number = ImageFont.load_default()

        # Draw player number (large, faded in background)
        player_number = player_data.get("number", "10")
        draw.text(
            (width // 2, height // 2 + 50),
            str(player_number),
            fill=(255, 255, 255, 30),
            font=font_number,
            anchor="mm",
        )

        # Draw FIFA World Cup header
        draw.text(
            (width // 2, 80),
            "FIFA WORLD CUP 2026",
            fill="#ffc72c",
            font=font_small,
            anchor="mm",
        )

        # Draw player name
        player_name = player_data.get("name", "Player Name")
        draw.text(
            (width // 2, height // 2 - 150),
            player_name.upper(),
            fill="white",
            font=font_xl,
            anchor="mm",
        )

        # Draw player info
        info_y = height // 2 - 50

        # Country flag placeholder
        country_code = player_data.get("countryCode", "un")
        draw.rounded_rectangle(
            [width // 2 - 50, info_y, width // 2 + 50, info_y + 40],
            radius=5,
            fill="white",
        )
        draw.text(
            (width // 2, info_y + 20),
            country_code.upper(),
            fill=primary_rgb,
            font=font_small,
            anchor="mm",
        )

        # Position and number
        draw.text(
            (width // 2, info_y + 70),
            f"#{player_number} • {player_data.get('position', 'Forward')}",
            fill="#ffc72c",
            font=font_medium,
            anchor="mm",
        )

        # Club
        club = player_data.get("club", "")
        if club:
            draw.text(
                (width // 2, info_y + 120),
                club,
                fill="#b0b0b0",
                font=font_small,
                anchor="mm",
            )

        # Age
        age = player_data.get("age", "")
        if age:
            draw.text(
                (width // 2, info_y + 160),
                f"Age: {age}",
                fill="#b0b0b0",
                font=font_small,
                anchor="mm",
            )

        # Bio/Caption
        bio = player_data.get("caption", player_data.get("bio", ""))
        if bio:
            # Word wrap bio text
            words = bio.split()
            lines = []
            current_line = []
            for word in words:
                test_line = " ".join(current_line + [word])
                if len(test_line) < 45:
                    current_line.append(word)
                else:
                    lines.append(" ".join(current_line))
                    current_line = [word]
            if current_line:
                lines.append(" ".join(current_line))

            bio_y = height - 250
            for i, line in enumerate(lines[:3]):
                draw.text(
                    (width // 2, bio_y + i * 35),
                    line,
                    fill="white",
                    font=font_small,
                    anchor="mm",
                )

        # Draw bottom accent bar
        draw.rectangle([0, height - 60, width, height], fill=primary_rgb)
        draw.text(
            (width // 2, height - 30),
            "STAR PLAYER",
            fill="white",
            font=font_small,
            anchor="mm",
        )

        # Save
        if not output_name:
            output_name = f"player_poster_{player_name.lower().replace(' ', '_')}"

        filepath = self.output_dir / f"{output_name}.png"
        img.save(filepath, quality=95)
        print(f"[Player Poster] Saved: {filepath}")
        return filepath

    def generate_all_player_posters(self, players_list):
        """Generate posters for multiple players."""
        results = []
        for player in players_list:
            result = self.generate_player_poster(player)
            if result:
                results.append(result)
        return results

    # ===== Batch Generation =====

    def generate_all_match_posters(self, matches):
        """Generate posters for multiple matches."""
        results = []
        for match in matches:
            result = self.generate_match_poster(
                match["home"],
                match["away"],
                match["date"],
                match["time"],
                match["venue"],
            )
            if result:
                results.append(result)
        return results

    def generate_all_team_cards(self, teams_list):
        """Generate cards for multiple teams."""
        results = []
        for team_name in teams_list:
            result = self.generate_team_card(team_name)
            if result:
                results.append(result)
        return results

    def generate_social_media_pack(self, team=None):
        """Generate a pack of social media graphics."""
        graphics = []

        # Countdown graphic
        graphics.append(
            self.generate_social_media(
                "countdown", "WORLD CUP 2026", "The Wait Is Almost Over", team
            )
        )

        # Announcement graphics
        graphics.append(
            self.generate_social_media("announcement", "48 Teams", "One Champion", team)
        )

        graphics.append(
            self.generate_social_media(
                "announcement", "3 Host Countries", "USA | Mexico | Canada", team
            )
        )

        return [g for g in graphics if g]


# ===== CLI Interface =====


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="FIFA World Cup Graphic Designer Agent"
    )
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # Match poster command
    poster_parser = subparsers.add_parser("poster", help="Generate match poster")
    poster_parser.add_argument("--home", required=True, help="Home team name")
    poster_parser.add_argument("--away", required=True, help="Away team name")
    poster_parser.add_argument("--date", required=True, help="Match date")
    poster_parser.add_argument("--time", required=True, help="Match time")
    poster_parser.add_argument("--venue", required=True, help="Venue name")

    # Social media command
    social_parser = subparsers.add_parser(
        "social", help="Generate social media graphic"
    )
    social_parser.add_argument(
        "--type", required=True, choices=["countdown", "result", "announcement"]
    )
    social_parser.add_argument("--title", required=True, help="Graphic title")
    social_parser.add_argument("--subtitle", default="", help="Subtitle")
    social_parser.add_argument("--team", default=None, help="Team name")

    # Team card command
    card_parser = subparsers.add_parser("card", help="Generate team card")
    card_parser.add_argument("--team", required=True, help="Team name")

    # Player poster command
    player_parser = subparsers.add_parser("player", help="Generate player poster")
    player_parser.add_argument("--name", required=True, help="Player name")
    player_parser.add_argument("--country", required=True, help="Country name")
    player_parser.add_argument("--country-code", default="un", help="Country code")
    player_parser.add_argument("--position", default="Forward", help="Player position")
    player_parser.add_argument("--number", default="10", help="Jersey number")
    player_parser.add_argument("--club", default="", help="Club team")
    player_parser.add_argument("--age", default="", help="Player age")
    player_parser.add_argument("--bio", default="", help="Player bio/caption")

    # Batch commands
    batch_parser = subparsers.add_parser("batch", help="Batch generation")
    batch_parser.add_argument(
        "--posters", action="store_true", help="Generate all match posters"
    )
    batch_parser.add_argument(
        "--cards", action="store_true", help="Generate all team cards"
    )
    batch_parser.add_argument(
        "--players", action="store_true", help="Generate all player posters"
    )
    batch_parser.add_argument(
        "--social-pack", action="store_true", help="Generate social media pack"
    )

    parser.add_argument("--output", default="output", help="Output directory")

    args = parser.parse_args()

    designer = GraphicDesignerAgent(output_dir=args.output)

    if args.command == "poster":
        designer.generate_match_poster(
            args.home, args.away, args.date, args.time, args.venue
        )

    elif args.command == "social":
        designer.generate_social_media(args.type, args.title, args.subtitle, args.team)

    elif args.command == "card":
        designer.generate_team_card(args.team)

    elif args.command == "player":
        player_data = {
            "name": args.name,
            "country": args.country,
            "countryCode": args.country_code,
            "position": args.position,
            "number": args.number,
            "club": args.club,
            "age": args.age,
            "bio": args.bio,
            "caption": args.bio,
        }
        designer.generate_player_poster(player_data)

    elif args.command == "batch":
        if args.posters:
            matches = [
                {
                    "home": "Mexico",
                    "away": "TBD",
                    "date": "June 11, 2026",
                    "time": "TBD",
                    "venue": "Estadio Azteca",
                },
                {
                    "home": "USA",
                    "away": "TBD",
                    "date": "June 12, 2026",
                    "time": "TBD",
                    "venue": "SoFi Stadium",
                },
                {
                    "home": "Canada",
                    "away": "TBD",
                    "date": "June 12, 2026",
                    "time": "TBD",
                    "venue": "BMO Field",
                },
            ]
            designer.generate_all_match_posters(matches)

        if args.cards:
            teams = [
                "Brazil",
                "Argentina",
                "France",
                "England",
                "Germany",
                "Spain",
                "USA",
                "Mexico",
            ]
            designer.generate_all_team_cards(teams)

        if args.players:
            players = [
                {
                    "name": "Kylian Mbappé",
                    "country": "France",
                    "countryCode": "fr",
                    "position": "Forward",
                    "number": "10",
                    "club": "Real Madrid",
                    "age": "27",
                    "caption": "France captain, 2018 World Cup winner",
                },
                {
                    "name": "Lamine Yamal",
                    "country": "Spain",
                    "countryCode": "es",
                    "position": "Winger",
                    "number": "19",
                    "club": "Barcelona",
                    "age": "18",
                    "caption": "Euro 2024 winner, youngest goalscorer in Euros history",
                },
                {
                    "name": "Lionel Messi",
                    "country": "Argentina",
                    "countryCode": "ar",
                    "position": "Forward",
                    "number": "10",
                    "club": "Inter Miami",
                    "age": "38",
                    "caption": "8x Ballon d'Or winner, 2022 World Cup champion",
                },
                {
                    "name": "Harry Kane",
                    "country": "England",
                    "countryCode": "gb-eng",
                    "position": "Striker",
                    "number": "9",
                    "club": "Bayern Munich",
                    "age": "32",
                    "caption": "England's all-time top scorer, 2018 Golden Boot winner",
                },
                {
                    "name": "Vinícius Jr.",
                    "country": "Brazil",
                    "countryCode": "br",
                    "position": "Winger",
                    "number": "7",
                    "club": "Real Madrid",
                    "age": "25",
                    "caption": "Brazil's talisman, 2024 Ballon d'Or runner-up",
                },
                {
                    "name": "Erling Haaland",
                    "country": "Norway",
                    "countryCode": "no",
                    "position": "Striker",
                    "number": "9",
                    "club": "Manchester City",
                    "age": "25",
                    "caption": "Goal machine, first World Cup, 16 goals in qualifiers",
                },
                {
                    "name": "Cristiano Ronaldo",
                    "country": "Portugal",
                    "countryCode": "pt",
                    "position": "Forward",
                    "number": "7",
                    "club": "Al-Nassr",
                    "age": "41",
                    "caption": "Record 6th World Cup, all-time top international scorer",
                },
                {
                    "name": "Christian Pulisic",
                    "country": "USA",
                    "countryCode": "us",
                    "position": "Forward",
                    "number": "10",
                    "club": "AC Milan",
                    "age": "27",
                    "caption": "USA's face, Champions League winner, home World Cup",
                },
            ]
            designer.generate_all_player_posters(players)

        if args.social_pack:
            designer.generate_social_media_pack()

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
