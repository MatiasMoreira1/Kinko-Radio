const playButton = document.getElementById('play');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art'); 
const nextButton = document.getElementById('next');
const statusText = document.querySelector('.kinkoRadio p');
const spans = statusText.querySelectorAll('span');

let isPlaying = false;
let currentSongIndex = 0;
let songCounter = 0; // Contador para las canciones reproducidas
let isAdPlaying = false; // Indicador si el anuncio está en reproducción

// Lista de canciones
const playlist = [
    {
        title: 'Somos El Show',
        artist: 'Ramma, Ara',
        src: 'assets/media/audio/somosElShow.mp3',
        albumArt: 'assets/media/portadas/somosElShow.jpg'
    },
    {
        title: 'ASQUEROSO',
        artist: 'Tiago PZK, ZECCA',
        src: 'assets/media/audio/asqueroso.mp3',
        albumArt: 'assets/media/portadas/asqueroso.jpg'
    },
    {
        title: 'Ayer Me Llamo Mi Ex',
        artist: 'KHEA, Lenny Santos',
        src: 'assets/media/audio/AMLME.mp3',
        albumArt: 'assets/media/portadas/AMLME.jpg'
    },
    {
        title: 'Sigues Con El',
        artist: 'Arcangel, Sech',
        src: 'assets/media/audio/siguesConEl.mp3',
        albumArt: 'assets/media/portadas/siguesConEl.jpg'
    },
    {
        title: '3 PECADOS DESPUES',
        artist: 'Milo J',
        src: 'assets/media/audio/3pecados.mp3',
        albumArt: 'assets/media/portadas/3pecados.jpg'
    },
    {
        title: 'Hola - Remix',
        artist: 'Dalex, Lenny Tavarez y mas.',
        src: 'assets/media/audio/holarmx.mp3',
        albumArt: 'assets/media/portadas/holarmx.jpg'
    },
    {
        title: 'Drama',
        artist: 'Valuto, Fefo',
        src: 'assets/media/audio/drama.mp3',
        albumArt: 'assets/media/portadas/drama.jpg'
    },
    {
        title: 'A Mi',
        artist: 'Rels B',
        src: 'assets/media/audio/aMirb.mp3',
        albumArt: 'assets/media/portadas/aMirb.jpg'
    },
    {
        title: 'Ahora dice',
        artist: 'J Balvin, Ozuna, Bad Bunny',
        src: 'assets/media/audio/ahoraDice.mp3',
        albumArt: 'assets/media/portadas/ahoraDice.jpg'
    },
    {
        title: 'CAMAVINGA',
        artist: 'Sautu, ELLI THE KID',
        src: 'assets/media/audio/camavinga.mp3',
        albumArt: 'assets/media/portadas/camavinga.jpg'
    }

    // Puedes agregar más canciones aquí
];

// Lista de anuncios
const ads = [
    {
        title: 'Kinko',
        src: 'assets/media/ads/almacenesKinko.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    }
    // {
    //     title: 'Publicidad 2',
    //     src: 'assets/media/ads/anuncio2.mp3',
    //     albumArt: 'assets/media/ads/ad2.jpg'
    // }
    // Puedes agregar más anuncios aquí
];

// Seleccionar una canción aleatoria al cargar la página
currentSongIndex = Math.floor(Math.random() * playlist.length);

// Función para cargar una canción o un anuncio
function loadMedia(media) {
    audio.src = media.src;
    songTitle.textContent = media.title;
    songArtist.textContent = media.artist || 'Publicidad';
    albumArt.src = media.albumArt;
}

// Reproduce/pausa la canción o anuncio
playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Cargar la primera canción al inicio
loadMedia(playlist[currentSongIndex]);

// Cuando termina la canción o anuncio, carga el siguiente
audio.addEventListener('ended', function() {
    if (isAdPlaying) {
        // Si un anuncio ha terminado, vuelve a las canciones
        isAdPlaying = false;
        loadMedia(playlist[currentSongIndex]);
        audio.play();
    } else {
        // Incrementa el contador de canciones
        songCounter++;
        currentSongIndex = (currentSongIndex + 1) % playlist.length;

        // Cada 3 canciones, reproduce un anuncio
        if (songCounter % 3 === 0) {
            const adIndex = Math.floor(Math.random() * ads.length); // Selecciona un anuncio al azar
            isAdPlaying = true;
            loadMedia(ads[adIndex]);
            audio.play();
        } else {
            loadMedia(playlist[currentSongIndex]);
            audio.play();
        }
    }
});

// Función para cargar la siguiente canción o anuncio
function playNext() {
    if (isAdPlaying) {
        // Si estamos en un anuncio, detener y volver a la lista de canciones
        isAdPlaying = false;
    }
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    songCounter++;
    
    // Reproducir anuncio si corresponde
    if (songCounter % 3 === 0) {
        const adIndex = Math.floor(Math.random() * ads.length); // Selecciona un anuncio al azar
        loadMedia(ads[adIndex]);
    } else {
        loadMedia(playlist[currentSongIndex]);
    }
    audio.play();
}

// Manejo del botón "Siguiente"
nextButton.addEventListener('click', function() {
    playNext();
});

// Modificar el evento 'ended' para evitar repetición del botón "Siguiente" si se está en un anuncio
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
    let colorIndex = colors.length - 1; // Comienza desde el último color

    setInterval(() => {
        spans.forEach((span, i) => {
            // Alterna los colores en cada span siguiendo el patrón en la dirección opuesta
            span.className = colors[(colorIndex + i) % colors.length];
        });
        colorIndex = (colorIndex - 1 + colors.length) % colors.length; // Mueve hacia atrás en el patrón
    }, 400); // Cambia cada 1 segundo (1000 ms)
}

changeStatusColor();
