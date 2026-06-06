"""
FIFA World Cup 2026 Graphic Designer Agent
==========================================
Canvas Design approach: museum-quality graphics using design philosophies.
Generates match posters, player cards, team cards, and social media graphics.
"""

import os
import sys
import json
import math
import argparse
from datetime import datetime
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ===== Font Loader =====
FONTS_DIR = Path(__file__).parent / "canvas-fonts"


def load_font(name, size):
    """Load a font from the canvas-fonts directory."""
    path = FONTS_DIR / name
    if path.exists():
        return ImageFont.truetype(str(path), size)
    # Fallback
    for fallback in [
        "BricolageGrotesque-Bold.ttf",
        "Outfit-Bold.ttf",
        "WorkSans-Bold.ttf",
    ]:
        fb_path = FONTS_DIR / fallback
        if fb_path.exists():
            return ImageFont.truetype(str(fb_path), size)
    return ImageFont.load_default()


# ===== Color Utilities =====
def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple."""
    h = hex_color.lstrip("#")
    if len(h) == 3:
        h = "".join([c * 2 for c in h])
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def lerp_color(c1, c2, t):
    """Linearly interpolate between two RGB colors."""
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def draw_gradient_rect(draw, bbox, color_top, color_bottom, radius=0):
    """Draw a rectangle with vertical gradient fill."""
    x0, y0, x1, y1 = bbox
    for y in range(y0, y1):
        t = (y - y0) / max(1, (y1 - y0))
        c = lerp_color(color_top, color_bottom, t)
        draw.line([(x0, y), (x1, y)], fill=c)


# ===== Team Data =====
TEAMS = {
    "Brazil": {"code": "br", "colors": ["#009c3b", "#ffdf00"]},
    "Argentina": {"code": "ar", "colors": ["#74acdf", "#f6b40e"]},
    "France": {"code": "fr", "colors": ["#002395", "#ed2939"]},
    "England": {"code": "gb-eng", "colors": ["#1c2c5c", "#e3000b"]},
    "Germany": {"code": "de", "colors": ["#000000", "#dd0000"]},
    "Spain": {"code": "es", "colors": ["#aa151b", "#f1bf00"]},
    "Portugal": {"code": "pt", "colors": ["#006600", "#ff0000"]},
    "Netherlands": {"code": "nl", "colors": ["#ae1c28", "#f5f5f5"]},
    "Belgium": {"code": "be", "colors": ["#000000", "#fdda24"]},
    "Croatia": {"code": "hr", "colors": ["#e3000b", "#171796"]},
    "Morocco": {"code": "ma", "colors": ["#c1272d", "#006233"]},
    "Japan": {"code": "jp", "colors": ["#bc002d", "#ffffff"]},
    "South Korea": {"code": "kr", "colors": ["#003478", "#c60c30"]},
    "USA": {"code": "us", "colors": ["#3c3b6e", "#b22234"]},
    "Mexico": {"code": "mx", "colors": ["#006847", "#ce1126"]},
    "Canada": {"code": "ca", "colors": ["#ff0000", "#ffffff"]},
    "Uruguay": {"code": "uy", "colors": ["#5b9fae", "#ffffff"]},
    "Colombia": {"code": "co", "colors": ["#fcd116", "#003893"]},
    "Senegal": {"code": "sn", "colors": ["#00853f", "#fdef42"]},
    "Nigeria": {"code": "ng", "colors": ["#008751", "#ffffff"]},
    "Egypt": {"code": "eg", "colors": ["#ce1126", "#000000"]},
    "Cameroon": {"code": "cm", "colors": ["#007a5e", "#ce1126"]},
    "Ghana": {"code": "gh", "colors": ["#006b3f", "#fcd116"]},
    "Tunisia": {"code": "tn", "colors": ["#e70013", "#ffffff"]},
    "Algeria": {"code": "dz", "colors": ["#006233", "#d21034"]},
    "South Africa": {"code": "za", "colors": ["#007a4d", "#ffB81c"]},
    "Czechia": {"code": "cz", "colors": ["#11457e", "#d7141a"]},
    "Switzerland": {"code": "ch", "colors": ["#d52b1e", "#ffffff"]},
    "Poland": {"code": "pl", "colors": ["#dc143c", "#ffffff"]},
    "Denmark": {"code": "dk", "colors": ["#c60c30", "#ffffff"]},
    "Serbia": {"code": "rs", "colors": ["#c6363c", "#0c4076"]},
    "Wales": {"code": "gb-wls", "colors": ["#d4003c", "#ffffff"]},
    "Scotland": {"code": "gb-sct", "colors": ["#003078", "#ffffff"]},
    "Norway": {"code": "no", "colors": ["#ba0c2f", "#00205b"]},
    "Sweden": {"code": "se", "colors": ["#006aa7", "#fecc00"]},
    "Iceland": {"code": "is", "colors": ["#003897", "#d72828"]},
    "Italy": {"code": "it", "colors": ["#008c45", "#cd212a"]},
    "Austria": {"code": "at", "colors": ["#ed2939", "#ffffff"]},
    "Australia": {"code": "au", "colors": ["#00008b", "#e00000"]},
    "Iran": {"code": "ir", "colors": ["#239f40", "#da0000"]},
    "Saudi Arabia": {"code": "sa", "colors": ["#006c35", "#ffffff"]},
    "Iraq": {"code": "iq", "colors": ["#ce1126", "#000000"]},
    "Uzbekistan": {"code": "uz", "colors": ["#0099b5", "#ce1126"]},
    "Qatar": {"code": "qa", "colors": ["#8d1b3d", "#ffffff"]},
    "Jordan": {"code": "jo", "colors": ["#ce1126", "#000000"]},
    "Honduras": {"code": "hn", "colors": ["#0073cf", "#ce1126"]},
    "Costa Rica": {"code": "cr", "colors": ["#002b7f", "#ce1126"]},
    "Jamaica": {"code": "jm", "colors": ["#009b3a", "#fed100"]},
    "Panama": {"code": "pa", "colors": ["#003da5", "#d21034"]},
    "New Zealand": {"code": "nz", "colors": ["#00247d", "#cc142b"]},
    "Haiti": {"code": "ht", "colors": ["#00209f", "#d21034"]},
    "Curaçao": {"code": "cw", "colors": ["#009bde", "#ce1126"]},
    "Cabo Verde": {"code": "cv", "colors": ["#003893", "#cf2020"]},
    "DR Congo": {"code": "cd", "colors": ["#007fff", "#ce1021"]},
    "Bosnia and Herzegovina": {"code": "ba", "colors": ["#002395", "#fecb00"]},
}


def get_team(name):
    """Get team data by name."""
    return TEAMS.get(name, {"code": "xx", "colors": ["#1a1a2e", "#ffffff"]})


# ===== MATCH POSTER =====
def generate_match_poster(home, away, date, time, venue, output_path):
    """
    Generate a match poster following the Monumental Clash design philosophy.
    Bilateral confrontation, architectural geometry, team color warfare.
    """
    W, H = 1080, 1350
    img = Image.new("RGB", (W, H), (10, 10, 18))
    draw = ImageDraw.Draw(img)

    home_data = get_team(home)
    away_data = get_team(away)
    home_rgb = hex_to_rgb(home_data["colors"][0])
    away_rgb = hex_to_rgb(away_data["colors"][0])
    gold = hex_to_rgb("#c8a84e")

    # === BACKGROUND: Split bilateral frame ===
    # Dark base with subtle gradient
    draw_gradient_rect(draw, (0, 0, W, H), (8, 8, 15), (15, 12, 25))

    # Home territory (left half)
    draw_gradient_rect(draw, (0, 0, W // 2, H), home_rgb, (10, 10, 18))
    # Away territory (right half)
    draw_gradient_rect(draw, (W // 2, 0, W, H), away_rgb, (10, 10, 18))

    # Darken the bottom portion for text
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for y in range(H // 2, H):
        alpha = int(180 * ((y - H // 2) / (H // 2)))
        overlay_draw.line([(0, y), (W, y)], fill=(5, 5, 12, alpha))
    img.paste(
        Image.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, 0)), overlay).convert(
            "RGB"
        )
    )

    draw = ImageDraw.Draw(img)

    # === GEOMETRIC TENSION: Border lines ===
    # Vertical split line
    draw.line([(W // 2, 0), (W // 2, H // 2 + 80)], fill=gold, width=2)

    # Horizontal accent lines
    draw.line([(0, H // 2 + 80), (W, H // 2 + 80)], fill=gold, width=1)

    # Corner geometric markers
    marker = 40
    # Top-left
    draw.line([(30, 30), (30 + marker, 30)], fill=gold, width=2)
    draw.line([(30, 30), (30, 30 + marker)], fill=gold, width=2)
    # Top-right
    draw.line([(W - 30, 30), (W - 30 - marker, 30)], fill=gold, width=2)
    draw.line([(W - 30, 30), (W - 30, 30 + marker)], fill=gold, width=2)

    # === VS CIRCLE: The collision point ===
    vs_cx, vs_cy = W // 2, H // 2 + 30
    vs_r = 65
    # Outer ring
    draw.ellipse(
        [vs_cx - vs_r - 3, vs_cy - vs_r - 3, vs_cx + vs_r + 3, vs_cy + vs_r + 3],
        fill=gold,
    )
    # Inner circle
    draw.ellipse(
        [vs_cx - vs_r, vs_cy - vs_r, vs_cx + vs_r, vs_cy + vs_r], fill=(15, 15, 22)
    )

    # VS text
    font_vs = load_font("BigShoulders-Bold.ttf", 52)
    draw.text((vs_cx, vs_cy), "VS", fill=gold, font=font_vs, anchor="mm")

    # === TEAM NAMES: Massive architectural letterforms ===
    font_team = load_font("BigShoulders-Bold.ttf", 82)
    font_country = load_font("Outfit-Regular.ttf", 22)

    # Home team (left)
    home_x = W // 4
    draw.text(
        (home_x, H // 2 - 120),
        home.upper(),
        fill=(255, 255, 255),
        font=font_team,
        anchor="mm",
    )
    draw.text(
        (home_x, H // 2 - 65),
        home_data["code"].upper(),
        fill=gold,
        font=font_country,
        anchor="mm",
    )

    # Away team (right)
    away_x = 3 * W // 4
    draw.text(
        (away_x, H // 2 - 120),
        away.upper(),
        fill=(255, 255, 255),
        font=font_team,
        anchor="mm",
    )
    draw.text(
        (away_x, H // 2 - 65),
        away_data["code"].upper(),
        fill=gold,
        font=font_country,
        anchor="mm",
    )

    # === MATCH INFO: Clinical notation at bottom ===
    font_date = load_font("Outfit-Bold.ttf", 32)
    font_time = load_font("DMMono-Regular.ttf", 22)
    font_venue = load_font("Outfit-Regular.ttf", 18)

    # Date
    draw.text((W // 2, H - 180), date.upper(), fill=gold, font=font_date, anchor="mm")

    # Time
    draw.text(
        (W // 2, H - 140), time, fill=(200, 200, 200), font=font_time, anchor="mm"
    )

    # Venue
    draw.text(
        (W // 2, H - 105), venue, fill=(150, 150, 150), font=font_venue, anchor="mm"
    )

    # === FIFA BRANDING: Sacred gold thread ===
    font_fifa = load_font("Outfit-Regular.ttf", 14)
    draw.text(
        (W // 2, 30), "FIFA WORLD CUP 2026", fill=gold, font=font_fifa, anchor="mm"
    )

    # Bottom gold line
    draw.line([(W // 2 - 80, H - 50), (W // 2 + 80, H - 50)], fill=gold, width=1)
    draw.text(
        (W // 2, H - 35),
        "UNITED 2026",
        fill=(120, 120, 120),
        font=font_fifa,
        anchor="mm",
    )

    # === DECORATIVE GEOMETRY ===
    # Repeating thin horizontal lines in the middle zone (rhythm)
    for i in range(5):
        y_line = H // 2 + 90 + i * 12
        draw.line(
            [(W // 2 - 120 + i * 10, y_line), (W // 2 + 120 - i * 10, y_line)],
            fill=(*gold,),
            width=1,
        )

    img.save(str(output_path), quality=95)
    print(f"[Poster] Saved: {output_path}")
    return output_path


# ===== PLAYER CARD =====
def generate_player_card(name, country, position, number, club, age, bio, output_path):
    """
    Generate a player card following the Atomic Portrait design philosophy.
    Scientific documentation of athletic brilliance.
    """
    W, H = 1080, 1350
    img = Image.new("RGB", (W, H), (8, 8, 15))
    draw = ImageDraw.Draw(img)

    team_data = get_team(country)
    team_rgb = hex_to_rgb(team_data["colors"][0])
    team_rgb2 = hex_to_rgb(team_data["colors"][1])
    gold = hex_to_rgb("#c8a84e")

    # === BACKGROUND: Dark specimen field ===
    draw_gradient_rect(draw, (0, 0, W, H), (8, 8, 15), (12, 10, 20))

    # Team color accent: thin geometric lines
    draw.line([(0, 0), (W, 0)], fill=team_rgb, width=4)
    draw.line([(0, H - 4), (W, H - 4)], fill=team_rgb, width=4)

    # Radial concentric circles (target system) behind where player would be
    cx, cy = W // 2, H // 2 - 80
    for r in range(200, 40, -30):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(*team_rgb,), width=1)

    # Corner markers
    m = 35
    draw.line([(25, 25), (25 + m, 25)], fill=team_rgb, width=2)
    draw.line([(25, 25), (25, 25 + m)], fill=team_rgb, width=2)
    draw.line([(W - 25, 25), (W - 25 - m, 25)], fill=team_rgb, width=2)
    draw.line([(W - 25, 25), (W - 25, 25 + m)], fill=team_rgb, width=2)
    draw.line([(25, H - 25), (25 + m, H - 25)], fill=team_rgb, width=2)
    draw.line([(25, H - 25), (25, H - 25 - m)], fill=team_rgb, width=2)
    draw.line([(W - 25, H - 25), (W - 25 - m, H - 25)], fill=team_rgb, width=2)
    draw.line([(W - 25, H - 25), (W - 25, H - 25 - m)], fill=team_rgb, width=2)

    # === JERSEY NUMBER: Sacred geometric element ===
    font_number = load_font("BigShoulders-Bold.ttf", 280)
    # Large translucent number as background
    draw.text(
        (W // 2, H // 2 - 100),
        str(number),
        fill=(*team_rgb,),
        font=font_number,
        anchor="mm",
    )

    # === PLAYER INFO: Clinical notation ===
    font_name = load_font("BigShoulders-Bold.ttf", 72)
    font_detail = load_font("Outfit-Regular.ttf", 26)
    font_stat_label = load_font("DMMono-Regular.ttf", 16)
    font_stat_value = load_font("Outfit-Bold.ttf", 28)
    font_fifa = load_font("Outfit-Regular.ttf", 14)
    font_bio = load_font("Outfit-Regular.ttf", 16)

    # Player name
    draw.text(
        (W // 2, H - 280),
        name.upper(),
        fill=(255, 255, 255),
        font=font_name,
        anchor="mm",
    )

    # Position and club
    draw.text(
        (W // 2, H - 225),
        f"{position}  |  {club}",
        fill=(180, 180, 180),
        font=font_detail,
        anchor="mm",
    )

    # Country and age
    draw.text(
        (W // 2, H - 195),
        f"{country}  |  Age {age}",
        fill=team_rgb,
        font=font_detail,
        anchor="mm",
    )

    # === STAT BARS: Data visualization ===
    stats_y = H - 155
    stat_width = 160
    bar_height = 4

    # Left stat
    draw.text((W // 4, stats_y), "#", fill=gold, font=font_stat_label, anchor="mm")
    draw.text(
        (W // 4, stats_y + 22),
        f"#{number}",
        fill=(255, 255, 255),
        font=font_stat_value,
        anchor="mm",
    )

    # Center stat
    draw.text(
        (W // 2, stats_y), "POSITION", fill=gold, font=font_stat_label, anchor="mm"
    )
    draw.text(
        (W // 2, stats_y + 22),
        position,
        fill=(255, 255, 255),
        font=font_stat_value,
        anchor="mm",
    )

    # Right stat
    draw.text(
        (3 * W // 4, stats_y), "COUNTRY", fill=gold, font=font_stat_label, anchor="mm"
    )
    draw.text(
        (3 * W // 4, stats_y + 22),
        team_data["code"].upper(),
        fill=(255, 255, 255),
        font=font_stat_value,
        anchor="mm",
    )

    # Bio line (if short enough)
    if bio and len(bio) < 80:
        draw.text(
            (W // 2, H - 75), bio, fill=(120, 120, 130), font=font_bio, anchor="mm"
        )

    # === FIFA BRANDING ===
    draw.text(
        (W // 2, 30), "FIFA WORLD CUP 2026", fill=gold, font=font_fifa, anchor="mm"
    )

    # Bottom accent line
    draw.line([(W // 2 - 60, H - 40), (W // 2 + 60, H - 40)], fill=gold, width=1)

    img.save(str(output_path), quality=95)
    print(f"[Player Card] Saved: {output_path}")
    return output_path


# ===== TEAM CARD =====
def generate_team_card(team_name, output_path):
    """
    Generate a team card following the Monumental Clash design philosophy.
    National identity as geometric artifact.
    """
    W, H = 700, 1000
    img = Image.new("RGB", (W, H), (8, 8, 15))
    draw = ImageDraw.Draw(img)

    team_data = get_team(team_name)
    primary = hex_to_rgb(team_data["colors"][0])
    secondary = hex_to_rgb(team_data["colors"][1])
    gold = hex_to_rgb("#c8a84e")

    # === BACKGROUND ===
    draw_gradient_rect(draw, (0, 0, W, H), primary, (8, 8, 15))

    # Secondary color accent stripe at top
    draw.rectangle([0, 0, W, 6], fill=secondary)

    # === GEOMETRIC FRAMEWORK ===
    # Large circle (national emblem)
    cx, cy = W // 2, H // 2 - 50
    draw.ellipse([cx - 180, cy - 180, cx + 180, cy + 180], outline=gold, width=2)
    draw.ellipse([cx - 170, cy - 170, cx + 170, cy + 170], outline=(*primary,), width=1)

    # Corner brackets
    m = 30
    draw.line([(20, 20), (20 + m, 20)], fill=gold, width=2)
    draw.line([(20, 20), (20, 20 + m)], fill=gold, width=2)
    draw.line([(W - 20, 20), (W - 20 - m, 20)], fill=gold, width=2)
    draw.line([(W - 20, 20), (W - 20, 20 + m)], fill=gold, width=2)
    draw.line([(20, H - 20), (20 + m, H - 20)], fill=gold, width=2)
    draw.line([(20, H - 20), (20, H - 20 - m)], fill=gold, width=2)
    draw.line([(W - 20, H - 20), (W - 20 - m, H - 20)], fill=gold, width=2)
    draw.line([(W - 20, H - 20), (W - 20, H - 20 - m)], fill=gold, width=2)

    # === TEAM CODE as monumental letterform ===
    font_code = load_font("BigShoulders-Bold.ttf", 140)
    draw.text(
        (W // 2, H // 2 - 50),
        team_data["code"].upper(),
        fill=(255, 255, 255),
        font=font_code,
        anchor="mm",
    )

    # === TEAM NAME ===
    font_name = load_font("Outfit-Bold.ttf", 36)
    draw.text(
        (W // 2, H // 2 + 80), team_name.upper(), fill=gold, font=font_name, anchor="mm"
    )

    # === CONFEDERATION ===
    conf = team_data.get("confederation", "")
    if not conf:
        # Try to determine from code
        code = team_data["code"]
        conf_map = {
            "br": "CONMEBOL",
            "ar": "CONMEBOL",
            "uy": "CONMEBOL",
            "co": "CONMEBOL",
            "fr": "UEFA",
            "gb-eng": "UEFA",
            "de": "UEFA",
            "es": "UEFA",
            "pt": "UEFA",
            "nl": "UEFA",
            "be": "UEFA",
            "hr": "UEFA",
            "pl": "UEFA",
            "dk": "UEFA",
            "rs": "UEFA",
            "gb-wls": "UEFA",
            "gb-sct": "UEFA",
            "no": "UEFA",
            "se": "UEFA",
            "at": "UEFA",
            "cz": "UEFA",
            "ch": "UEFA",
            "ba": "UEFA",
            "is": "UEFA",
            "it": "UEFA",
            "ma": "CAF",
            "sn": "CAF",
            "ng": "CAF",
            "cm": "CAF",
            "gh": "CAF",
            "tn": "CAF",
            "dz": "CAF",
            "eg": "CAF",
            "cv": "CAF",
            "cd": "CAF",
            "ml": "CAF",
            "ci": "CAF",
            "jp": "AFC",
            "kr": "AFC",
            "au": "AFC",
            "ir": "AFC",
            "sa": "AFC",
            "qa": "AFC",
            "iq": "AFC",
            "uz": "AFC",
            "jo": "AFC",
            "cn": "AFC",
            "us": "CONCACAF",
            "mx": "CONCACAF",
            "ca": "CONCACAF",
            "cr": "CONCACAF",
            "jm": "CONCACAF",
            "pa": "CONCACAF",
            "hn": "CONCACAF",
            "nz": "OFC",
            "ht": "CONCACAF",
            "cw": "CONCACAF",
            "za": "CAF",
        }
        conf = conf_map.get(code, "")
    font_conf = load_font("DMMono-Regular.ttf", 16)
    draw.text(
        (W // 2, H // 2 + 120), conf, fill=(150, 150, 150), font=font_conf, anchor="mm"
    )

    # === COLORS DISPLAY ===
    swatch_y = H // 2 + 160
    swatch_size = 30
    for i, color_hex in enumerate(team_data["colors"]):
        swatch_x = W // 2 - swatch_size + i * (swatch_size + 10)
        rgb = hex_to_rgb(color_hex)
        draw.rounded_rectangle(
            [swatch_x, swatch_y, swatch_x + swatch_size, swatch_y + swatch_size],
            radius=5,
            fill=rgb,
        )

    # === FIFA BRANDING ===
    font_fifa = load_font("Outfit-Regular.ttf", 14)
    draw.text(
        (W // 2, 28), "FIFA WORLD CUP 2026", fill=gold, font=font_fifa, anchor="mm"
    )

    # Bottom line
    draw.line([(W // 2 - 50, H - 40), (W // 2 + 50, H - 40)], fill=gold, width=1)
    draw.text(
        (W // 2, H - 25),
        "UNITED 2026",
        fill=(100, 100, 100),
        font=font_fifa,
        anchor="mm",
    )

    img.save(str(output_path), quality=95)
    print(f"[Team Card] Saved: {output_path}")
    return output_path


# ===== SOCIAL MEDIA GRAPHIC =====
def generate_social_graphic(
    graphic_type, title, subtitle="", team=None, output_path=None
):
    """
    Generate social media graphics following the Signal Amplification philosophy.
    Rhythmic geometry, bold typography, urgent energy.
    """
    W, H = 1080, 1080
    img = Image.new("RGB", (W, H), (8, 8, 15))
    draw = ImageDraw.Draw(img)

    gold = hex_to_rgb("#c8a84e")
    red = hex_to_rgb("#c8102e")

    if team:
        team_data = get_team(team)
        primary = hex_to_rgb(team_data["colors"][0])
    else:
        primary = hex_to_rgb("#c8102e")

    # === BACKGROUND: Rhythmic gradient ===
    draw_gradient_rect(draw, (0, 0, W, H), (8, 8, 15), (15, 12, 22))

    # === DECORATIVE RHYTHM: Repeating geometric elements ===
    # Concentric circles (pulse rhythm)
    cx, cy = W // 2, H // 2
    for r in range(350, 50, -40):
        opacity = max(30, 255 - r)
        c = lerp_color((8, 8, 15), primary, r / 350)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c, width=1)

    # Corner geometric markers
    m = 40
    draw.line([(25, 25), (25 + m, 25)], fill=gold, width=2)
    draw.line([(25, 25), (25, 25 + m)], fill=gold, width=2)
    draw.line([(W - 25, 25), (W - 25 - m, 25)], fill=gold, width=2)
    draw.line([(W - 25, 25), (W - 25, 25 + m)], fill=gold, width=2)
    draw.line([(25, H - 25), (25 + m, H - 25)], fill=gold, width=2)
    draw.line([(25, H - 25), (25, H - 25 - m)], fill=gold, width=2)
    draw.line([(W - 25, H - 25), (W - 25 - m, H - 25)], fill=gold, width=2)
    draw.line([(W - 25, H - 25), (W - 25, H - 25 - m)], fill=gold, width=2)

    # Gold accent lines
    draw.line([(0, 0), (W, 0)], fill=gold, width=3)
    draw.line([(0, H - 3), (W, H - 3)], fill=gold, width=3)

    # === CONTENT BASED ON TYPE ===
    if graphic_type == "countdown":
        # Large countdown number
        font_count = load_font("BigShoulders-Bold.ttf", 200)
        font_label = load_font("Outfit-Bold.ttf", 42)
        font_sub = load_font("Outfit-Regular.ttf", 24)

        # Parse number from title if possible
        count_text = title if title.isdigit() else "0"
        draw.text(
            (W // 2, H // 2 - 40), count_text, fill=gold, font=font_count, anchor="mm"
        )
        draw.text(
            (W // 2, H // 2 + 100),
            "DAYS",
            fill=(255, 255, 255),
            font=font_label,
            anchor="mm",
        )
        if subtitle:
            draw.text(
                (W // 2, H // 2 + 150),
                subtitle,
                fill=(150, 150, 150),
                font=font_sub,
                anchor="mm",
            )

    elif graphic_type == "result":
        font_big = load_font("BigShoulders-Bold.ttf", 120)
        font_team = load_font("Outfit-Bold.ttf", 36)
        font_score = load_font("BigShoulders-Bold.ttf", 80)

        draw.text(
            (W // 2, H // 3),
            title.upper(),
            fill=(255, 255, 255),
            font=font_big,
            anchor="mm",
        )
        if subtitle:
            draw.text(
                (W // 2, H // 2 + 40), subtitle, fill=gold, font=font_score, anchor="mm"
            )

        # Accent bar
        draw.rectangle([W // 2 - 40, H // 2 + 80, W // 2 + 40, H // 2 + 84], fill=gold)

    elif graphic_type == "announcement":
        font_tag = load_font("Outfit-Bold.ttf", 20)
        font_big = load_font("BigShoulders-Bold.ttf", 90)
        font_sub = load_font("Outfit-Regular.ttf", 28)

        # Tag bar
        draw.rounded_rectangle(
            [W // 2 - 100, H // 3 - 50, W // 2 + 100, H // 3 - 10], radius=5, fill=gold
        )
        draw.text(
            (W // 2, H // 3 - 30),
            "ANNOUNCEMENT",
            fill=(8, 8, 15),
            font=font_tag,
            anchor="mm",
        )

        draw.text(
            (W // 2, H // 2 + 10),
            title.upper(),
            fill=(255, 255, 255),
            font=font_big,
            anchor="mm",
        )
        if subtitle:
            draw.text(
                (W // 2, H // 2 + 80),
                subtitle,
                fill=(150, 150, 150),
                font=font_sub,
                anchor="mm",
            )

    else:
        font_big = load_font("BigShoulders-Bold.ttf", 80)
        font_sub = load_font("Outfit-Regular.ttf", 30)

        draw.text(
            (W // 2, H // 3),
            title.upper(),
            fill=(255, 255, 255),
            font=font_big,
            anchor="mm",
        )
        if subtitle:
            draw.text(
                (W // 2, H // 2 + 20), subtitle, fill=gold, font=font_sub, anchor="mm"
            )

    # === FIFA BRANDING ===
    font_fifa = load_font("Outfit-Regular.ttf", 14)
    draw.text(
        (W // 2, 30), "FIFA WORLD CUP 2026", fill=gold, font=font_fifa, anchor="mm"
    )
    draw.text(
        (W // 2, H - 20),
        "UNITED 2026",
        fill=(100, 100, 100),
        font=font_fifa,
        anchor="mm",
    )

    if not output_path:
        output_path = (
            f"social_{graphic_type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        )

    img.save(str(output_path), quality=95)
    print(f"[Social] Saved: {output_path}")
    return output_path


# ===== MAIN CLI =====
def main():
    parser = argparse.ArgumentParser(description="FIFA World Cup 2026 Graphic Designer")

    sub = parser.add_subparsers(dest="command", help="Graphic type to generate")

    # Match poster
    poster = sub.add_parser("poster", help="Generate match poster")
    poster.add_argument("--home", required=True, help="Home team name")
    poster.add_argument("--away", required=True, help="Away team name")
    poster.add_argument("--date", required=True, help="Match date")
    poster.add_argument("--time", required=True, help="Match time")
    poster.add_argument("--venue", required=True, help="Venue name")
    poster.add_argument("--output", help="Output file path")

    # Player card
    player = sub.add_parser("player", help="Generate player card")
    player.add_argument("--name", required=True, help="Player name")
    player.add_argument("--country", required=True, help="Country name")
    player.add_argument("--position", required=True, help="Position")
    player.add_argument("--number", required=True, help="Jersey number")
    player.add_argument("--club", required=True, help="Club name")
    player.add_argument("--age", required=True, help="Age")
    player.add_argument("--bio", default="", help="Short bio")
    player.add_argument("--output", help="Output file path")

    # Team card
    team = sub.add_parser("card", help="Generate team card")
    team.add_argument("--team", required=True, help="Team name")
    team.add_argument("--output", help="Output file path")

    # Social media graphic
    social = sub.add_parser("social", help="Generate social media graphic")
    social.add_argument(
        "--type",
        required=True,
        choices=["countdown", "result", "announcement", "general"],
    )
    social.add_argument("--title", required=True, help="Main title/number")
    social.add_argument("--subtitle", default="", help="Subtitle")
    social.add_argument("--team", default=None, help="Team name for colors")
    social.add_argument("--output", help="Output file path")

    # List teams
    sub.add_parser("teams", help="List available teams")

    args = parser.parse_args()
    output_dir = Path(__file__).parent / "output"
    output_dir.mkdir(exist_ok=True)

    if args.command == "poster":
        out = args.output or str(
            output_dir / f"poster_{args.home.lower()}_vs_{args.away.lower()}.png"
        )
        generate_match_poster(
            args.home, args.away, args.date, args.time, args.venue, out
        )

    elif args.command == "player":
        out = args.output or str(
            output_dir / f"player_{args.name.lower().replace(' ', '_')}.png"
        )
        generate_player_card(
            args.name,
            args.country,
            args.position,
            args.number,
            args.club,
            args.age,
            args.bio,
            out,
        )

    elif args.command == "card":
        out = args.output or str(
            output_dir / f"team_{args.team.lower().replace(' ', '_')}.png"
        )
        generate_team_card(args.team, out)

    elif args.command == "social":
        out = args.output or str(
            output_dir
            / f"social_{args.type}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        )
        generate_social_graphic(args.type, args.title, args.subtitle, args.team, out)

    elif args.command == "teams":
        print("\nAvailable teams:")
        for name in sorted(TEAMS.keys()):
            print(f"  {name} ({TEAMS[name]['code']})")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
