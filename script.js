// ===== Teams Data with Flag CDN URLs =====
const teams = [
    // Europe (UEFA)
    { name: "France", code: "fr", confederation: "europe" },
    { name: "England", code: "gb-eng", confederation: "europe" },
    { name: "Germany", code: "de", confederation: "europe" },
    { name: "Spain", code: "es", confederation: "europe" },
    { name: "Portugal", code: "pt", confederation: "europe" },
    { name: "Netherlands", code: "nl", confederation: "europe" },
    { name: "Belgium", code: "be", confederation: "europe" },
    { name: "Croatia", code: "hr", confederation: "europe" },
    { name: "Italy", code: "it", confederation: "europe" },
    { name: "Switzerland", code: "ch", confederation: "europe" },
    { name: "Denmark", code: "dk", confederation: "europe" },
    { name: "Poland", code: "pl", confederation: "europe" },
    { name: "Serbia", code: "rs", confederation: "europe" },
    { name: "Ukraine", code: "ua", confederation: "europe" },
    { name: "Czech Republic", code: "cz", confederation: "europe" },
    { name: "Austria", code: "at", confederation: "europe" },
    { name: "Scotland", code: "gb-sct", confederation: "europe" },
    { name: "Norway", code: "no", confederation: "europe" },
    { name: "Sweden", code: "se", confederation: "europe" },
    { name: "Wales", code: "gb-wls", confederation: "europe" },
    { name: "Hungary", code: "hu", confederation: "europe" },
    { name: "Romania", code: "ro", confederation: "europe" },
    { name: "Greece", code: "gr", confederation: "europe" },
    { name: "Turkey", code: "tr", confederation: "europe" },
    
    // South America (CONMEBOL)
    { name: "Brazil", code: "br", confederation: "south-america" },
    { name: "Argentina", code: "ar", confederation: "south-america" },
    { name: "Uruguay", code: "uy", confederation: "south-america" },
    { name: "Colombia", code: "co", confederation: "south-america" },
    { name: "Ecuador", code: "ec", confederation: "south-america" },
    { name: "Paraguay", code: "py", confederation: "south-america" },
    { name: "Chile", code: "cl", confederation: "south-america" },
    { name: "Peru", code: "pe", confederation: "south-america" },
    
    // Asia (AFC)
    { name: "Japan", code: "jp", confederation: "asia" },
    { name: "South Korea", code: "kr", confederation: "asia" },
    { name: "Australia", code: "au", confederation: "asia" },
    { name: "Iran", code: "ir", confederation: "asia" },
    { name: "Saudi Arabia", code: "sa", confederation: "asia" },
    { name: "Qatar", code: "qa", confederation: "asia" },
    { name: "China", code: "cn", confederation: "asia" },
    { name: "Iraq", code: "iq", confederation: "asia" },
    { name: "Uzbekistan", code: "uz", confederation: "asia" },
    { name: "Jordan", code: "jo", confederation: "asia" },
    
    // Africa (CAF)
    { name: "Morocco", code: "ma", confederation: "africa" },
    { name: "Senegal", code: "sn", confederation: "africa" },
    { name: "Tunisia", code: "tn", confederation: "africa" },
    { name: "Cameroon", code: "cm", confederation: "africa" },
    { name: "Ghana", code: "gh", confederation: "africa" },
    { name: "Nigeria", code: "ng", confederation: "africa" },
    { name: "Algeria", code: "dz", confederation: "africa" },
    { name: "Egypt", code: "eg", confederation: "africa" },
    { name: "Mali", code: "ml", confederation: "africa" },
    { name: "Côte d'Ivoire", code: "ci", confederation: "africa" },
    
    // CONCACAF
    { name: "USA", code: "us", confederation: "concacaf" },
    { name: "Mexico", code: "mx", confederation: "concacaf" },
    { name: "Canada", code: "ca", confederation: "concacaf" },
    { name: "Costa Rica", code: "cr", confederation: "concacaf" },
    { name: "Jamaica", code: "jm", confederation: "concacaf" },
    { name: "Panama", code: "pa", confederation: "concacaf" },
    { name: "Honduras", code: "hn", confederation: "concacaf" },
    
    // Oceania (OFC)
    { name: "New Zealand", code: "nz", confederation: "oceania" }
];

// ===== Players Data with Image Placeholders =====
const players = [
    {
        name: "Kylian Mbappé",
        country: "France",
        countryCode: "fr",
        position: "Forward",
        number: 10,
        bio: "The fastest player in world football. 2018 World Cup winner and 2022 Golden Boot winner.",
        image: "https://img.a.transfermarkt.technology/portrait/header/342229-1700087573.jpg"
    },
    {
        name: "Lionel Messi",
        country: "Argentina",
        countryCode: "ar",
        position: "Forward",
        number: 10,
        bio: "2022 World Cup champion. Greatest of all time. Last dance in 2026?",
        image: "https://img.a.transfermarkt.technology/portrait/header/28003-1700087553.jpg"
    },
    {
        name: "Erling Haaland",
        country: "Norway",
        countryCode: "no",
        position: "Striker",
        number: 9,
        bio: "Goal machine. Norway's first World Cup in decades.",
        image: "https://img.a.transfermarkt.technology/portrait/header/418560-1682783524.jpg"
    },
    {
        name: "Vinícius Jr.",
        country: "Brazil",
        countryCode: "br",
        position: "Winger",
        number: 7,
        bio: "Electrifying pace and skill. Brazil's talisman.",
        image: "https://img.a.transfermarkt.technology/portrait/header/371998-1694600404.jpg"
    },
    {
        name: "Jude Bellingham",
        country: "England",
        countryCode: "gb-eng",
        position: "Midfielder",
        number: 8,
        bio: "Young English star. Real Madrid's midfield maestro.",
        image: "https://img.a.transfermarkt.technology/portrait/header/581678-1694600380.jpg"
    },
    {
        name: "Bukayo Saka",
        country: "England",
        countryCode: "gb-eng",
        position: "Winger",
        number: 9,
        bio: "Arsenal's star boy. Deadly on the right wing.",
        image: "https://img.a.transfermarkt.technology/portrait/header/532498-1668022304.jpg"
    }
];

// Flag CDN base URL
const FLAG_CDN = "https://flagcdn.com/w160";

// ===== News Data =====
let newsData = [];
let filteredNews = [];
let newsToShow = 6;
let currentNewsCategory = 'all';

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initParticles();
    initCountdown();
    initTeams();
    initFilters();
    initPlayers();
    initCarousel();
    initQuiz();
    initFacts();
    initPolls();
    initNews();
    initScrollAnimations();
});

// ===== Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ===== Particles =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== Countdown =====
function initCountdown() {
    const tournamentStart = new Date('2026-06-11T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = tournamentStart - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Teams =====
function getFlagUrl(code) {
    return `${FLAG_CDN}/${code}.png`;
}

function initTeams(filter = 'all') {
    const grid = document.getElementById('teamsGrid');
    grid.innerHTML = '';

    const filteredTeams = filter === 'all' 
        ? teams 
        : teams.filter(team => team.confederation === filter);

    filteredTeams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img class="team-flag-img" src="${getFlagUrl(team.code)}" alt="${team.name} flag" loading="lazy" onerror="this.src='https://flagcdn.com/w160/un.png'">
            <span class="team-name">${team.name}</span>
        `;
        grid.appendChild(card);
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            initTeams(btn.dataset.filter);
        });
    });
}

// ===== Players =====
function initPlayers() {
    const carousel = document.getElementById('playersCarousel');
    carousel.innerHTML = '';

    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = `player-card ${index === 0 ? 'featured' : ''}`;
        card.innerHTML = `
            <div class="player-image">
                <img class="player-img" src="${player.image}" alt="${player.name}" onerror="this.parentElement.innerHTML='<div class=\\'player-placeholder\\'>⚽</div>'">
                <img class="player-country-flag" src="${getFlagUrl(player.countryCode)}" alt="${player.country}">
                <div class="player-number">#${player.number}</div>
            </div>
            <div class="player-info">
                <h3 class="player-name">${player.name}</h3>
                <span class="player-country">${player.country}</span>
                <span class="player-position">${player.position}</span>
                <p class="player-bio">${player.bio}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// ===== Carousel =====
function initCarousel() {
    const carousel = document.getElementById('playersCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// ===== Quiz =====
const quizQuestions = [
    {
        question: "Which country has won the most World Cup titles?",
        options: ["Germany (4)", "Brazil (5)", "Italy (4)", "Argentina (3)"],
        correct: 1
    },
    {
        question: "Who scored the 'Goal of the Century' in 1986?",
        options: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldo"],
        correct: 1
    },
    {
        question: "Which was the first World Cup hosted in Asia?",
        options: ["Japan 2002", "Korea/Japan 2002", "Qatar 2022", "China 2026"],
        correct: 1
    },
    {
        question: "Who holds the record for most World Cup goals?",
        options: ["Ronaldo (15)", "Miroslav Klose (16)", "Gerd Müller (14)", "Lionel Messi (13)"],
        correct: 1
    },
    {
        question: "What was the final score of Germany vs Brazil in 2014?",
        options: ["5-0", "7-1", "6-0", "4-1"],
        correct: 1
    }
];

let currentQuestion = 0;

function initQuiz() {
    const quizBtns = document.querySelectorAll('.quiz-btn');
    const nextBtn = document.getElementById('nextQuestion');
    
    quizBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.dataset.correct === 'true';
            quizBtns.forEach(b => {
                b.disabled = true;
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                } else if (b === btn && !isCorrect) {
                    b.classList.add('incorrect');
                }
            });
        });
    });

    nextBtn.addEventListener('click', () => {
        currentQuestion = (currentQuestion + 1) % quizQuestions.length;
        updateQuiz();
    });
}

function updateQuiz() {
    const question = quizQuestions[currentQuestion];
    const questionEl = document.querySelector('.question');
    const quizBtns = document.querySelectorAll('.quiz-btn');
    
    questionEl.textContent = question.question;
    quizBtns.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.dataset.correct = index === question.correct ? 'true' : 'false';
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
}

// ===== Facts =====
function initFacts() {
    const facts = document.querySelectorAll('.fact');
    const dots = document.querySelectorAll('.dot');
    let currentFact = 0;

    function showFact(index) {
        facts.forEach(f => f.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        facts[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentFact = index;
            showFact(currentFact);
        });
    });

    setInterval(() => {
        currentFact = (currentFact + 1) % facts.length;
        showFact(currentFact);
    }, 5000);
}

// ===== Polls =====
function initPolls() {
    const pollBtns = document.querySelectorAll('.poll-btn');
    
    pollBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentVotes = parseInt(btn.querySelector('.vote-count').textContent);
            btn.querySelector('.vote-count').textContent = currentVotes + 1;
            btn.style.background = 'rgba(200, 16, 46, 0.3)';
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-header, .city-card, .team-card, .schedule-card, .player-card, .fan-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Social Sharing =====
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('FIFA World Cup 2026 - United North America');
    const text = encodeURIComponent('Check out this amazing FIFA World Cup 2026 page! 48 Nations, 3 Countries, 1 Champion! ⚽🏆');
    
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
        'facebook-share',
        'width=600,height=400'
    );
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing FIFA World Cup 2026 page! 48 Nations, 3 Countries, 1 Champion! ⚽🏆 #FIFAWorldCup #WorldCup2026');
    
    window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        'twitter-share',
        'width=600,height=400'
    );
}

// ===== Newsletter =====
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You'll receive the latest World Cup updates.`);
    e.target.reset();
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Schedule Tab Filtering =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== News Section =====
async function initNews() {
    try {
        const response = await fetch('news.json');
        const data = await response.json();
        newsData = data.articles;
        filteredNews = [...newsData];
        
        // Update last updated time
        const lastUpdated = document.getElementById('newsLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(data.lastUpdated).toLocaleString();
        }
        
        // Render initial news
        renderNews();
        
        // Initialize news filters
        initNewsFilters();
        
        // Initialize load more button
        initLoadMoreNews();
        
    } catch (error) {
        console.log('News data not available, using embedded data');
        loadEmbeddedNews();
    }
}

function loadEmbeddedNews() {
    // Fallback embedded news data
    newsData = [
        {
            id: 1,
            title: "Lightning halts pre-World Cup friendly in Texas",
            source: "BBC Sport",
            date: "2026-06-06",
            url: "https://www.bbc.com/sport/football/articles/c5yz3p6vjd1o",
            category: "breaking",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/0a4a/live/b7dd7e80-618f-11f1-b927-d7e60ed16f70.jpg",
            description: "Saudi Arabia's World Cup warm-up game against Puerto Rico in Texas is halted for nearly two hours because of extreme weather."
        },
        {
            id: 2,
            title: "The pioneer in an unlikely World Cup team",
            source: "BBC Sport",
            date: "2026-06-06",
            url: "https://www.bbc.com/sport/football/articles/cn4p4jw7pzko",
            category: "history",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/fd9e/live/367c0230-60e5-11f1-82ca-1380a42b6773.jpg",
            description: "When Desmond Armstrong faced the media at the World Cup in 1990, the first question he got would stick in his mind."
        },
        {
            id: 3,
            title: "Iran says staff blocked from entering US",
            source: "BBC Sport",
            date: "2026-06-06",
            url: "https://www.bbc.com/news/articles/cy8286nqz87o",
            category: "breaking",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/de59/live/4501e9e0-614f-11f1-89a3-d1f559421220.jpg",
            description: "Iranian officials say technical staff have been denied visas, hours after the US said players could enter the country."
        },
        {
            id: 4,
            title: "Paraguay star Enciso injured in warm-up",
            source: "BBC Sport",
            date: "2026-06-06",
            url: "https://www.bbc.com/sport/football/articles/cq812vlx992o",
            category: "injuries",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/7a36/live/fb50dd20-6198-11f1-80e4-07386a28f8fd.jpg",
            description: "Paraguay forward Julio Enciso's World Cup is in doubt after he was injured during a 4-0 friendly win."
        },
        {
            id: 5,
            title: "Will transfers distract England at World Cup?",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/articles/crlpglx66z9o",
            category: "transfers",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/1551/live/8b4a4050-602d-11f1-8b8c-6d33e1d5abb6.jpg",
            description: "England's World Cup campaign is also in the middle of a busy summer transfer window."
        },
        {
            id: 6,
            title: "How thunderstorms could impact World Cup games",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/articles/cqjpjgqe42ro",
            category: "venues",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/daf9/live/b2a9ef40-60e3-11f1-82ca-1380a42b6773.jpg",
            description: "With several host cities in peak thunderstorm season there is a high chance games could be disrupted."
        },
        {
            id: 7,
            title: "Fifa demands fans pay after ticketing error",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/articles/cy828v7r5ydo",
            category: "tickets",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/2b75/live/11b21080-60b7-11f1-9b5a-5531746793c9.jpg",
            description: "Fifa says fans mistakenly given free tickets must pay within seven days or lose the seats."
        },
        {
            id: 8,
            title: "Germany forward Karl ruled out of World Cup",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/articles/cz020zdklmmo",
            category: "injuries",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/baf5/live/03caafb0-6132-11f1-8250-9b8ef0ee255e.jpg",
            description: "Germany forward Lennart Karl is ruled out of the 2026 World Cup with a thigh injury."
        },
        {
            id: 9,
            title: "Messi or Ronaldo - who is the greatest?",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/videos/c3v2gg2ldr5o",
            category: "analysis",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/d050/live/82cae000-6006-11f1-88e1-8920f3bb90a6.jpg",
            description: "Some of the greats of the game debate the long-asked question: Lionel Messi or Cristiano Ronaldo?"
        },
        {
            id: 10,
            title: "Fifa clarifies water bottle stadium rule",
            source: "BBC Sport",
            date: "2026-06-05",
            url: "https://www.bbc.com/sport/football/articles/c79490e8g37o",
            category: "venues",
            thumbnail: "https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/b564/live/a0b5e3d0-6132-11f1-89a3-d1f559421220.jpg",
            description: "Fifa says fans will be able to bring sealed disposable water bottles into World Cup stadiums."
        }
    ];
    
    filteredNews = [...newsData];
    renderNews();
    initNewsFilters();
    initLoadMoreNews();
}

function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    const newsToRender = filteredNews.slice(0, newsToShow);
    
    grid.innerHTML = newsToRender.map(article => `
        <article class="news-card" data-category="${article.category}">
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">
                <div class="news-image">
                    ${article.thumbnail 
                        ? `<img src="${article.thumbnail}" alt="${article.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'news-placeholder\\'>📰</div>'">`
                        : '<div class="news-placeholder">📰</div>'
                    }
                    <span class="news-category">${article.category}</span>
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-description">${article.description || ''}</p>
                    <div class="news-meta-row">
                        <span class="news-source">${article.source}</span>
                        <span class="news-date">${formatNewsDate(article.date)}</span>
                    </div>
                </div>
            </a>
        </article>
    `).join('');
    
    // Update load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filteredNews.length > newsToShow ? 'inline-flex' : 'none';
    }
}

function formatNewsDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function initNewsFilters() {
    const filterBtns = document.querySelectorAll('.news-filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter news
            currentNewsCategory = btn.dataset.category;
            
            if (currentNewsCategory === 'all') {
                filteredNews = [...newsData];
            } else {
                filteredNews = newsData.filter(article => article.category === currentNewsCategory);
            }
            
            // Reset show count and render
            newsToShow = 6;
            renderNews();
        });
    });
}

function initLoadMoreNews() {
    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            newsToShow += 6;
            renderNews();
        });
    }
}
