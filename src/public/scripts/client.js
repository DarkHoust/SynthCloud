document.addEventListener('DOMContentLoaded', () => {
    const musicItems = document.querySelectorAll('.music-item');
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const currentDuration = document.getElementById('currentDuration');
    const maxDuration = document.getElementById('maxDuration');
    const musicData = document.getElementById('music-data');

    let currentMusicIndex = 0;

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

    playButton.addEventListener('click', () => {
        // Check if the audio source is empty
        if (!audio.src || audio.src === '') {
            const firstMusicUrl = document.querySelector('.music-item').dataset.src;
            audio.src = firstMusicUrl;
        }

        if (audio.paused) {
            audio.play();
            updatePlayButtonIcon(true);
        } else {
            audio.pause();
            updatePlayButtonIcon(false);
        }
    });

    function updatePlayButtonIcon(isPlaying) {
        playButton.innerHTML = isPlaying ? '<i class="material-icons pt-1">pause</i>' : '<i class="material-icons">play_arrow</i>';
    }

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentDuration.textContent = formatTime(audio.currentTime);
        maxDuration.textContent = formatTime(audio.duration);
    });

    nextButton.addEventListener('click', () => {
        currentMusicIndex = (currentMusicIndex + 1) % musicItems.length;
        const nextMusicSrc = musicItems[currentMusicIndex].getAttribute('data-src');
        audio.src = nextMusicSrc;
        audio.play();
        updatePlayerDisplay();
    });

    previousButton.addEventListener('click', () => {
        currentMusicIndex = (currentMusicIndex - 1 + musicItems.length) % musicItems.length;
        const previousMusicSrc = musicItems[currentMusicIndex].getAttribute('data-src');
        audio.src = previousMusicSrc;
        audio.play();
        updatePlayerDisplay();
    });

    function updatePlayerDisplay() {
        const currentMusic = musicItems[currentMusicIndex].dataset;
        musicData.innerText = `${currentMusic.artist} - ${currentMusic.songName}`;
    }
});
