// Video content database using your local files
const contentDatabase = {
    popular: [
        { 
            id: 1, 
            title: "Venom English", 
            language: "en", 
            videoFile: "videos/Eng_Venom.mp4",
            thumbnail: "images/vt.jpg",
            year: 2022,
            rating: 8.5,
            genres: ["Action"],
            description: "Still on the run, journalist Eddie Brock and his alien companion Venom dodge threats from a vigilant military leader and ruthless invading symbiotes.",
            type: "Trailer",
            duration: "45 min"
        },
        { 
            id: 2, 
            title: "Venom Hindi", 
            language: "hi", 
            videoFile: "videos/Hindi_Venom.mp4",
            thumbnail: "images/vt.jpg",
            year: 2021,
            rating: 8.2,
            genres: ["Adventure Movie"],
            description: "Still on the run, journalist Eddie Brock and his alien companion Venom dodge threats from a vigilant military leader and ruthless invading symbiotes.",
            type: "Trailer",
            duration: "32 min"
        },
        { 
            id: 3, 
            title: "Venom Japanese", 
            language: "ja", 
            videoFile: "videos/Japanese_Venom.mp4",
            thumbnail: "images/vt.jpg",
            year: 2023,
            rating: 9.1,
            genres: ["Thriller"],
            description: "Still on the run, journalist Eddie Brock and his alien companion Venom dodge threats from a vigilant military leader and ruthless invading symbiotes.",
            type: "Trailer",
            duration: "1 hr 15 min"
        }
    ],
    trending: [
        { 
            id: 4, 
            title: "Juna Furniture", 
            language: "ma", 
            videoFile: "videos/Juna furniture.mp4",
            thumbnail: "images/Juna_furniture.avif",
            year: 2023,
            rating: 8.7,
            genres: ["Travel", "City"],
            description: "Walking tour through the beautiful streets of Paris with local guide.",
            type: "Travel",
            duration: "28 min"
        },
        {
            id: 5, 
            title: "Jailer", 
            language: "hi", 
            videoFile: "videos/Jailer_Hindi.mp4",
            thumbnail: "images/Jailer.jpg",
            year: 2023,
            rating: 9.5,
            genres: ["Action"],
            description: "Tiger Muthuvel Pandian, a retired jailer, is now a family man who leads an ordinary life. Trouble knocks on his door when his son, a diligent cop, investigates an idol smuggling mafia. And forces Muthuvel Pandian to step back into the dark world of his past.",
            type: "Trailer",
            duration: "15 min"
        },
        {
            id: 6, 
            title: "Jailer", 
            language: "ka", 
            videoFile: "videos/Jailer_Kannada.mp4",
            thumbnail: "images/Jailer.jpg",
            year: 2023,
            rating: 7.5,
            genres: ["Comedy"],
            description: "Tiger Muthuvel Pandian, a retired jailer, is now a family man who leads an ordinary life. Trouble knocks on his door when his son, a diligent cop, investigates an idol smuggling mafia. And forces Muthuvel Pandian to step back into the dark world of his past.",
            type: "Trailer",
            duration: "15 min"
        },
        {
            id: 7, 
            title: "Jailer", 
            language: "te", 
            videoFile: "videos/Jailer_Telugu.mp4",
            thumbnail: "images/Jailer.jpg",
            year: 2023,
            rating: 8.5,
            genres: ["Action"],
            description: "Tiger Muthuvel Pandian, a retired jailer, is now a family man who leads an ordinary life. Trouble knocks on his door when his son, a diligent cop, investigates an idol smuggling mafia. And forces Muthuvel Pandian to step back into the dark world of his past.",
            type: "Trailer",
            duration: "15 min"
        }
    ],
};

// DOM elements
const popularContent = document.getElementById('popular-content');
const trendingContent = document.getElementById('trending-content');
const MorereasonstojoinContent = document.getElementById('morereasonstojoin-content');
const culturalContent = document.getElementById('cultural-content'); // Might be null if not present in HTML
const modal = document.getElementById('content-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');
const languageOptions = document.querySelectorAll('.language-dropdown-content div');
const languageBtn = document.querySelector('.language-btn');

let currentLanguage = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderAllContent();
    setupLanguageSelection();
    setupModal();
});

function renderAllContent() {
    renderContentSection(popularContent, contentDatabase.popular);
    renderContentSection(trendingContent, contentDatabase.trending);
    // Only render culturalContent if it exists
    if (culturalContent) {
        renderContentSection(culturalContent, contentDatabase.cultural || []);
    }
}

function renderContentSection(container, content) {
    container.innerHTML = '';
    const filteredContent = currentLanguage === 'all' 
        ? content 
        : content.filter(item => item.language === currentLanguage);

    if (filteredContent.length === 0) {
        container.innerHTML = '<p class="no-content">No content available in the selected language.</p>';
        return;
    }

    filteredContent.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="content-info">
                <h3>${item.title}</h3>
                <p>${getLanguageName(item.language)} • ${item.year}</p>
            </div>
        `;

        contentItem.addEventListener('click', () => showContentDetails(item));
        container.appendChild(contentItem);
    });
}

function showContentDetails(content) {
    modalBody.innerHTML = `
        <div class="video-container">
            <video controls poster="${content.thumbnail}" class="modal-video">
                <source src="${content.videoFile}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="video-details">
            <h1 class="modal-title">${content.title}</h1>
            <div class="modal-meta">
                <span class="modal-rating">${content.rating}/10</span>
                <span class="modal-year">${content.year}</span>
                <span class="modal-language">${getLanguageName(content.language)}</span>
                <span class="modal-duration">${content.duration}</span>
            </div>
            <div class="modal-genres">
                ${content.genres.map(genre => `<span class="modal-genre">${genre}</span>`).join('')}
            </div>
            <p class="modal-description">${content.description}</p>
            <div class="modal-actions">
                <button class="modal-play-btn" onclick="playVideo('${content.videoFile}')">
                    <i class="fas fa-play"></i> Play
                </button>
                <button class="modal-add-btn">
                    <i class="fas fa-plus"></i> My List
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function playVideo(videoSrc) {
    const videoPlayer = document.createElement('video');
    videoPlayer.src = videoSrc;
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.style.width = '100%';

    const videoModal = document.createElement('div');
    videoModal.className = 'video-fullscreen-modal';
    videoModal.innerHTML = '<span class="close-video">&times;</span>';
    videoModal.appendChild(videoPlayer);
    document.body.appendChild(videoModal);

    const closeVideoBtn = videoModal.querySelector('.close-video');
    closeVideoBtn.addEventListener('click', () => {
        videoPlayer.pause();
        document.body.removeChild(videoModal);
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoPlayer.pause();
            document.body.removeChild(videoModal);
        }
    });
}

function setupModal() {
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function setupLanguageSelection() {
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            currentLanguage = lang;

            languageBtn.innerHTML = lang === 'all' 
                ? 'All Languages <img src="Playflix-img/images/down-icon.png">' 
                : `${getLanguageName(lang)} <img src="Playflix-img/images/down-icon.png">`;

            renderAllContent();
        });
    });
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'Hindi',
        'ma': 'Marathi',
        'te': 'Telugu',
        'ja': 'Japanese',
        'ka': 'Kannada',
    };
    return languages[code] || code;
}
