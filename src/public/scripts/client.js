document.addEventListener('DOMContentLoaded', () => {
    const musicItems = document.querySelectorAll('.music-item');
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const currentDuration = document.getElementById('currentDuration');
    const maxDuration = document.getElementById('maxDuration');
    const musicData = document.getElementById('music-data');

    let currentMusicIndex = 0;
    let isSeeking = false;

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Pop up music's div when hovered
    musicItems.forEach(function (musicItem) {
        musicItem.addEventListener('mouseenter', function () {
            const playButton = musicItem.querySelector('.play-button');
            if (playButton) {
                playButton.style.display = 'block';
            }
        });

        musicItem.addEventListener('mouseleave', function () {
            const playButton = musicItem.querySelector('.play-button');
            if (playButton) {
                playButton.style.display = 'none';
            }
        });
    });

    // Play the music when a music item is clicked
    musicItems.forEach((musicItem, index) => {
        musicItem.addEventListener('click', () => {
            currentMusicIndex = index;
            const musicSrc = musicItem.getAttribute('data-src');
            audio.src = musicSrc;
            audio.play();
            updatePlayButtonIcon(true);
            updatePlayerDisplay();
        });
    });

    function updatePlayerDisplay() {
        const currentMusic = musicItems[currentMusicIndex];
        musicData.textContent = `${currentMusic.dataset.artist} - ${currentMusic.dataset.songname}`;
    }

    // Play button function
    playButton.addEventListener('click', () => {
        // Check if the audio source is empty
        if (!audio.src || audio.src === '') {
            const firstMusicUrl = document.querySelector('.music-item').dataset.src;
            audio.src = firstMusicUrl;
            updatePlayerDisplay()
        }

        if (audio.paused) {
            audio.play();
            updatePlayButtonIcon(true);
        } else {
            audio.pause();
            updatePlayButtonIcon(false);
        }
    });

    // Pause and play icon toggle function
    function updatePlayButtonIcon(isPlaying) {
        playButton.innerHTML = isPlaying ? '<i class="material-icons pt-1">pause</i>' : '<i class="material-icons pt-1">play_arrow</i>';
    }

    // Skip forward by 5 seconds 
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            if (audio.duration - audio.currentTime >= 5) {
                audio.currentTime += 5;
            } else {
                audio.currentTime = audio.duration;
            }
            updateProgressBar();
        }
    });

    // Skip backward by 5 seconds
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            if (audio.currentTime >= 5) {
                audio.currentTime -= 5;
            } else {
                audio.currentTime = 0;
            }
            updateProgressBar();
        }
    });

    // Toggle play/pause when spacebar is pressed
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            if (!audio.src || audio.src === '') {
                const firstMusicUrl = document.querySelector('.music-item').dataset.src;
                audio.src = firstMusicUrl;
                updatePlayerDisplay();
            }

            if (audio.paused) {
                audio.play();
                updatePlayButtonIcon(true);
            } else {
                audio.pause();
                updatePlayButtonIcon(false);
            }
        }
    });

    // Progress bar
    audio.addEventListener('timeupdate', () => {
        if (!isSeeking) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            currentDuration.textContent = formatTime(audio.currentTime);
            maxDuration.textContent = formatTime(audio.duration);
        }
    });

    // Check if music has ended and play the next one
    audio.addEventListener('ended', () => {
        currentMusicIndex = (currentMusicIndex + 1) % musicItems.length;
        const nextMusicSrc = musicItems[currentMusicIndex].getAttribute('data-src');
        audio.src = nextMusicSrc;
        audio.play();
        updatePlayerDisplay();
        updateModalContent(nextMusicItem);
    });

    // Next music function
    nextButton.addEventListener('click', () => {
        currentMusicIndex = (currentMusicIndex + 1) % musicItems.length;
        const nextMusicSrc = musicItems[currentMusicIndex].getAttribute('data-src');
        audio.src = nextMusicSrc;
        audio.play();
        updatePlayerDisplay();
    });

    // Previous music function
    previousButton.addEventListener('click', () => {
        currentMusicIndex = (currentMusicIndex - 1 + musicItems.length) % musicItems.length;
        const previousMusicSrc = musicItems[currentMusicIndex].getAttribute('data-src');
        audio.src = previousMusicSrc;
        audio.play();
        updatePlayerDisplay();
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeModal');
    const infoButton = document.getElementById('infoButton');
    let isModalOpen = false;

    infoButton.addEventListener('click', () => {
        if (isModalOpen) {
            closeModal();
        } else {
            const currentMusicItem = musicItems[currentMusicIndex];
            
            const modalTitle = document.getElementById('modalTitle');
            const modalArtist = document.getElementById('modalArtist');
            const modalDescription = document.getElementById('modalDescription');
        
            if (preferredLanguage === 'english') {
                modalTitle.textContent = currentMusicItem.dataset.songname;
                modalArtist.textContent = `By ${currentMusicItem.dataset.artist}`;
                modalDescription.textContent = currentMusicItem.dataset.description;
            } else if (preferredLanguage === 'russian') {
                // modalTitle.textContent = currentMusicItem.dataset.russianSongname;
                // modalArtist.textContent = `От ${currentMusicItem.dataset.russianArtist}`;
                // modalDescription.textContent = currentMusicItem.dataset.russianDescription;
                modalTitle.textContent = currentMusicItem.dataset.songname;
                modalArtist.textContent = `От ${currentMusicItem.dataset.artist}`;
                modalDescription.textContent = currentMusicItem.dataset.description;
            }
        
            // Show modal
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            isModalOpen = true;
        }
    });

    // Function to update modal content
    function updateModalContent(musicItem) {
        const modalTitle = document.getElementById('modalTitle');
        const modalArtist = document.getElementById('modalArtist');
        const modalDescription = document.getElementById('modalDescription');

        if (preferredLanguage === 'english') {
            modalTitle.textContent = currentMusicItem.dataset.songname;
            modalArtist.textContent = `By ${currentMusicItem.dataset.artist}`;
            modalDescription.textContent = currentMusicItem.dataset.description;
        } else if (preferredLanguage === 'russian') {
            // modalTitle.textContent = currentMusicItem.dataset.russianSongname;
            // modalArtist.textContent = `От ${currentMusicItem.dataset.russianArtist}`;
            // modalDescription.textContent = currentMusicItem.dataset.russianDescription;
            modalTitle.textContent = currentMusicItem.dataset.songname;
            modalArtist.textContent = `От ${currentMusicItem.dataset.artist}`;
            modalDescription.textContent = currentMusicItem.dataset.description;
        }
    }

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        isModalOpen = false; // Update modal state
    }
});
