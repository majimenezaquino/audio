document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioInfo = document.getElementById('audioInfo');

    async function loadAudioByName(audioName) {
        try {
            const response = await fetch('https://raw.githubusercontent.com/majimenezaquino/audio-book/main/list.json');
            const audioList = await response.json();
            const audioData = audioList.find(item => item.name === audioName);

            if (audioData && audioData.url) {
                audio.src = audioData.url;
                audioInfo.textContent = audioData.name; // Mostrar el nombre del audio
                playPauseBtn.textContent = '▶'; // Usar icono Unicode para reproducir
            } else {
                audioInfo.textContent = 'Audio no encontrado';
            }
        } catch (error) {
            console.error('Error fetching audio list:', error);
            audioInfo.textContent = 'Error cargando el audio';
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const audioName = urlParams.get('name');
    if (audioName) {
        loadAudioByName(audioName);
    }

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.textContent = '⏸'; // Usar icono Unicode para pausa
        } else {
            audio.pause();
            this.textContent = '▶'; // Usar icono Unicode para reproducir
        }
    });
});
