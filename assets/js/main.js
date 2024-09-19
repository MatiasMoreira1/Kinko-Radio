const playButton = document.getElementById('play');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art'); 
const nextButton = document.getElementById('next');
const statusText = document.querySelector('.kinkoRadio p');
const spans = statusText.querySelectorAll('span');
const albumArtElement = document.querySelector('.song-image'); 


let isPlaying = false;
let currentSongIndex = 0;
let songCounter = 0; 
let isAdPlaying = false; 

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
    },
    // Puedes agregar más canciones aquí
    // Nuevas Canciones
    {
        title: 'Mal Hablado RMX',
        artist: 'Joaquin Da Rosa, CLOUD, ElVecino',
        src: 'assets/media/audio/malhablado.mp3',
        albumArt: 'assets/media/portadas/malhablado.jpg'
    },
    {
        title: 'Salio el sol',
        artist: 'Don Omar',
        src: 'assets/media/audio/elSol.mp3',
        albumArt: 'assets/media/portadas/elSol.jpg'
    },
    {
        title: 'Al Vacio',
        artist: 'No Te Va Gustar',
        src: 'assets/media/audio/alVacio.mp3',
        albumArt: 'assets/media/portadas/alVacio.jpg'
    },
    {
        title: 'Givenchy',
        artist: 'Duki',
        src: 'assets/media/audio/givenchy.mp3',
        albumArt: 'assets/media/portadas/givenchy.jpg'
    },
    {
        title: 'Mi Nena Facebook',
        artist: 'Los Nota Lokos',
        src: 'assets/media/audio/nenaFB.mp3',
        albumArt: 'assets/media/portadas/nenaFB.jpg'
    },
    {
        title: 'Es La Que Va',
        artist: 'Los Nota Lokos',
        src: 'assets/media/audio/laQueVa.mp3',
        albumArt: 'assets/media/portadas/laQueVa.jpg'
    },
    {
        title: 'BZRP SESSION #48',
        artist: 'bzrp, Tiago PZK',
        src: 'assets/media/audio/48.mp3',
        albumArt: 'assets/media/portadas/48.jpg'
    },
    {
        title: 'Doctor',
        artist: 'Luck Ra, Nicki Nicole',
        src: 'assets/media/audio/doctor.mp3',
        albumArt: 'assets/media/portadas/doctor.jpg'
    },
    {
        title: 'Nena',
        artist: 'Marama',
        src: 'assets/media/audio/nena.mp3',
        albumArt: 'assets/media/portadas/nena.jpg'
    },
    {
        title: 'Hola Perdida',
        artist: 'Luck Ra, Khea',
        src: 'assets/media/audio/perdida.mp3',
        albumArt: 'assets/media/portadas/perdida.jpg'
    },
    {
        title: 'No Soy Yo',
        artist: 'Valuto',
        src: 'assets/media/audio/noSoyYo.mp3',
        albumArt: 'assets/media/portadas/noSoyYo.jpg'
    },

];

// Lista de anuncios
const ads = [
    {
        title: 'Kinko',
        src: 'assets/media/ads/almacenesKinko.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
    {
        title: 'Cocina Kinko',
        src: 'assets/media/ads/cocinaKinko.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
    {
        title: 'Franquicias Kinko',
        src: 'assets/media/ads/franKinko.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
    {
        title: 'Marley Coffe',
        src: 'assets/media/ads/marley.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
    {
        title: 'Combo Fernet Kinko',
        src: 'assets/media/ads/fernet.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
    {
        title: 'Alfajores Kinko',
        src: 'assets/media/ads/alfajores.mp3',
        albumArt: 'assets/media/portadas/ads.png'
    },
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

playButton.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        albumArtElement.classList.add('spin'); 
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
        // Solo incrementamos el contador de canciones si no es un anuncio
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
    let colorIndex = colors.length - 1; 

    setInterval(() => {
        spans.forEach((span, i) => {
            
            span.className = colors[(colorIndex + i) % colors.length];
        });
        colorIndex = (colorIndex - 1 + colors.length) % colors.length; 
    }, 400); 
}

changeStatusColor();