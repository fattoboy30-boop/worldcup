# FIFA World Cup 2026 Graphic Designer Agent

Canvas Design-powered graphics for the FIFA World Cup 2026. Generates museum-quality match posters, player cards, team cards, and social media graphics using design philosophies.

## Design Philosophies

Each graphic type is guided by a design philosophy:

- **Monumental Clash** (`design_philosophies/match_poster.md`) - Bilateral confrontation, architectural geometry, team color warfare
- **Atomic Portrait** (`design_philosophies/player_card.md`) - Scientific documentation of athletic brilliance
- **Signal Amplification** (`design_philosophies/social_media.md`) - Rhythmic geometry, bold typography, urgent energy

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Generate a match poster
python graphic_designer.py poster --home "Brazil" --away "Argentina" --date "June 15, 2026" --time "20:00" --venue "MetLife Stadium"

# Generate a player card
python graphic_designer.py player --name "Kylian Mbappe" --country "France" --position "Forward" --number "10" --club "Real Madrid" --age "27" --bio "2018 World Cup winner"

# Generate a team card
python graphic_designer.py card --team "Brazil"

# Generate social media graphic
python graphic_designer.py social --type "countdown" --title "5" --subtitle "Days until kickoff"

# List all available teams
python graphic_designer.py teams
```

## Graphic Types

### Match Poster (1080x1350)
VS-style bilateral composition with team colors, architectural geometry, and clinical match info notation.

### Player Card (1080x1350)
Atomic Portrait style - large jersey number watermark, concentric circle framework, clinical stat display.

### Team Card (700x1000)
National identity as geometric artifact - team code as monumental letterform, color swatches, confederation marker.

### Social Media Graphic (1080x1080)
Signal Amplification - rhythmic concentric circles, bold countdown numbers, gold accent branding.

## Font System

Uses 50+ Canvas Design fonts from `canvas-fonts/`:
- **BigShoulders-Bold** - Headlines, numbers, team names
- **Outfit-Bold/Regular** - Subheadings, details, labels
- **DMMono-Regular** - Clinical notation, data labels
- **BricolageGrotesque** - Fallback bold text

## Output

All graphics save to `output/` directory as high-quality PNG files.

## File Structure

```
graphic_designer/
├── graphic_designer.py          # Main generator (Canvas Design approach)
├── canvas-fonts/                # 50+ design-forward fonts
├── design_philosophies/         # .md philosophy files
│   ├── match_poster.md
│   ├── player_card.md
│   └── social_media.md
├── output/                      # Generated graphics
├── requirements.txt
└── README.md
```

## Social Media Types

| Type | Description |
|------|-------------|
| `countdown` | Large number + label (e.g., "5 DAYS") |
| `result` | Match result display |
| `announcement` | Event announcement with tag bar |
| `general` | Title + subtitle layout |
