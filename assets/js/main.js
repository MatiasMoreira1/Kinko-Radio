import { playlist } from './playlist.js';
import { ads } from './ads.js';

const playButton = document.getElementById('play');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art'); 
const nextButton = document.getElementById('next');
const statusText = document.querySelector('.kinkoRadio p');
const spans = statusText.querySelectorAll('span');
const albumArtElement = document.querySelector('.song-image'); 

const silence = document.getElementById("silence");

let isPlaying = false;
let currentSongIndex = 0;
let songCounter = 0; 
let isAdPlaying = false; 



// Seleccionar una canción aleatoria al cargar la página
currentSongIndex = Math.floor(Math.random() * playlist.length);

// Función para cargar una canción o un anuncio
function loadMedia(media) {
    audio.src = media.src;
    songTitle.textContent = media.title;
    songArtist.textContent = media.artist || 'Publicidad';
    albumArt.src = media.albumArt;
}

playButton.addEventListener('click', function() {
    if (audio.paused) { 
        // Si el audio está en pausa, reproducirlo
        audio.play().then(() => {
            console.log('Reproduciendo la canción');
            playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            albumArtElement.classList.add('spin'); 
            changeStatusColor();
            isPlaying = true; // Cambiar estado
        })//).catch((error) => {
        //     console.error('Error al intentar reproducir el audio:', error);
        // })
        ;
    } else {
        // Si el audio está reproduciéndose, pausarlo
        console.log('Pausando la canción');
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        albumArtElement.classList.remove('spin'); 
        changeStatusColorWhite();
        isPlaying = false; // Cambiar estado
    }
});

// Función para barajar el playlist usando el algoritmo de Fisher-Yates
function shufflePlaylist(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
}

// Barajar la lista de reproducción al inicio
shufflePlaylist(playlist);

// Función para cargar la siguiente canción o anuncio
function playNext() {
    if (isAdPlaying) {
        // Si se está reproduciendo un anuncio, volver a la canción
        isAdPlaying = false;
        loadMedia(playlist[currentSongIndex]); // Cargar la siguiente canción
    } else {
        songCounter++;
        currentSongIndex++;

        // Si hemos llegado al final del playlist, barajar de nuevo
        if (currentSongIndex >= playlist.length) {
            shufflePlaylist(playlist);
            currentSongIndex = 0; // Reiniciar el índice
        }

        // Reproducir anuncio si corresponde
        if (songCounter % 3 === 0) {
            const adIndex = Math.floor(Math.random() * ads.length); // Selecciona un anuncio al azar
            loadMedia(ads[adIndex]);
            isAdPlaying = true; // Marcar que un anuncio está en reproducción
        } else {
            loadMedia(playlist[currentSongIndex]); // Reproducir la siguiente canción
        }
    }

    clearInterval(colorInterval);
    changeStatusColor();

    // Reproducir el siguiente audio (anuncio o canción)
    audio.play().catch((error) => {
        console.error('Error al reproducir el audio:', error);
    });
}

// Seleccionar la primera canción de la lista barajada
currentSongIndex = 0;
loadMedia(playlist[currentSongIndex]);

function playNextAndMore(){
    playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    playNext()
}
nextButton.addEventListener('click', playNextAndMore);

audio.addEventListener('ended', function() {
    if (isAdPlaying) {
        isAdPlaying = false;
        loadMedia(playlist[currentSongIndex]);
        audio.play();
    } else {
        playNext();
    }
});

function changeStatusColor() {
    const colors = ['text-green-600', 'text-red-600', 'text-orange-600'];
    let colorIndex = colors.length - 1; 

    colorInterval = setInterval(() => { 
        spans.forEach((span, i) => {
            span.className = colors[(colorIndex + i) % colors.length];
        });
        colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    }, 400); 
}

// changeStatusColor();

function changeStatusColorWhite() {
    // spans.forEach((span) => {
    //     span.className = '';
    // });

    clearInterval(colorInterval); 
}


// setVolume(0.5)