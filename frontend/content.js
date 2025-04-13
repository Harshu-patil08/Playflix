document.addEventListener('DOMContentLoaded', function() {
    const contentData = {
        popular: [
            { 
                id: 1, 
                title: 'Lion King', 
                image: 'lion.jpg',
                videoUrl: 'Lion.mp4',
                description: 'Lion King.'
            },
            { 
                id: 2, 
                title: 'Stranger Things', 
                image: 'ST.jpg',
                videoUrl: 'st.mp4',
                description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
            },
            { 
                id: 4, 
                title: 'The Crown', 
                image: 'thecrown.jpg',
                videoUrl: 'thecrown.mp4',
                description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.'
            }
        ],
        trending: [
            { 
                id: 5, 
                title: 'Money Heist', 
                image: 'moneyh.jpg',
                videoUrl: 'Moneyh.mp4',
                description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
            }
        ],
        continue: [
            { 
                id: 6, 
                title: 'The Witcher', 
                image: 'thewitcher.jpg',
                videoUrl: 'thewitcher.mp4',
                description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.'
            }
        ]
    };

    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');
    const featuredPlayButton = document.getElementById('featuredPlayButton');
    const featuredBackgroundVideo = document.getElementById('featuredBackgroundVideo');

    // Autoplay background featured video
    const featuredContent = contentData.popular[0]; // First item
    featuredBackgroundVideo.src = featuredContent.videoUrl;
    featuredBackgroundVideo.poster = featuredContent.image;

    // Update title/description dynamically if needed
    document.querySelector('.featured-title').textContent = featuredContent.title;
    document.querySelector('.featured-description').textContent = featuredContent.description;

    // Create content cards
    function createContentCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.dataset.id = item.id;
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <button class="play-button" data-id="${item.id}">
                <i class="fas fa-play"></i>
            </button>
        `;
        return card;
    }

    // Open modal with selected video
    function openVideoPlayer(contentItem) {
        videoPlayer.src = contentItem.videoUrl;
        videoTitle.textContent = contentItem.title;
        videoDescription.textContent = contentItem.description;
        videoModal.style.display = 'flex';
        videoPlayer.play();
    }

    function findContentById(id) {
        for (const category in contentData) {
            const found = contentData[category].find(item => item.id == id);
            if (found) return found;
        }
        return null;
    }

    closeModal.addEventListener('click', () => {
        videoPlayer.pause();
        videoModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoPlayer.pause();
            videoModal.style.display = 'none';
        }
    });

    featuredPlayButton.addEventListener('click', () => {
        openVideoPlayer(featuredContent);
    });

    document.addEventListener('click', function(event) {
        if (event.target.closest('.play-button')) {
            const button = event.target.closest('.play-button');
            const contentId = button.dataset.id;
            const contentItem = findContentById(contentId);
            if (contentItem) {
                openVideoPlayer(contentItem);
            }
        }
    });

    document.addEventListener('keydown', function(event) {
        if (videoModal.style.display === 'flex') {
            if (event.key === 'Escape') {
                videoPlayer.pause();
                videoModal.style.display = 'none';
            }
            if (event.key === ' ') {
                event.preventDefault();
                if (videoPlayer.paused) videoPlayer.play();
                else videoPlayer.pause();
            }
        }
    });

    function populateRow(rowId, items) {
        const row = document.getElementById(rowId);
        items.forEach(item => {
            row.appendChild(createContentCard(item));
        });
    }

    populateRow('popular-row', contentData.popular);
    populateRow('trending-row', contentData.trending);
    populateRow('continue-row', contentData.continue);
});