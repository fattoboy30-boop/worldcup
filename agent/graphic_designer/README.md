# FIFA World Cup 2026 Graphic Designer Agent

Generate match posters, social media graphics, and team cards for the FIFA World Cup 2026.

## Features

- **Match Posters**: Generate VS-style match posters with team colors
- **Social Media Graphics**: Create countdown, announcement, and result graphics
- **Team Cards**: Design team information cards with flag and stats
- **Multiple Generation Methods**: ComfyUI, Pillow, or HTML/CSS templates

## Generation Methods

### 1. Python (Pillow)
Generate graphics programmatically using Pillow library.

```bash
# Install dependencies
pip install -r requirements.txt

# Generate match poster
python graphic_designer.py poster --home "Brazil" --away "Argentina" --date "June 15, 2026" --time "20:00" --venue "MetLife Stadium"

# Generate social media graphic
python graphic_designer.py social --type "countdown" --title "WORLD CUP 2026" --subtitle "Coming Soon"

# Generate team card
python graphic_designer.py card --team "Brazil"

# Batch generation
python graphic_designer.py batch --posters --cards --social-pack
```

### 2. HTML/CSS Templates
Use the browser-based template generator for interactive design.

```bash
# Open templates/index.html in a browser
# Use the controls to customize and download graphics
```

### 3. ComfyUI Integration
Generate AI-powered graphics using ComfyUI (requires ComfyUI installation).

```bash
# Start ComfyUI server
# Ensure workflows are in the workflows/ directory
# Run the generator with ComfyUI enabled
```

## Output Formats

- **PNG**: High-quality images for web and print
- **JPEG**: Compressed images for social media
- **SVG**: Vector graphics for scalability

## File Structure

```
graphic_designer/
├── graphic_designer.py      # Main Python script
├── requirements.txt         # Python dependencies
├── README.md               # Documentation
├── workflows/              # ComfyUI workflows
│   ├── match_poster.json
│   ├── social_media.json
│   └── team_card.json
├── templates/              # HTML/CSS templates
│   ├── index.html
│   ├── templates.css
│   └── templates.js
└── output/                 # Generated graphics
```

## Supported Teams

- Brazil, Argentina, France, England, Germany, Spain
- USA, Mexico, Canada, Japan, Morocco, South Korea
- And 32 more qualified teams...

## Customization

### Team Colors
Edit the `teams` dictionary in `graphic_designer.py` to add or modify team colors.

### Templates
Modify HTML/CSS templates in the `templates/` directory to change the design.

### Workflows
Create custom ComfyUI workflows in the `workflows/` directory for AI generation.

## Browser Requirements

For HTML/CSS template generator:
- Modern browser (Chrome, Firefox, Edge, Safari)
- html2canvas library (loaded via CDN)

## License

Fan-made graphics tool for educational purposes. Not officially affiliated with FIFA.
