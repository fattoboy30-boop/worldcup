// ===== Team Data =====
const teams = {
    "Brazil": { code: "br", colors: ["#009c3b", "#ffdf00"], confederation: "CONMEBOL" },
    "Argentina": { code: "ar", colors: ["#74acdf", "#f6b40e"], confederation: "CONMEBOL" },
    "France": { code: "fr", colors: ["#002395", "#ed2939"], confederation: "UEFA" },
    "England": { code: "gb-eng", colors: ["#fff", "#e3000b"], confederation: "UEFA" },
    "Germany": { code: "de", colors: ["#000", "#dd0000"], confederation: "UEFA" },
    "Spain": { code: "es", colors: ["#aa151b", "#f1bf00"], confederation: "UEFA" },
    "Portugal": { code: "pt", colors: ["#006600", "#ff0000"], confederation: "UEFA" },
    "Netherlands": { code: "nl", colors: ["#ae1c28", "#fff"], confederation: "UEFA" },
    "Belgium": { code: "be", colors: ["#000", "#fdda24"], confederation: "UEFA" },
    "Croatia": { code: "hr", colors: ["#ff0000", "#fff"], confederation: "UEFA" },
    "Morocco": { code: "ma", colors: ["#c1272d", "#006233"], confederation: "CAF" },
    "Japan": { code: "jp", colors: ["#bc002d", "#fff"], confederation: "AFC" },
    "South Korea": { code: "kr", colors: ["#003478", "#c60c30"], confederation: "AFC" },
    "USA": { code: "us", colors: ["#3c3b6e", "#b22234"], confederation: "CONCACAF" },
    "Mexico": { code: "mx", colors: ["#006847", "#ce1126"], confederation: "CONCACAF" },
    "Canada": { code: "ca", colors: ["#ff0000", "#fff"], confederation: "CONCACAF" },
    "Uruguay": { code: "uy", colors: ["#5b9fae", "#fff"], confederation: "CONMEBOL" },
    "Colombia": { code: "co", colors: ["#fcd116", "#003893"], confederation: "CONMEBOL" },
    "Senegal": { code: "sn", colors: ["#00853f", "#fdef42"], confederation: "CAF" },
    "Nigeria": { code: "ng", colors: ["#008751", "#fff"], confederation: "CAF" }
};

const FLAG_CDN = "https://flagcdn.com/w160";

// ===== Match Poster Generator =====
function generatePoster() {
    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam').value;
    
    const homeData = teams[homeTeam];
    const awayData = teams[awayTeam];
    
    // Update poster preview
    document.getElementById('posterHomeName').textContent = homeTeam;
    document.getElementById('posterAwayName').textContent = awayTeam;
    document.getElementById('posterHomeFlag').src = `${FLAG_CDN}/${homeData.code}.png`;
    document.getElementById('posterAwayFlag').src = `${FLAG_CDN}/${awayData.code}.png`;
    
    // Update poster background with team colors
    const poster = document.getElementById('posterCanvas');
    poster.style.background = `linear-gradient(135deg, ${homeData.colors[0]} 0%, #1a1a2e 50%, ${awayData.colors[0]} 100%)`;
    
    console.log(`Generated poster: ${homeTeam} vs ${awayTeam}`);
}

// ===== Social Media Generator =====
function generateSocial() {
    const type = document.getElementById('socialType').value;
    const title = document.getElementById('socialTitle').value;
    const subtitle = document.getElementById('socialSubtitle').value;
    
    // Update social preview
    document.getElementById('socialPreviewTitle').textContent = title;
    document.getElementById('socialPreviewSubtitle').textContent = subtitle;
    
    // Update style based on type
    const canvas = document.getElementById('socialCanvas');
    switch(type) {
        case 'countdown':
            canvas.style.background = 'linear-gradient(135deg, #003087 0%, #001845 100%)';
            break;
        case 'announcement':
            canvas.style.background = 'linear-gradient(135deg, #c8102e 0%, #a00d24 100%)';
            break;
        case 'result':
            canvas.style.background = 'linear-gradient(135deg, #009c3b 0%, #006847 100%)';
            break;
    }
    
    console.log(`Generated social graphic: ${type} - ${title}`);
}

// ===== Team Card Generator =====
function generateCard() {
    const teamName = document.getElementById('cardTeam').value;
    const teamData = teams[teamName];
    
    // Update card preview
    document.getElementById('cardTeamName').textContent = teamName;
    document.getElementById('cardTeamFlag').src = `${FLAG_CDN}/${teamData.code}.png`;
    document.getElementById('cardConfederation').textContent = teamData.confederation;
    
    // Update card background with team color
    const card = document.getElementById('teamCardCanvas');
    card.style.background = `linear-gradient(180deg, ${teamData.colors[0]} 0%, ${teamData.colors[0]}88 100%)`;
    
    console.log(`Generated team card: ${teamName}`);
}

// ===== Download Functions =====
function downloadPoster() {
    const element = document.getElementById('posterCanvas');
    downloadAsImage(element, 'match_poster');
}

function downloadSocial() {
    const element = document.getElementById('socialCanvas');
    downloadAsImage(element, 'social_media');
}

function downloadCard() {
    const element = document.getElementById('teamCardCanvas');
    downloadAsImage(element, 'team_card');
}

function downloadAsImage(element, filename) {
    if (typeof html2canvas !== 'undefined') {
        html2canvas(element, {
            backgroundColor: null,
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `${filename}_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    } else {
        alert('html2canvas not loaded. Please use a modern browser.');
    }
}

// ===== Share Functions =====
function sharePoster() {
    shareGraphic('FIFA World Cup 2026 Match Poster');
}

function shareSocial() {
    shareGraphic('FIFA World Cup 2026 Social Media Graphic');
}

function shareCard() {
    shareGraphic('FIFA World Cup 2026 Team Card');
}

function shareGraphic(title) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${title}! ⚽🏆 #FIFAWorldCup #WorldCup2026`);
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback to Facebook share
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
            'share',
            'width=600,height=400'
        );
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial values
    generatePoster();
    generateSocial();
    generateCard();
    
    // Add event listeners for live preview updates
    document.getElementById('homeTeam').addEventListener('change', generatePoster);
    document.getElementById('awayTeam').addEventListener('change', generatePoster);
    document.getElementById('socialTitle').addEventListener('input', generateSocial);
    document.getElementById('socialSubtitle').addEventListener('input', generateSocial);
    document.getElementById('cardTeam').addEventListener('change', generateCard);
});
