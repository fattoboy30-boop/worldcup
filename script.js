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
    { name: "Switzerland", code: "ch", confederation: "europe" },
    { name: "Austria", code: "at", confederation: "europe" },
    { name: "Scotland", code: "gb-sct", confederation: "europe" },
    { name: "Norway", code: "no", confederation: "europe" },
    { name: "Sweden", code: "se", confederation: "europe" },
    { name: "Czechia", code: "cz", confederation: "europe" },
    { name: "Bosnia and Herzegovina", code: "ba", confederation: "europe" },
    { name: "Türkiye", code: "tr", confederation: "europe" },

    // South America (CONMEBOL)
    { name: "Brazil", code: "br", confederation: "south-america" },
    { name: "Argentina", code: "ar", confederation: "south-america" },
    { name: "Uruguay", code: "uy", confederation: "south-america" },
    { name: "Colombia", code: "co", confederation: "south-america" },
    { name: "Ecuador", code: "ec", confederation: "south-america" },
    { name: "Paraguay", code: "py", confederation: "south-america" },

    // Asia (AFC)
    { name: "Japan", code: "jp", confederation: "asia" },
    { name: "South Korea", code: "kr", confederation: "asia" },
    { name: "Australia", code: "au", confederation: "asia" },
    { name: "IR Iran", code: "ir", confederation: "asia" },
    { name: "Saudi Arabia", code: "sa", confederation: "asia" },
    { name: "Qatar", code: "qa", confederation: "asia" },
    { name: "Iraq", code: "iq", confederation: "asia" },
    { name: "Uzbekistan", code: "uz", confederation: "asia" },
    { name: "Jordan", code: "jo", confederation: "asia" },
    { name: "Curaçao", code: "cw", confederation: "concacaf" },

    // Africa (CAF)
    { name: "Morocco", code: "ma", confederation: "africa" },
    { name: "Senegal", code: "sn", confederation: "africa" },
    { name: "Tunisia", code: "tn", confederation: "africa" },
    { name: "Ghana", code: "gh", confederation: "africa" },
    { name: "Algeria", code: "dz", confederation: "africa" },
    { name: "Egypt", code: "eg", confederation: "africa" },
    { name: "Côte d'Ivoire", code: "ci", confederation: "africa" },
    { name: "Cabo Verde", code: "cv", confederation: "africa" },
    { name: "DR Congo", code: "cd", confederation: "africa" },
    { name: "South Africa", code: "za", confederation: "africa" },

    // CONCACAF
    { name: "USA", code: "us", confederation: "concacaf" },
    { name: "Mexico", code: "mx", confederation: "concacaf" },
    { name: "Canada", code: "ca", confederation: "concacaf" },
    { name: "Panama", code: "pa", confederation: "concacaf" },
    { name: "Haiti", code: "ht", confederation: "concacaf" },

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
        club: "Real Madrid",
        age: 27,
        bio: "2018 World Cup winner. 2022 Golden Boot with 8 goals. France's all-time danger man chasing second title.",
        image: "assets/players/kylian_mbappe.jpg"
    },
    {
        name: "Lamine Yamal",
        country: "Spain",
        countryCode: "es",
        position: "Winger",
        number: 19,
        club: "Barcelona",
        age: 18,
        bio: "Euro 2024 winner at 17. World's best young player. First World Cup - ready to make history.",
        image: "assets/players/lamine_yamal.jpg"
    },
    {
        name: "Lionel Messi",
        country: "Argentina",
        countryCode: "ar",
        position: "Forward",
        number: 10,
        club: "Inter Miami",
        age: 38,
        bio: "8x Ballon d'Or. 2022 World Cup champion. Possibly his last World Cup. Recovering from hamstring injury.",
        image: "assets/players/lionel_messi.jpg"
    },
    {
        name: "Harry Kane",
        country: "England",
        countryCode: "gb-eng",
        position: "Striker",
        number: 9,
        club: "Bayern Munich",
        age: 32,
        bio: "England's all-time top scorer with 78 goals. 61 goals in 2025-26. Chasing first major trophy.",
        image: "assets/players/harry_kane.jpg"
    },
    {
        name: "Vinícius Jr.",
        country: "Brazil",
        countryCode: "br",
        position: "Winger",
        number: 7,
        club: "Real Madrid",
        age: 25,
        bio: "Brazil's talisman. 2024 Ballon d'Or runner-up. Leading Brazil's quest for 6th World Cup.",
        image: "assets/players/vinicius_junior.jpg"
    },
    {
        name: "Michael Olise",
        country: "France",
        countryCode: "fr",
        position: "Winger",
        number: 7,
        club: "Bayern Munich",
        age: 24,
        bio: "2025-26 Bundesliga Player of Season. 53 goal involvements in 57 matches. France's creative spark.",
        image: "assets/players/michael_olise.jpg"
    },
    {
        name: "Erling Haaland",
        country: "Norway",
        countryCode: "no",
        position: "Striker",
        number: 9,
        club: "Manchester City",
        age: 25,
        bio: "55 goals in 48 Norway matches. First World Cup. Fastest to 100 Premier League goals.",
        image: "assets/players/erling_haaland.jpg"
    },
    {
        name: "Pedri",
        country: "Spain",
        countryCode: "es",
        position: "Midfielder",
        number: 8,
        club: "Barcelona",
        age: 23,
        bio: "Spain's midfield maestro. 12 assists last season. Key to La Roja's title defense.",
        image: "assets/players/pedri.jpg"
    },
    {
        name: "Cristiano Ronaldo",
        country: "Portugal",
        countryCode: "pt",
        position: "Forward",
        number: 7,
        club: "Al-Nassr",
        age: 41,
        bio: "Record 6th World Cup. All-time top international scorer with 143 goals. Still chasing World Cup glory.",
        image: "assets/players/cristiano_ronaldo.jpg"
    },
    {
        name: "Arda Güler",
        country: "Turkey",
        countryCode: "tr",
        position: "Midfielder",
        number: 10,
        club: "Real Madrid",
        age: 21,
        bio: "Turkey's golden boy. Back at World Cup after 24-year absence. Pure magic on the ball.",
        image: "assets/players/arda_guler.jpg"
    },
    {
        name: "Nico Paz",
        country: "Argentina",
        countryCode: "ar",
        position: "Midfielder",
        number: 11,
        club: "Como",
        age: 21,
        bio: "Tipped as Messi's successor. Versatile attacking midfielder. Ready for his first World Cup.",
        image: "assets/players/nico_paz.jpg"
    },
    {
        name: "Christian Pulisic",
        country: "USA",
        countryCode: "us",
        position: "Forward",
        number: 10,
        club: "AC Milan",
        age: 27,
        bio: "USA's talisman. Champions League winner. Leading USMNT on home soil at historic World Cup.",
        image: "assets/players/christian_pulisic.jpg"
    }
];

// Flag CDN base URL
const FLAG_CDN = "https://flagcdn.com/w160";

// ===== News Data =====
let newsData = [];
let filteredNews = [];
let newsToShow = 6;
let currentNewsCategory = 'all';

// ===== Scores Data =====
let scoresData = null;
let currentScoreTab = 'live';

// ===== Standings Data =====
let standingsData = null;
let currentGroup = 'A';

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
    initSchedule();
    initNews();
    initScores();
    initStandings();
    initArchive();
    initVideoHub();
    initScrollAnimations();
    initStreaming();
    
    // Auto-refresh scores every 60 seconds
    setInterval(refreshScores, 60000);

    // Auto-refresh schedule/fixtures every 5 minutes
    setInterval(refreshSchedule, 300000);

    // Auto-refresh standings every 5 minutes
    setInterval(refreshStandings, 300000);
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

// ===== Live Streaming =====
function initStreaming() {
    fetch('data/streaming.json')
        .then(r => r.json())
        .then(data => {
            const btn = document.getElementById('watchLiveBtn');
            if (btn && data.url) {
                btn.href = data.url;
            }
        })
        .catch(() => {});
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
    const countdownEl = document.getElementById('countdown');
    const container = document.querySelector('.countdown-container');
    if (!countdownEl || !container) return;

    function getNextMatch() {
        return fetch('fixtures.json')
            .then(r => r.json())
            .then(data => {
                const now = new Date();
                const matches = (data.fixtures || [])
                    .map(m => {
                        const dt = m.utcDate ? new Date(m.utcDate) : new Date(m.date + 'T' + (m.time || '00:00') + ':00Z');
                        return { ...m, dt };
                    })
                    .filter(m => m.dt > now)
                    .sort((a, b) => a.dt - b.dt);
                return matches[0] || null;
            })
            .catch(() => null);
    }

    function updateCountdown(targetDate, matchLabel) {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            container.innerHTML = '<div class="countdown-label">Match in Progress!</div>';
            clearInterval(intervalId);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (matchLabel) {
            const label = container.querySelector('.countdown-label');
            if (label) label.textContent = matchLabel;
        }
    }

    let intervalId;
    getNextMatch().then(match => {
        if (!match) {
            container.innerHTML = '<div class="countdown-label">Tournament Complete!</div>';
            return;
        }
        const label = 'Next: ' + (match.homeTeam || '') + ' vs ' + (match.awayTeam || '');
        updateCountdown(match.dt, label);
        intervalId = setInterval(() => updateCountdown(match.dt, label), 1000);
    });
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
        const card = document.createElement('a');
        card.className = 'team-card';
        card.href = 'team-profile.html?team=' + encodeURIComponent(team.name);
        card.innerHTML = `
            <img class="team-flag-img" src="${getFlagUrl(team.code)}" alt="${team.name} flag" loading="lazy" onerror="this.src='https://flagcdn.com/w160/un.png'">
            <span class="team-name">${team.name}</span>
        `;
        grid.appendChild(card);
    });
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.team-filters .filter-btn');
    
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
        
        const onErrorHandler = `this.onerror=null;this.parentElement.innerHTML='<div class="player-placeholder">⚽</div>'`;
        
        card.innerHTML = `
            <div class="player-image">
                <img class="player-img" src="${player.image}" alt="${player.name}" onerror="${onErrorHandler}">
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

    updateQuiz();
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Single reveal elements
    document.querySelectorAll('.section-title:not(.reveal), .hero-content:not(.reveal), .hero-badge:not(.reveal), .hero-cta:not(.reveal)').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Stagger grids
    document.querySelectorAll('.teams-grid:not(.reveal-stagger), .scores-content:not(.reveal-stagger), .standings-table:not(.reveal-stagger), .news-grid:not(.reveal-stagger), .fan-zone-grid:not(.reveal-stagger), .cities-grid:not(.reveal-stagger), .quiz-options:not(.reveal-stagger), .poll-options:not(.reveal-stagger)').forEach(el => {
        el.classList.add('reveal', 'reveal-stagger');
        observer.observe(el);
    });

    // Individual cards not yet revealed
    document.querySelectorAll('.team-card:not(.reveal), .score-card:not(.reveal), .player-card:not(.reveal), .city-card:not(.reveal), .fan-card:not(.reveal), .timeline-item:not(.reveal), .schedule-card:not(.reveal), .archive-item:not(.reveal)').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

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
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Active Link on Scroll =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Schedule Section =====
let fixturesData = null;
let currentStage = 'group';
let currentScheduleGroup = 'all';
let currentDateFilter = 'all';

async function initSchedule() {
    try {
        const response = await fetch('fixtures.json');
        if (!response.ok) throw new Error('Failed to load fixtures');
        fixturesData = await response.json();
    } catch (error) {
        console.warn('Fixtures fetch failed, using embedded data:', error.message);
        if (typeof embeddedFixtures !== 'undefined' && typeof embeddedKnockout !== 'undefined') {
            fixturesData = { fixtures: embeddedFixtures, knockoutStage: embeddedKnockout };
        } else {
            const content = document.getElementById('scheduleContent');
            if (content) {
                content.innerHTML = '<p class="no-fixtures">Match schedule will appear here. Run <code>node serve.js</code> and open <a href="http://localhost:3000" target="_blank">localhost:3000</a> to load fixture data.</p>';
            }
            return;
        }
    }
    renderSchedule();
    initScheduleTabs();
    initGroupFilters();
    initDateFilter();
}

async function refreshSchedule() {
    try {
        const response = await fetch('fixtures.json?' + Date.now());
        if (response.ok) {
            fixturesData = await response.json();
            renderSchedule();
        }
    } catch (error) {
        // Silently fail - will retry next interval
    }
}

function initScheduleTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStage = btn.dataset.stage;
            
            const groupFilters = document.getElementById('groupFilters');
            if (groupFilters) {
                groupFilters.style.display = currentStage === 'group' ? 'flex' : 'none';
            }
            
            renderSchedule();
        });
    });
}

function initGroupFilters() {
    document.querySelectorAll('#groupFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#groupFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScheduleGroup = btn.dataset.group;
            renderSchedule();
        });
    });
}

function initDateFilter() {
    const datePicker = document.getElementById('scheduleDate');
    const dateTomorrow = document.getElementById('dateTomorrow');
    const dateThisWeek = document.getElementById('dateThisWeek');
    const dateAll = document.getElementById('dateAll');

    if (datePicker) {
        datePicker.addEventListener('change', () => {
            currentDateFilter = datePicker.value || 'all';
            clearDateQuickBtns();
            renderSchedule();
        });
    }

    if (dateTomorrow) {
        dateTomorrow.addEventListener('click', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateStr = tomorrow.toISOString().split('T')[0];
            if (datePicker) datePicker.value = dateStr;
            currentDateFilter = dateStr;
            clearDateQuickBtns();
            dateTomorrow.classList.add('active');
            renderSchedule();
        });
    }

    if (dateThisWeek) {
        dateThisWeek.addEventListener('click', () => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - dayOfWeek);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const startStr = startOfWeek.toISOString().split('T')[0];
            const endStr = endOfWeek.toISOString().split('T')[0];

            currentDateFilter = { start: startStr, end: endStr };
            if (datePicker) datePicker.value = '';
            clearDateQuickBtns();
            dateThisWeek.classList.add('active');
            renderSchedule();
        });
    }

    if (dateAll) {
        dateAll.addEventListener('click', () => {
            currentDateFilter = 'all';
            if (datePicker) datePicker.value = '';
            clearDateQuickBtns();
            dateAll.classList.add('active');
            renderSchedule();
        });
    }
}

function clearDateQuickBtns() {
    document.querySelectorAll('.date-quick-btn').forEach(b => b.classList.remove('active'));
}

function filterByDate(fixtures) {
    if (currentDateFilter === 'all') return fixtures;

    return fixtures.filter(f => {
        if (typeof currentDateFilter === 'object') {
            return f.date >= currentDateFilter.start && f.date <= currentDateFilter.end;
        }
        return f.date === currentDateFilter;
    });
}

function toSolomonTime(dateStr, timeStr) {
    const dt = new Date(dateStr + 'T' + timeStr + ':00Z');
    return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Pacific/Guadalcanal' }) + ', ' + dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Pacific/Guadalcanal' });
}

function renderSchedule() {
    const content = document.getElementById('scheduleContent');
    if (!content || !fixturesData) return;
    
    if (currentStage === 'group') {
        renderGroupStage(content);
    } else {
        renderKnockoutStage(content);
    }

    setTimeout(initScrollAnimations, 100);
}

function renderGroupStage(container) {
    let fixtures = fixturesData.fixtures.filter(f => f.stage === 'group');
    
    if (currentScheduleGroup !== 'all') {
        fixtures = fixtures.filter(f => f.group === currentScheduleGroup);
    }

    fixtures = filterByDate(fixtures);
    
    if (fixtures.length === 0) {
        container.innerHTML = '<p class="no-fixtures">No matches found for this date.</p>';
        return;
    }
    
    const groupedByMatchday = {};
    fixtures.forEach(f => {
        const key = `matchday-${f.matchday}`;
        if (!groupedByMatchday[key]) groupedByMatchday[key] = [];
        groupedByMatchday[key].push(f);
    });
    
    let html = '';
    
    for (const [matchday, matches] of Object.entries(groupedByMatchday)) {
        const matchdayNum = matchday.split('-')[1];
        html += `<div class="matchday-header">Matchday ${matchdayNum}</div>`;
        
        matches.forEach(match => {
            const date = new Date(match.date);
            const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const isOpener = match.label === 'Opening Match';
            const isHostOpener = match.label === 'Host Nation Opener';
            const solomonTime = toSolomonTime(match.date, match.time);
            const status = match.status || 'timed';
            const isLive = ['in_play','paused','live','1h','2h','ht'].includes(status);
            const isFinished = ['finished','ft','aet','pen'].includes(status);
            const hasScore = match.homeScore != null && match.awayScore != null;
            
            let statusBadge = '';
            if (isLive) statusBadge = `<span class="status-badge live">LIVE</span>`;
            else if (isFinished) statusBadge = `<span class="status-badge finished">FT</span>`;
            
            let scoreDisplay = '';
            if (hasScore) {
                scoreDisplay = `<div class="match-score-inline"><span>${match.homeScore}</span> - <span>${match.awayScore}</span></div>`;
            }
            
            html += `
                <div class="schedule-card ${isOpener ? 'opening' : ''} ${isHostOpener ? 'host-opener' : ''} ${isLive ? 'live-card' : ''} ${isFinished ? 'finished-card' : ''}">
                    <div class="match-group-badge">Group ${match.group}</div>
                    <div class="match-date">${formattedDate} • ${match.time}</div>
                    <div class="match-date-sbt">Solomon Islands: ${solomonTime}</div>
                    <div class="match-teams">
                        <div class="team">
                            <img src="${match.homeFlag}" alt="${match.homeTeam}" class="match-flag" onerror="this.src='https://flagcdn.com/w160/un.png'">
                            <span class="team-name">${match.homeTeam}</span>
                        </div>
                        <div class="match-vs-block">
                            ${scoreDisplay || '<span class="match-vs">VS</span>'}
                            ${statusBadge}
                        </div>
                        <div class="team">
                            <img src="${match.awayFlag}" alt="${match.awayTeam}" class="match-flag" onerror="this.src='https://flagcdn.com/w160/un.png'">
                            <span class="team-name">${match.awayTeam}</span>
                        </div>
                    </div>
                    <div class="match-venue">${match.venue}, ${match.city}</div>
                    ${match.label ? `<div class="match-label">${match.label}</div>` : ''}
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

function renderKnockoutStage(container) {
    const stageData = fixturesData.knockoutStage[currentStage];
    if (!stageData) {
        container.innerHTML = '<p class="no-fixtures">Schedule to be determined after group stage.</p>';
        return;
    }
    
    let html = `<div class="knockout-header">${stageData.name}</div>`;
    
    stageData.matches.forEach(match => {
        const date = new Date(match.date);
        const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const solomonTime = toSolomonTime(match.date, match.time);
        
        html += `
            <div class="schedule-card knockout ${currentStage === 'final' ? 'final-match' : ''}">
                <div class="match-date">${formattedDate} • ${match.time}</div>
                <div class="match-date-sbt">Solomon Islands: ${solomonTime}</div>
                <div class="match-teams">
                    <div class="team tbd-team">
                        <div class="match-flag tbd">TBD</div>
                        <span class="team-name">Winner ${match.label.split(' vs ')[0].replace('Winner ', '')}</span>
                    </div>
                    <span class="match-vs">VS</span>
                    <div class="team tbd-team">
                        <div class="match-flag tbd">TBD</div>
                        <span class="team-name">Winner ${match.label.split(' vs ')[1].replace('Winner ', '')}</span>
                    </div>
                </div>
                <div class="match-venue">${match.venue}, ${match.city}</div>
                <div class="match-label">${match.label}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

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
        
        setTimeout(initScrollAnimations, 100);
        
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

// ===== Scores Section =====
async function initScores() {
    try {
        const response = await fetch('scores.json');
        scoresData = await response.json();
        
        // Update last updated time
        const lastUpdated = document.getElementById('scoresLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(scoresData.lastUpdated).toLocaleString();
        }
        
        renderScores();
        initScoreTabs();
        setTimeout(initScrollAnimations, 100);
    } catch (error) {
        console.log('Scores data not available');
    }
}

function initScoreTabs() {
    document.querySelectorAll('.score-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.score-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentScoreTab = tab.dataset.tab;
            renderScores();
        });
    });
}

function renderScores() {
    const content = document.getElementById('scoresContent');
    if (!content || !scoresData) return;
    
    let matches = [];
    
    switch (currentScoreTab) {
        case 'live':
            matches = scoresData.liveMatches || [];
            break;
        case 'results':
            matches = scoresData.recentResults || [];
            break;
        case 'upcoming':
            matches = scoresData.upcomingMatches || [];
            break;
    }
    
    if (matches.length === 0) {
        content.innerHTML = `<p class="no-scores">No ${currentScoreTab} matches at the moment.</p>`;
        return;
    }
    
    content.innerHTML = matches.map(match => `
        <div class="score-card ${match.status === 'live' ? 'live-match' : ''}">
            <div class="score-status">
                <span class="status-badge ${match.status}">${match.status.toUpperCase()}</span>
                ${match.label ? `<span class="match-label">${match.label}</span>` : ''}
            </div>
            <div class="score-teams">
                <div class="score-team">
                    <img src="https://flagcdn.com/w80/${match.homeCode}.png" alt="${match.homeTeam}" class="score-flag" onerror="this.src='https://flagcdn.com/w80/un.png'">
                    <span class="team-name">${match.homeTeam}</span>
                    <span class="score">${match.homeScore !== null ? match.homeScore : '-'}</span>
                </div>
                <span class="score-vs">VS</span>
                <div class="score-team">
                    <img src="https://flagcdn.com/w80/${match.awayCode}.png" alt="${match.awayTeam}" class="score-flag" onerror="this.src='https://flagcdn.com/w80/un.png'">
                    <span class="team-name">${match.awayTeam}</span>
                    <span class="score">${match.awayScore !== null ? match.awayScore : '-'}</span>
                </div>
            </div>
            <div class="score-venue">${match.venue}, ${match.city}</div>
            <div class="score-date">${match.date} • ${match.time}</div>
            <div class="score-date-sbt">Solomon Islands: ${toSolomonTime(match.date, match.time)}</div>
        </div>
    `).join('');

    setTimeout(initScrollAnimations, 100);
}

async function refreshScores() {
    try {
        const response = await fetch('scores.json?' + Date.now());
        scoresData = await response.json();
        
        const lastUpdated = document.getElementById('scoresLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(scoresData.lastUpdated).toLocaleString();
        }
        
        renderScores();
    } catch (error) {
        console.log('Could not refresh scores');
    }
}

// ===== Standings Section =====
async function initStandings() {
    try {
        const response = await fetch('standings.json');
        standingsData = await response.json();
        
        // Update last updated time
        const lastUpdated = document.getElementById('standingsLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(standingsData.lastUpdated).toLocaleString();
        }
        
        renderStandings();
        initStandingsTabs();
        setTimeout(initScrollAnimations, 100);
    } catch (error) {
        console.log('Standings data not available');
    }
}

function initStandingsTabs() {
    document.querySelectorAll('.standings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.standings-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentGroup = tab.dataset.group;
            renderStandings();
        });
    });
}

function renderStandings() {
    const content = document.getElementById('standingsContent');
    if (!content || !standingsData || !standingsData.groups[currentGroup]) return;
    
    const group = standingsData.groups[currentGroup];
    
    content.innerHTML = `
        <table class="standings-table-inner">
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                ${group.teams.map((team, index) => `
                    <tr class="${index < 2 ? 'qualified' : ''}">
                        <td>${index + 1}</td>
                        <td class="team-cell">
                            <img src="https://flagcdn.com/w40/${team.code}.png" alt="${team.name}" class="standing-flag" onerror="this.src='https://flagcdn.com/w40/un.png'">
                            <span>${team.name}</span>
                        </td>
                        <td>${team.played}</td>
                        <td>${team.won}</td>
                        <td>${team.drawn}</td>
                        <td>${team.lost}</td>
                        <td>${team.gf}</td>
                        <td>${team.ga}</td>
                        <td>${team.gd > 0 ? '+' : ''}${team.gd}</td>
                        <td class="points">${team.points}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    setTimeout(initScrollAnimations, 100);
}

async function refreshStandings() {
    try {
        const response = await fetch('standings.json?' + Date.now());
        standingsData = await response.json();
        
        const lastUpdated = document.getElementById('standingsLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(standingsData.lastUpdated).toLocaleString();
        }
        
        renderStandings();
    } catch (error) {
        // Silently fail
    }
}

// ===== Archive Section =====
let archiveData = null;
let currentArchiveTab = 'archive-news';

async function initArchive() {
    try {
        const response = await fetch('archive/index.json');
        archiveData = await response.json();
        
        // Update archive count
        const archiveCount = document.getElementById('archiveCount');
        if (archiveCount) {
            const totalItems = (archiveData.archiveIndex.news?.length || 0) + 
                             (archiveData.archiveIndex.matches?.length || 0) +
                             (archiveData.archiveIndex.standings?.length || 0);
            archiveCount.textContent = totalItems;
        }
        
        initArchiveTabs();
        loadArchiveContent();
    } catch (error) {
        console.log('Archive data not available');
    }
}

function initArchiveTabs() {
    document.querySelectorAll('.archive-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.archive-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentArchiveTab = tab.dataset.tab;
            loadArchiveContent();
        });
    });
}

async function loadArchiveContent() {
    const content = document.getElementById('archiveContent');
    if (!content) return;
    
    content.innerHTML = '<p class="loading">Loading archive...</p>';
    
    try {
        switch (currentArchiveTab) {
            case 'archive-news':
                await loadNewsArchive(content);
                break;
            case 'archive-matches':
                await loadMatchesArchive(content);
                break;
            case 'archive-standings':
                await loadStandingsArchive(content);
                break;
            case 'archive-daily':
                await loadDailyArchive(content);
                break;
        }
    } catch (error) {
        content.innerHTML = '<p class="no-archive">Error loading archive data.</p>';
    }
}

async function loadNewsArchive(container) {
    try {
        const response = await fetch('archive/index.json');
        const data = await response.json();
        const newsFiles = data.archiveIndex.news || [];
        
        if (newsFiles.length === 0) {
            container.innerHTML = '<p class="no-archive">No news archived yet. News will be archived daily during the tournament.</p>';
            return;
        }
        
        let allNews = [];
        for (const file of newsFiles.slice(-5)) { // Last 5 days
            try {
                const res = await fetch(`archive/news/${file}`);
                const newsData = await res.json();
                allNews = allNews.concat(newsData.articles || []);
            } catch (e) {
                console.log(`Could not load ${file}`);
            }
        }
        
        // Remove duplicates by id
        const uniqueNews = [...new Map(allNews.map(n => [n.id, n])).values()];
        
        container.innerHTML = `
            <div class="archive-list">
                ${uniqueNews.slice(0, 20).map(article => `
                    <article class="archive-item">
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                            <span class="archive-date">${article.date}</span>
                            <span class="archive-title">${article.title}</span>
                            <span class="archive-source">${article.source}</span>
                        </a>
                    </article>
                `).join('')}
            </div>
            <p class="archive-note">Showing latest ${Math.min(20, uniqueNews.length)} archived articles</p>
        `;
    } catch (error) {
        container.innerHTML = '<p class="no-archive">Error loading news archive.</p>';
    }
}

async function loadMatchesArchive(container) {
    try {
        const response = await fetch('archive/index.json');
        const data = await response.json();
        const matchFiles = data.archiveIndex.matches || [];
        
        if (matchFiles.length === 0) {
            container.innerHTML = '<p class="no-archive">No match results archived yet. Results will be archived after each matchday.</p>';
            return;
        }
        
        let allMatches = [];
        for (const file of matchFiles.slice(-3)) { // Last 3 days
            try {
                const res = await fetch(`archive/matches/${file}`);
                const matchData = await res.json();
                allMatches = allMatches.concat(matchData.recentResults || []);
            } catch (e) {
                console.log(`Could not load ${file}`);
            }
        }
        
        if (allMatches.length === 0) {
            container.innerHTML = '<p class="no-archive">No completed matches yet. Check back after June 11!</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="archive-matches">
                ${allMatches.map(match => `
                    <div class="archive-match-card">
                        <div class="match-date">${match.date}</div>
                        <div class="match-teams">
                            <span>${match.homeTeam} ${match.homeScore}</span>
                            <span>vs</span>
                            <span>${match.awayScore} ${match.awayTeam}</span>
                        </div>
                        <div class="match-venue">${match.venue}</div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p class="no-archive">Error loading match archive.</p>';
    }
}

async function loadStandingsArchive(container) {
    try {
        const response = await fetch('archive/index.json');
        const data = await response.json();
        const standingsFiles = data.archiveIndex.standings || [];
        
        if (standingsFiles.length === 0) {
            container.innerHTML = '<p class="no-archive">No standings archived yet. Standings will be archived after each matchday.</p>';
            return;
        }
        
        const latestFile = standingsFiles[standingsFiles.length - 1];
        const res = await fetch(`archive/standings/${latestFile}`);
        const standingsData = await res.json();
        
        container.innerHTML = `
            <div class="archive-standings">
                <p class="archive-date">Standings from: ${latestFile.replace('standings_', '').replace('.json', '')}</p>
                <div class="standings-grid">
                    ${Object.entries(standingsData.groups || {}).map(([group, data]) => `
                        <div class="standings-group">
                            <h4>Group ${group}</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Team</th>
                                        <th>Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${(data.teams || []).map((team, i) => `
                                        <tr>
                                            <td>${i + 1}</td>
                                            <td>${team.name}</td>
                                            <td>${team.points}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p class="no-archive">Error loading standings archive.</p>';
    }
}

async function loadDailyArchive(container) {
    try {
        const response = await fetch('archive/index.json');
        const data = await response.json();
        const dailyFiles = data.archiveIndex.daily || [];
        
        if (dailyFiles.length === 0) {
            container.innerHTML = '<p class="no-archive">No daily summaries yet. Summaries will be created each day during the tournament.</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="archive-daily">
                ${dailyFiles.slice().reverse().map(file => {
                    const date = file.replace('daily_', '').replace('.json', '');
                    return `
                        <div class="daily-item">
                            <h4>${date}</h4>
                            <p><a href="archive/daily/${file}" target="_blank">View full summary</a></p>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p class="no-archive">Error loading daily archive.</p>';
    }
}

// ===== Video Hub Section =====
let videoData = null;
let filteredVideos = [];
let currentVideoCategory = 'all';
let currentMatchday = 'all';
let videoSwiperInstance = null;

async function initVideoHub() {
    try {
        const response = await fetch('data/videos.json');
        if (!response.ok) throw new Error('Failed to fetch');
        videoData = await response.json();
        filteredVideos = sortVideosByLatest([...videoData.videos]);

        const lastUpdated = document.getElementById('videoLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(videoData.lastUpdated).toLocaleString();
        }

        renderFeaturedVideo();
        renderVideoCarousel();
        initVideoSwiper();
        initVideoFilters();
        initMatchdayFilters();
        initVideoSearch();
    } catch (error) {
        console.log('Video fetch failed, using inline data');
        videoData = getInlineVideoData();
        filteredVideos = sortVideosByLatest([...videoData.videos]);

        const lastUpdated = document.getElementById('videoLastUpdated');
        if (lastUpdated) {
            lastUpdated.textContent = new Date(videoData.lastUpdated).toLocaleString();
        }

        renderFeaturedVideo();
        renderVideoCarousel();
        initVideoSwiper();
        initVideoFilters();
        initMatchdayFilters();
        initVideoSearch();
    }
}

function sortVideosByLatest(videos) {
    return videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function applyVideoFilters() {
    let result = [...videoData.videos];

    if (currentVideoCategory !== 'all') {
        result = result.filter(v => v.category === currentVideoCategory);
    }

    if (currentMatchday !== 'all') {
        if (currentMatchday === 'knockout') {
            result = result.filter(v => v.matchday && v.matchday > 3);
        } else {
            result = result.filter(v => v.matchday === parseInt(currentMatchday));
        }
    }

    filteredVideos = sortVideosByLatest(result);
    renderVideoCarousel();
    initVideoSwiper();
}

function getInlineVideoData() {
    return {
        lastUpdated: new Date().toISOString(),
        featured: { match: 'zhEWqfP6V_w', highlight: 'yK3qL3wc7Sc', interview: 'KhqjxoTiOsA' },
        videos: [
            { title: "Brazil vs. Egypt | Full Game Highlights | ESPN FC", videoId: "yK3qL3wc7Sc", channel: "ESPN FC", publishedAt: "2026-06-07", category: "Highlights", team: ["Brazil", "Egypt"], duration: "24:57", views: 2700000 },
            { title: "THE GREATEST FINAL EVER?! | Argentina v France | FIFA World Cup Qatar 2022 Highlights", videoId: "zhEWqfP6V_w", channel: "FIFA", publishedAt: "2022-12-19", category: "Highlights", team: ["Argentina", "France"], duration: "02:07", views: 31000000 },
            { title: "Argentina v France: Full Penalty Shoot-out | 2022 #FIFAWorldCup Final", videoId: "MCWJNOfJoSM", channel: "FIFA", publishedAt: "2023-12-18", category: "Full Match", team: ["Argentina", "France"], duration: "07:39", views: 29800000 },
            { title: "Wild Fightback From Japan Stuns Germany | 2022 FIFA World Cup", videoId: "7AnsXinGmGI", channel: "FIFA", publishedAt: "2026-05-22", category: "Highlights", team: ["Japan", "Germany"], duration: "11:43", views: 147600 },
            { title: "10-Minute Shocker | Korean Comeback Pips Portugal | 2022 FIFA World Cup", videoId: "519WBNsYIgc", channel: "FIFA", publishedAt: "2026-06-03", category: "Highlights", team: ["Korea Republic", "Portugal"], duration: "10:01", views: 104600 },
            { title: "HIGHLIGHTS: Iraq vs Bolivia | FIFA World Cup Play-off Tournament Final", videoId: "6YTxxwzCEp4", channel: "FIFA", publishedAt: "2026-04-01", category: "Highlights", team: ["Iraq", "Bolivia"], duration: "02:00", views: 1800000 }
        ]
    };
}

function renderFeaturedVideo() {
    const player = document.getElementById('featuredPlayer');
    const title = document.getElementById('featuredTitle');
    const channel = document.getElementById('featuredChannel');

    if (!player || !videoData || !videoData.featured) return;

    const featuredId = videoData.featured.match;
    player.innerHTML = `
        <div class="featured-thumbnail" onclick="playFeaturedVideo('${featuredId}')" style="cursor:pointer;width:100%;height:100%;background:url(https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg) center/cover no-repeat;position:relative;">
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(200,16,46,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <div style="width:0;height:0;border-style:solid;border-width:15px 0 15px 28px;border-color:transparent transparent transparent white;margin-left:5px;"></div>
            </div>
        </div>
    `;

    const featuredVideo = videoData.videos.find(v => v.videoId === featuredId);
    if (featuredVideo) {
        title.textContent = featuredVideo.title;
        channel.textContent = featuredVideo.channel;
    }
}

function renderVideoCarousel() {
    const wrapper = document.getElementById('videoWrapper');
    if (!wrapper) return;

    if (filteredVideos.length === 0) {
        wrapper.innerHTML = '<p class="no-videos">No videos found.</p>';
        return;
    }

    wrapper.innerHTML = filteredVideos.map(video => `
        <div class="swiper-slide">
            <div class="video-card" data-category="${video.category}">
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg" alt="${video.title}" loading="lazy">
                    <span class="video-duration">${video.duration}</span>
                    <div class="video-play-btn" onclick="playVideo('${video.videoId}', this)"></div>
                </div>
                <div class="video-info">
                    <span class="video-category-badge">${video.category}</span>
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel-name">${video.channel}</p>
                    <p class="video-date">${formatVideoDate(video.publishedAt)}</p>
                    <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank" rel="noopener noreferrer" class="video-watch-btn">
                        Watch on YouTube
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function formatVideoDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function playVideo(videoId, btn) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

function playFeaturedVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

function initVideoSwiper() {
    if (videoSwiperInstance) {
        videoSwiperInstance.destroy(true, true);
    }

    if (typeof Swiper === 'undefined') {
        console.log('Swiper not loaded, skipping carousel');
        return;
    }

    videoSwiperInstance = new Swiper('#videoSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '#videoNext',
            prevEl: '#videoPrev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 4,
            },
        },
    });
}

function initVideoFilters() {
    const filterBtns = document.querySelectorAll('.video-filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentVideoCategory = btn.dataset.category;
            applyVideoFilters();
        });
    });
}

function initMatchdayFilters() {
    const matchdayBtns = document.querySelectorAll('.matchday-filter-btn');

    matchdayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            matchdayBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMatchday = btn.dataset.matchday;
            applyVideoFilters();
        });
    });
}

function initVideoSearch() {
    const searchInput = document.getElementById('videoSearch');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = searchInput.value.toLowerCase().trim();

            if (!query) {
                applyVideoFilters();
            } else {
                let result = [...videoData.videos];

                if (currentVideoCategory !== 'all') {
                    result = result.filter(v => v.category === currentVideoCategory);
                }
                if (currentMatchday !== 'all') {
                    if (currentMatchday === 'knockout') {
                        result = result.filter(v => v.matchday && v.matchday > 3);
                    } else {
                        result = result.filter(v => v.matchday === parseInt(currentMatchday));
                    }
                }

                filteredVideos = sortVideosByLatest(result.filter(v => {
                    return v.title.toLowerCase().includes(query) ||
                        v.channel.toLowerCase().includes(query) ||
                        v.category.toLowerCase().includes(query) ||
                        (v.team && v.team.some(t => t.toLowerCase().includes(query)));
                }));

                renderVideoCarousel();
                initVideoSwiper();
            }
        }, 300);
    });
}

// IntersectionObserver for video autoplay
function initVideoAutoplay() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.src.includes('youtube')) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                }
            } else {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.src.includes('youtube')) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.featured-video').forEach(el => observer.observe(el));
}
