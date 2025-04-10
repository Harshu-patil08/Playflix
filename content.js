document.addEventListener('DOMContentLoaded', function() {
    // Sample content data with video URLs
    const contentData = {
        popular: [
            { 
                id: 1, 
                title: 'Stranger Things', 
                image: 'ST.jpg',
                videoUrl: 'st.mp4',
                description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
            },
            { 
                id: 2, 
                title: 'The Crown', 
                image: 'thecrown.jpg',
                videoUrl: 'thecrown.mp4',
                description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.'
            }
        ],
        trending: [
            { 
                id: 3, 
                title: 'Money Heist', 
                image: 'moneyh.jpg',
                videoUrl: 'Moneyh.mp4',
                description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
            }
        ],
        continue: [
            { 
                id: 4, 
                title: 'The Witcher', 
                image: 'thewitcher.jpg',
                videoUrl: 'thewitcher.mp4',
                description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.'
            }
        ]
    };

    // DOM Elements
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const closeModal = document.querySelector('.close-modal');
    const featuredPlayButton = document.getElementById('featuredPlayButton');

    // Function to create content cards
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

    // Function to open video player
    function openVideoPlayer(contentItem) {
        videoPlayer.src = contentItem.videoUrl;
        videoTitle.textContent = contentItem.title;
        videoDescription.textContent = contentItem.description;
        videoModal.style.display = 'block';
        videoPlayer.play();
        
        // Hide controls after 3 seconds of inactivity
        let timeout;
        function hideControls() {
            videoPlayer.controls = false;
        }
        
        videoPlayer.controls = true;
        clearTimeout(timeout);
        timeout = setTimeout(hideControls, 3000);
        
        videoPlayer.addEventListener('mousemove', function() {
            videoPlayer.controls = true;
            clearTimeout(timeout);
            timeout = setTimeout(hideControls, 3000);
        });
    }

    // Function to find content by ID
    function findContentById(id) {
        for (const category in contentData) {
            const found = contentData[category].find(item => item.id == id);
            if (found) return found;
        }
        return null;
    }

    // Event listeners
    closeModal.addEventListener('click', function() {
        videoPlayer.pause();
        videoModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoPlayer.pause();
            videoModal.style.display = 'none';
        }
    });

    // Play featured content
    featuredPlayButton.addEventListener('click', function() {
        const featuredContent = contentData.popular[0]; // First popular item as featured
        openVideoPlayer(featuredContent);
    });

    // Event delegation for content card play buttons
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

    // Keyboard controls for video player
    document.addEventListener('keydown', function(event) {
        if (videoModal.style.display === 'block') {
            if (event.key === 'Escape') {
                videoPlayer.pause();
                videoModal.style.display = 'none';
            }
            if (event.key === ' ') { // Space bar to play/pause
                event.preventDefault();
                if (videoPlayer.paused) {
                    videoPlayer.play();
                } else {
                    videoPlayer.pause();
                }
            }
        }
    });

    // Populate content rows
    function populateRow(rowId, items) {
        const row = document.getElementById(rowId);
        items.forEach(item => {
            row.appendChild(createContentCard(item));
        });
    }

    // Initialize the content
    populateRow('popular-row', contentData.popular);
    populateRow('trending-row', contentData.trending);
    populateRow('continue-row', contentData.continue);
});