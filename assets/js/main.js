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

// Lista de canciones
const playlist = [
    {
        title: 'Somos El Show',
        artist: 'Ramma, Ara',
        src: 'assets/media/audio/somosElShow.mp3',
        albumArt: 'assets/media/portadas/somosElShow.jpg'
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
        title: 'CAMAVINGA',
        artist: 'Sautu, ELLI THE KID',
        src: 'assets/media/audio/camavinga.mp3',
        albumArt: 'assets/media/portadas/camavinga.jpg'
    },
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
    {
        title: 'Inocente',
        artist: 'Roze, Peipper',
        src: 'assets/media/audio/inocente.mp3',
        albumArt: 'assets/media/portadas/inocente.jpg'
    },
    {
        title: 'Que Sed',
        artist: 'Luck Ra, Ulises Bueno',
        src: 'assets/media/audio/quesed.mp3',
        albumArt: 'assets/media/portadas/quesed.jpg'
    },
    {
        title: 'Se Que Vas a Doler',
        artist: 'Luck Ra, The La Planta',
        src: 'assets/media/audio/sqvad.mp3',
        albumArt: 'assets/media/portadas/sqvad.jpg'
    },
    {
        title: 'Rara Vez',
        artist: 'Milo J',
        src: 'assets/media/audio/raravez.mp3',
        albumArt: 'assets/media/portadas/raravez.jpg'
    },
    {
        title: 'Y Te Vas',
        artist: 'Luck Ra',
        src: 'assets/media/audio/ytevas.mp3',
        albumArt: 'assets/media/portadas/ytevas.jpg'
    },
    {
        title: 'SINVERGÜENZA',
        artist: 'Emanero, Karina, Angela...',
        src: 'assets/media/audio/sinver.mp3',
        albumArt: 'assets/media/portadas/sinver.jpg'
    },
    {
        title: 'Un Siglo Sin Ti',
        artist: 'Luck Ra, Chayanne',
        src: 'assets/media/audio/unsiglo.mp3',
        albumArt: 'assets/media/portadas/unsiglo.jpg'
    },
    {
        title: 'Si Me Disculpo Ahora',
        artist: 'Luck Ra, Miranda',
        src: 'assets/media/audio/disculpo.mp3',
        albumArt: 'assets/media/portadas/disculpo.jpg'
    },
    {
        title: 'Adicto',
        artist: 'Emanero, La Konga, Antonio',
        src: 'assets/media/audio/adicto.mp3',
        albumArt: 'assets/media/portadas/adicto.jpg'
    },
    {
        title: 'Atorrante',
        artist: 'Emanero, Ulises, Migrantes',
        src: 'assets/media/audio/atorrante.mp3',
        albumArt: 'assets/media/portadas/atorrante.jpg'
    },
    {
        title: 'Bandido',
        artist: 'Emanero, FMK, Estani, Rusher',
        src: 'assets/media/audio/bandido.mp3',
        albumArt: 'assets/media/portadas/bandido.jpg'
    },
    {
        title: 'Como Vos Lo Haces',
        artist: 'Emanero',
        src: 'assets/media/audio/comovos.mp3',
        albumArt: 'assets/media/portadas/comovos.jpg'
    },
    {
        title: 'Ladrona',
        artist: 'Emanero, BM, Onda, Mario',
        src: 'assets/media/audio/ladrona.mp3',
        albumArt: 'assets/media/portadas/ladrona.jpg'
    },
    {
        title: 'Mamichula',
        artist: 'Trueno, Nicki Nicole',
        src: 'assets/media/audio/mamichula.mp3',
        albumArt: 'assets/media/portadas/mamichula.jpg'
    },
    {
        title: 'Feel Me?',
        artist: 'Trueno',
        src: 'assets/media/audio/feelme.mp3',
        albumArt: 'assets/media/portadas/feelme.jpg'
    },
    {
        title: 'Real Gangsta Love',
        artist: 'Trueno',
        src: 'assets/media/audio/realgangsta.mp3',
        albumArt: 'assets/media/portadas/realgangsta.jpg'
    },
    {
        title: 'Muriendome',
        artist: 'Duki, Khea',
        src: 'assets/media/audio/muriendome.mp3',
        albumArt: 'assets/media/portadas/muriendome.jpg'
    },
    {
        title: 'Como Le Digo',
        artist: 'Khea',
        src: 'assets/media/audio/comoledigo.mp3',
        albumArt: 'assets/media/portadas/comoledigo.jpg'
    },
    {
        title: 'Una Foto Remix',
        artist: 'Mesita, Nicki, Emilia, Tiago PZK',
        src: 'assets/media/audio/unafoto.mp3',
        albumArt: 'assets/media/portadas/unafoto.jpg'
    },
    {
        title: 'Wacha',
        artist: 'Duki, Khea',
        src: 'assets/media/audio/wacha.mp3',
        albumArt: 'assets/media/portadas/wacha.jpg'
    },
    {
        title: 'Neon',
        artist: 'Lit Killah',
        src: 'assets/media/audio/neon.mp3',
        albumArt: 'assets/media/portadas/neon.jpg'
    },
    {
        title: 'Los Del Espacio',
        artist: 'Lit Killah, Duki, FMK...',
        src: 'assets/media/audio/espacio.mp3',
        albumArt: 'assets/media/portadas/espacio.jpg'
    },
    {
        title: 'La Trampa es Ley',
        artist: 'Lit Killah',
        src: 'assets/media/audio/trampa.mp3',
        albumArt: 'assets/media/portadas/trampa.jpg'
    },
    {
        title: 'Mala Mia',
        artist: 'Lit Killah, Duki',
        src: 'assets/media/audio/malamia.mp3',
        albumArt: 'assets/media/portadas/mawz.jpg'
    },
    {
        title: 'En La Oscuridad',
        artist: 'Lit Killah, Maria Becerra',
        src: 'assets/media/audio/enlaoscuridad.mp3',
        albumArt: 'assets/media/portadas/mawz.jpg'
    },
    {
        title: 'Dejame Tranki',
        artist: 'Lit Killah, Khea',
        src: 'assets/media/audio/dejametranki.mp3',
        albumArt: 'assets/media/portadas/mawz.jpg'
    },
    {
        title: 'Call Me Maybe',
        artist: 'Duki',
        src: 'assets/media/audio/callme.mp3',
        albumArt: 'assets/media/portadas/callme.jpg'
    },
    {
        title: 'Sexy',
        artist: 'Eich, Duki, Khea',
        src: 'assets/media/audio/sexy.mp3',
        albumArt: 'assets/media/portadas/sexy.jpg'
    },
    {
        title: 'No Me Conocen',
        artist: 'Bandido, Duki, Tiago, Rei',
        src: 'assets/media/audio/nomeconocen.mp3',
        albumArt: 'assets/media/portadas/nomeconocen.jpg'
    },
    {
        title: 'Lo Olvidaste',
        artist: 'Dani, Duki',
        src: 'assets/media/audio/loolvidaste.mp3',
        albumArt: 'assets/media/portadas/loolvidaste.jpg'
    },
    {
        title: 'Suavemente',
        artist: 'Elvis Crespo',
        src: 'assets/media/audio/suavemente.mp3',
        albumArt: 'assets/media/portadas/elvis.jpg'
    },
    {
        title: 'Tu Sonrisa',
        artist: 'Elvis Crespo',
        src: 'assets/media/audio/tusonrisa.mp3',
        albumArt: 'assets/media/portadas/elvis.jpg'
    },
    {
        title: 'Devuelveme a mi chica',
        artist: 'Hombres G',
        src: 'assets/media/audio/michica.mp3',
        albumArt: 'assets/media/portadas/michica.jpg'
    },
    {
        title: 'Y Dime',
        artist: 'Agrupacion Marilyn',
        src: 'assets/media/audio/ydime.mp3',
        albumArt: 'assets/media/portadas/ydime.jpg'
    },
    {
        title: 'Que Ironia',
        artist: 'Rodrigo',
        src: 'assets/media/audio/queironia.mp3',
        albumArt: 'assets/media/portadas/rodri.jpg'
    },
    {
        title: 'Lo Mejor Del Amor',
        artist: 'Rodrigo',
        src: 'assets/media/audio/mejoramor.mp3',
        albumArt: 'assets/media/portadas/rodri.jpg'
    },
    {
        title: 'Ocho Cuarenta',
        artist: 'Rodrigo',
        src: 'assets/media/audio/ochocuarenta.mp3',
        albumArt: 'assets/media/portadas/rodri.jpg'
    },
    {
        title: 'Pizza Muzzarela',
        artist: 'Los Fatales',
        src: 'assets/media/audio/pizza.mp3',
        albumArt: 'assets/media/portadas/pizza.jpg'
    },
    {
        title: 'Emeyce',
        artist: '3AM, Danny Ocean',
        src: 'assets/media/audio/emeyce.mp3',
        albumArt: 'assets/media/portadas/emeyce.jpg'
    },
    {
        title: 'Nena Maldicion',
        artist: 'Paulo Londra, Lenny Tavarez',
        src: 'assets/media/audio/nenamal.mp3',
        albumArt: 'assets/media/portadas/nenamal.jpg'
    },
    {
        title: 'A Por Todo',
        artist: 'YSY A',
        src: 'assets/media/audio/aportodo.mp3',
        albumArt: 'assets/media/portadas/ysymo.jpg'
    },
    {
        title: 'Bailando Te Conoci',
        artist: 'Rusherking, Duki',
        src: 'assets/media/audio/bailando.mp3',
        albumArt: 'assets/media/portadas/bailando.jpg'
    },
    {
        title: 'Loba',
        artist: 'Rusherking',
        src: 'assets/media/audio/loba.mp3',
        albumArt: 'assets/media/portadas/loba.jpg'
    },
    {
        title: 'Dákiti',
        artist: 'Bad Bunny, Jhay Cortez',
        src: 'assets/media/audio/dakiti.mp3',
        albumArt: 'assets/media/portadas/dakiti.jpg'
    },
    {
        title: 'Sensualidad',
        artist: 'Bad Bunny, Prince Royce, J Balvin',
        src: 'assets/media/audio/sensualidad.mp3',
        albumArt: 'assets/media/portadas/sensualidad.jpg'
    },
    {
        title: 'Otro',
        artist: 'FMK, Khea',
        src: 'assets/media/audio/otro.mp3',
        albumArt: 'assets/media/portadas/otro.jpg'
    },
    {
        title: 'MAN$ION',
        artist: 'Lit Killah',
        src: 'assets/media/audio/mansion.mp3',
        albumArt: 'assets/media/portadas/snipez.jpg'
    },
    {
        title: 'Yo Se Que Tu',
        artist: 'FMK, Rusherking, Tiago PZK, Lit Killah',
        src: 'assets/media/audio/ysqt.mp3',
        albumArt: 'assets/media/portadas/ysqt.jpg'
    },
    {
        title: 'El Pronóstico',
        artist: 'Lira, Kingto',
        src: 'assets/media/audio/pronostico.mp3',
        albumArt: 'assets/media/portadas/pronostico.jpg'
    },
    {
        title: 'Sin Frenos',
        artist: 'Eladio Carrion, Duki',
        src: 'assets/media/audio/sinfrenos.mp3',
        albumArt: 'assets/media/portadas/sinfrenos.jpg'
    },
    {
        title: 'TQMQA',
        artist: 'Eladio Carrion',
        src: 'assets/media/audio/tqmqa.mp3',
        albumArt: 'assets/media/portadas/solmaria.jpg'
    },
    {
        title: 'Tu Ritmo',
        artist: 'Eladio Carrion',
        src: 'assets/media/audio/turitmo.mp3',
        albumArt: 'assets/media/portadas/solmaria.jpg'
    },
    {
        title: '100oMIL',
        artist: 'Khea, C.R.O, Neo Pistea',
        src: 'assets/media/audio/100omil.mp3',
        albumArt: 'assets/media/portadas/trapicheo2.jpg'
    },
    {
        title: 'Mi Corazon',
        artist: 'Tiago PZK',
        src: 'assets/media/audio/corazon.mp3',
        albumArt: 'assets/media/portadas/corazon.jpg'
    },
    {
        title: 'Besame REMIX',
        artist: 'Bhavi, Seven, Khea, Milo, Tiago, Khea, Neo',
        src: 'assets/media/audio/besamermx.mp3',
        albumArt: 'assets/media/portadas/besamermx.jpg'
    },
    {
        title: 'Házmelo',
        artist: 'Tiago PZK',
        src: 'assets/media/audio/hazmelo.mp3',
        albumArt: 'assets/media/portadas/hazmelo.jpg'
    },
    {
        title: 'Entre Nosotros',
        artist: 'Tiago PZK, LIT Killah',
        src: 'assets/media/audio/entrenosotros.mp3',
        albumArt: 'assets/media/portadas/entrenosotros.jpg'
    },
    {
        title: 'No Dijeron Nada',
        artist: 'Oscu',
        src: 'assets/media/audio/nada.mp3',
        albumArt: 'assets/media/portadas/nada.jpg'
    },
    {
        title: 'Electrica',
        artist: 'Tiago PZK, IZA',
        src: 'assets/media/audio/electrica.mp3',
        albumArt: 'assets/media/portadas/portales.jpg'
    },
    {
        title: 'Sabor A Miel',
        artist: 'Tiago PZK',
        src: 'assets/media/audio/miel.mp3',
        albumArt: 'assets/media/portadas/portales.jpg'
    },
    {
        title: 'Sex & Love',
        artist: 'Tiago PZK',
        src: 'assets/media/audio/s&l.mp3',
        albumArt: 'assets/media/portadas/portales.jpg'
    },
    {
        title: 'Soltera REMIX',
        artist: 'Lunay, Bad Bunny, Daddy',
        src: 'assets/media/audio/soltera.mp3',
        albumArt: 'assets/media/portadas/soltera.jpg'
    },
    {
        title: 'Tu Tu Tu <3',
        artist: 'Knak, COSMIC KID',
        src: 'assets/media/audio/tutu.mp3',
        albumArt: 'assets/media/portadas/kapsula.jpg'
    },
    {
        title: 'Suave',
        artist: 'Knak',
        src: 'assets/media/audio/suave.mp3',
        albumArt: 'assets/media/portadas/kapsula.jpg'
    },
    {
        title: 'Que Esperan??',
        artist: 'Matias Fisher',
        src: 'assets/media/audio/esperan.mp3',
        albumArt: 'assets/media/portadas/esperan.jpg'
    },
    {
        title: 'Otra Vez',
        artist: 'Diablo, Khea',
        src: 'assets/media/audio/otravez.mp3',
        albumArt: 'assets/media/portadas/otravez.jpg'
    },  
    {
        title: 'ALIOLI',
        artist: 'Milo J',
        src: 'assets/media/audio/alioli.mp3',
        albumArt: 'assets/media/portadas/166.jpg'
    },
    {
        title: 'Antes De Los 20',
        artist: 'Milo J',
        src: 'assets/media/audio/20.mp3',
        albumArt: 'assets/media/portadas/166.jpg'
    },
    {
        title: 'Algo Me Gusta De Ti',
        artist: 'Wisin & Yandel, Chris Brown, T-Pain',
        src: 'assets/media/audio/deti.mp3',
        albumArt: 'assets/media/portadas/deti.jpg'
    },
    {
        title: 'Rakata',
        artist: 'Wisin & Yandel',
        src: 'assets/media/audio/rakata.mp3',
        albumArt: 'assets/media/portadas/rakata.jpg'
    },
    {
        title: 'Abusadora',
        artist: 'Wisin & Yandel',
        src: 'assets/media/audio/abusadora.mp3',
        albumArt: 'assets/media/portadas/rakata.jpg'
    },

    {
        title: 'Sexy Movimiento',
        artist: 'Wisin & Yandel',
        src: 'assets/media/audio/sexymov.mp3',
        albumArt: 'assets/media/portadas/rakata.jpg'
    },
    {
        title: 'Pepas',
        artist: 'Farruko',
        src: 'assets/media/audio/pepas.mp3',
        albumArt: 'assets/media/portadas/pepas.jpg'
    },
    {
        title: 'Gasolina',
        artist: 'Daddy Yankee',
        src: 'assets/media/audio/gasolina.mp3',
        albumArt: 'assets/media/portadas/daddy.jpg'
    },
    {
        title: 'Lo Que Pasó, Pasó',
        artist: 'Daddy Yankee',
        src: 'assets/media/audio/loqpaso.mp3',
        albumArt: 'assets/media/portadas/daddy.jpg'
    },
    {
        title: '6AM',
        artist: 'J Balvin, Farruko',
        src: 'assets/media/audio/6am.mp3',
        albumArt: 'assets/media/portadas/6am.jpg'
    },
    {
        title: 'Tu Principe',
        artist: 'Daddy Yankee, Zion & Lenox',
        src: 'assets/media/audio/principe.mp3',
        albumArt: 'assets/media/portadas/daddy.jpg'
    },
    {
        title: 'La Despedida',
        artist: 'Daddy Yankee',
        src: 'assets/media/audio/ladespedida.mp3',
        albumArt: 'assets/media/portadas/daddy.jpg'
    },
    {
        title: 'Lovumba',
        artist: 'Daddy Yankee',
        src: 'assets/media/audio/lovu.mp3',
        albumArt: 'assets/media/portadas/daddy.jpg'
    },
    {
        title: 'La Pregunta',
        artist: 'J Alvarez',
        src: 'assets/media/audio/lapregunta.mp3',
        albumArt: 'assets/media/portadas/jalva.jpg'
    },
    {
        title: 'Junto Al Amanecer',
        artist: 'J Alvarez',
        src: 'assets/media/audio/amanecer.mp3',
        albumArt: 'assets/media/portadas/jalva.jpg'
    },
    {
        title: 'Borro Cassette',
        artist: 'Maluma',
        src: 'assets/media/audio/borro.mp3',
        albumArt: 'assets/media/portadas/malu.jpg'
    },
    {
        title: 'Hawái',
        artist: 'Maluma',
        src: 'assets/media/audio/hawai.mp3',
        albumArt: 'assets/media/portadas/hawai.jpg'
    },
    {
        title: 'El Perdedor',
        artist: 'Maluma',
        src: 'assets/media/audio/perdedor.mp3',
        albumArt: 'assets/media/portadas/malu.jpg'
    },
    {
        title: 'Sin Contrato',
        artist: 'Maluma',
        src: 'assets/media/audio/contrato.mp3',
        albumArt: 'assets/media/portadas/malu.jpg'
    },
    {
        title: 'X',
        artist: 'Nicki Jam, J Balvin',
        src: 'assets/media/audio/x.mp3',
        albumArt: 'assets/media/portadas/x.jpg'
    },
    {
        title: 'Bella y Sensual',
        artist: 'Romeo Santos, Daddy Yankee, Nicki Jam',
        src: 'assets/media/audio/bella.mp3',
        albumArt: 'assets/media/portadas/bella.jpg'
    },
    {
        title: 'Cuaderno',
        artist: 'Dalex, J Quiles, Nicky Jam, Sech, Lenny',
        src: 'assets/media/audio/cuaderno.mp3',
        albumArt: 'assets/media/portadas/dalex.jpg'
    },
    {
        title: 'Otro Trago - Remix',
        artist: 'Sech, Ozuna, Anuel, Darell, Nicky Jam',
        src: 'assets/media/audio/trago.mp3',
        albumArt: 'assets/media/portadas/trago.jpg'
    },
    {
        title: 'La Rompe Corazones',
        artist: 'Daddy Yankee, Ozuna',
        src: 'assets/media/audio/corazones.mp3',
        albumArt: 'assets/media/portadas/corazones.jpg'
    },
    {
        title: 'Otra Vez',
        artist: 'Zion & Lon, J Balvin',
        src: 'assets/media/audio/otra.mp3',
        albumArt: 'assets/media/portadas/otra.jpg'
    },
    {
        title: 'Ay Vamos',
        artist: 'J Balvin',
        src: 'assets/media/audio/vamos.mp3',
        albumArt: 'assets/media/portadas/balvin.jpg'
    },
    {
        title: 'Feliz Cumpleaños Ferxxo',
        artist: 'Feid',
        src: 'assets/media/audio/cumple.mp3',
        albumArt: 'assets/media/portadas/cumple.jpg'
    },
    {
        title: 'CLASSY 101',
        artist: 'Feid, Young Miko',
        src: 'assets/media/audio/classy.mp3',
        albumArt: 'assets/media/portadas/classy.jpg'
    },
    // Nuevas Canciones.
    {
        title: 'Give Me a Kiss',
        artist: 'Crash Adams',
        src: 'assets/media/audio/giveme.mp3',
        albumArt: 'assets/media/portadas/giveme.jpg'
    },
    {
        title: 'Iconicos',
        artist: 'Ramma',
        src: 'assets/media/audio/iconicos.mp3',
        albumArt: 'assets/media/portadas/iconicos.jpg'
    },
    {
        title: 'La Quiero A Morir',
        artist: 'DLG',
        src: 'assets/media/audio/dlg.mp3',
        albumArt: 'assets/media/portadas/dlg.jpg'
    },
    {
        title: 'De Música Ligera',
        artist: 'Soda Stereo',
        src: 'assets/media/audio/musica.mp3',
        albumArt: 'assets/media/portadas/soda.jpg'
    },
    {
        title: 'Ese Maldito Momento',
        artist: 'No Te Va Gustar',
        src: 'assets/media/audio/momento.mp3',
        albumArt: 'assets/media/portadas/ntvg.jpg'
    },
    {
        title: 'Amores Como el Nuestro',
        artist: 'Karibe con K',
        src: 'assets/media/audio/amores.mp3',
        albumArt: 'assets/media/portadas/karibe.jpg'
    },
    {
        title: 'Un Terremoto de Amor',
        artist: 'Karibe Con K',
        src: 'assets/media/audio/terremoto.mp3',
        albumArt: 'assets/media/portadas/karibe.jpg'
    },
    {
        title: 'Deseándote',
        artist: 'Karibe con K',
        src: 'assets/media/audio/Deseandote.mp3',
        albumArt: 'assets/media/portadas/karibe.jpg'
    },
    {
        title: 'Se Parece Más A Ti',
        artist: 'Jambao',
        src: 'assets/media/audio/masati.mp3',
        albumArt: 'assets/media/portadas/jambao.jpg'
    },
    {
        title: 'Shakira',
        artist: 'L´Autentika',
        src: 'assets/media/audio/shakira.mp3',
        albumArt: 'assets/media/portadas/autentika.jpg'
    },
    {
        title: 'Diganle',
        artist: 'Karina',
        src: 'assets/media/audio/diganle.mp3',
        albumArt: 'assets/media/portadas/kari.jpg'
    },
    {
        title: 'Con La Misma Moneda',
        artist: 'Karina',
        src: 'assets/media/audio/moneda.mp3',
        albumArt: 'assets/media/portadas/kari.jpg'
    },
    {
        title: 'No Me Digas Que No',
        artist: 'Emanero, Karina',
        src: 'assets/media/audio/nomedigas.mp3',
        albumArt: 'assets/media/portadas/comovos.jpg'
    },
    {
        title: 'Lo malo de ser bueno',
        artist: 'El Cuarteto De Nos',
        src: 'assets/media/audio/malo.mp3',
        albumArt: 'assets/media/portadas/cuarteto.jpg'
    },
    {
        title: 'Yendo a la Casa de Damián',
        artist: 'El Cuarteto De Nos',
        src: 'assets/media/audio/damian.mp3',
        albumArt: 'assets/media/portadas/cuarteto.jpg'
    },
    {
        title: 'El hijo de Hernández',
        artist: 'El Cuarteto De Nos',
        src: 'assets/media/audio/hijo.mp3',
        albumArt: 'assets/media/portadas/cuarteto.jpg'
    },
    {
        title: 'Bichigyal - Remix',
        artist: 'PRIZE, Sautu, ARA, Ramma, cnd, Tiano',
        src: 'assets/media/audio/bichi.mp3',
        albumArt: 'assets/media/portadas/bichi.jpg'
    },
    {
        title: 'Viernes',
        artist: 'Ramma',
        src: 'assets/media/audio/viernes.mp3',
        albumArt: 'assets/media/portadas/trip.jpg'
    },
    {
        title: 'como si no importara',
        artist: 'Emilia, Duki',
        src: 'assets/media/audio/importara.mp3',
        albumArt: 'assets/media/portadas/emi.jpg'
    },
    {
        title: 'No Da Más',
        artist: 'YSY A, Duki',
        src: 'assets/media/audio/nodamas.mp3',
        albumArt: 'assets/media/portadas/after.jpg'
    },
    {
        title: 'Perdonarte, ¿Para Que?',
        artist: 'Los Ángeles Azules, Emilia',
        src: 'assets/media/audio/perdon.mp3',
        albumArt: 'assets/media/portadas/perdon.jpg'
    },
    {
        title: 'GTA.mp3',
        artist: 'Emilia',
        src: 'assets/media/audio/gta.mp3',
        albumArt: 'assets/media/portadas/mp3.jpg'
    },
    {
        title: 'No_se_ve.mp3',
        artist: 'Emilia, LUDMILLA',
        src: 'assets/media/audio/noseve.mp3',
        albumArt: 'assets/media/portadas/mp3.jpg'
    },  
    {
        title: 'Cuando Te Vi | CO#5',
        artist: 'Big One, Maria Becerra, Trueno',
        src: 'assets/media/audio/tevi.mp3',
        albumArt: 'assets/media/portadas/tevi.jpg'
    },
    {
        title: 'Además De Mí - Remix',
        artist: 'Rusher, KHEA, Duki, Maria, LIT, Tiago',
        src: 'assets/media/audio/adm.mp3',
        albumArt: 'assets/media/portadas/adm.jpg'
    },
    {
        title: 'El Amor De Mi Vida',
        artist: 'Los Ángeles Azules, Maria Becerra',
        src: 'assets/media/audio/amor.mp3',
        albumArt: 'assets/media/portadas/amor.jpg'
    },
    {
        title: 'Forever Alone',
        artist: 'Paulo Londra',
        src: 'assets/media/audio/alone.mp3',
        albumArt: 'assets/media/portadas/nenamal.jpg'
    },
    {
        title: 'PING PONG',
        artist: 'Sixto Yegros, YSY A',
        src: 'assets/media/audio/pong.mp3',
        albumArt: 'assets/media/portadas/pong.jpg'
    },
    {
        title: 'Tu 50',
        artist: 'Emanero, FMK',
        src: 'assets/media/audio/tu50.mp3',
        albumArt: 'assets/media/portadas/comovos.jpg'
    },
    {
        title: 'Sin Corazón',
        artist: 'KHEA',
        src: 'assets/media/audio/5.mp3',
        albumArt: 'assets/media/portadas/sero.jpg'
    },
    {
        title: 'Veneno',
        artist: 'Asan',
        src: 'assets/media/audio/veneno.mp3',
        albumArt: 'assets/media/portadas/bellas.jpg'
    },
    {
        title: 'Vete',
        artist: 'Asan',
        src: 'assets/media/audio/vete.mp3',
        albumArt: 'assets/media/portadas/bellas.jpg'
    },
    {
        title: 'OXICODONA',
        artist: 'KHEA, Knak',
        src: 'assets/media/audio/oxicodona.mp3',
        albumArt: 'assets/media/portadas/trapicheo2.jpg'
    },
    {
        title: 'Cuando Tus Ojos Me Ven',
        artist: 'uni',
        src: 'assets/media/audio/ojos.mp3',
        albumArt: 'assets/media/portadas/ojos.jpg'
    },
    {
        title: 'Sale Sola',
        artist: 'Roze, Ramky',
        src: 'assets/media/audio/salesola.mp3',
        albumArt: 'assets/media/portadas/salesola.jpg'
    },
];

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
        changeStatusColorWhite();
        clearInterval(colorInterval); 
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        albumArtElement.classList.add('spin'); 
        changeStatusColor();
    }
    isPlaying = !isPlaying;
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
        isAdPlaying = false;
    } else {
        songCounter++;
        currentSongIndex++;
        
        // Si hemos llegado al final del playlist, barajar de nuevo
        if (currentSongIndex >= playlist.length) {
            shufflePlaylist(playlist);
            currentSongIndex = 0; // Reiniciar el índice
        }
    }
    
    // Reproducir anuncio si corresponde
    if (songCounter % 3 === 0) {
        const adIndex = Math.floor(Math.random() * ads.length); // Selecciona un anuncio al azar
        loadMedia(ads[adIndex]);
        isAdPlaying = true; // Marcar que un anuncio está en reproducción
    } else {
        loadMedia(playlist[currentSongIndex]);
    }

    clearInterval(colorInterval);
    changeStatusColor();
    // Reproducir el siguiente audio (anuncio o canción)
    audio.play().catch((error) => {
        console.error('Error al reproducir el audio:', error);
    });
}

// Seleccionar la primera canción de la lista aleatoria
currentSongIndex = 0;
loadMedia(playlist[currentSongIndex]);

function playNextAndMore(){
    playButton.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    playNext()
}
nextButton.addEventListener('click', playNextAndMore);

// Cambiar canción al termino de la actual.
audio.addEventListener('ended', function() {
    if (isAdPlaying) {
        isAdPlaying = false;
        loadMedia(playlist[currentSongIndex]);
        audio.play();
    } else {
        playNext();
    }
});

// Escuchar errores de carga de audio
audio.addEventListener('error', function() {
    console.error('Error al cargar o reproducir la canción. Saltando a la siguiente...');
    playNext(); 
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

function changeStatusColorWhite() {
    clearInterval(colorInterval); 
}
