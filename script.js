
const capaAlbum = document.querySelector(".imagem");
const nomeMusica = document.querySelector(".nome-musica");
const nomeArtista = document.querySelector(".nome-artista");

const playPause = document.querySelector(".play");
const proximo = document.querySelector(".proximo");
const anterior = document.querySelector(".anterior");

const slider = document.querySelector(".slide");
const tempoTotal = document.querySelector(".tempo-total");
const tempoAtual = document.querySelector(".tempo-atual");

let isPlaying = false;
let trackIndex = 0;
let updateTimer;

let musicaAtual = document.createElement('audio');

let trackList = [
    {
        nome: "Lanes",
        artista: "Chad Crouch",
        imagem: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        caminhoMusica: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    },

    {
        nome: "Sente a pressão",
        artista: "Giga Chad",
        imagem: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        caminhoMusica: "https://www.myinstants.com/media/sounds/nenem_C9u0QlC.mp3"
    }
    

]

loadTrack = (track_index) => {
    clearInterval(updateTimer);
    resetValues();

    musicaAtual.src = trackList[trackIndex].caminhoMusica;
    musicaAtual.load();

    capaAlbum.style.backgroundImage = "url(" + trackList[trackIndex].imagem + ")";
    nomeMusica.textContent = trackList[trackIndex].nome;
    nomeArtista.textContent = trackList[trackIndex].artista;

    updateTimer = setInterval(seekUpdate, 1000);

    musicaAtual.addEventListener("ended", proximaMusica);

}

resetValues = () => {
    tempoAtual.textContent = "00:00";
    tempoTotal.textContent = "00:00";
    slider.value = 0;

}

playPauseMusica = () => {
    if (!isPlaying) {
        playMusica();
    } else {
        pauseMusica();
    }
}

playMusica = () => {
    musicaAtual.play();
    isPlaying = true;

    playPause.innerHTML = '<i class="fa-solid fa-pause"></i>'
}

pauseMusica = () => {
    musicaAtual.pause();
    isPlaying = false;

    playPause.innerHTML = '<i class="fa-solid fa-play"></i>'
}

proximaMusica = () => {
    if (trackIndex < trackList.length - 1){
        trackIndex += 1;
    } else {
        trackIndex = 0;
    }

    loadTrack(trackIndex);
    playMusica();
}

anteriorMusica = () => {
    if (trackIndex > 0) {
        trackIndex -= 1;
    } else {
        trackIndex = trackList.length - 1;
    }

    loadTrack(trackIndex)
    playMusica();
}

seekTo = () => {
    seekto = musicaAtual.duration * (slider.value / 100)
    musicaAtual.currentTime = seekto;
}

seekUpdate = () => {
    let seekPosition = 0;

    if(!isNaN(musicaAtual.duration)) {
        seekPosition = musicaAtual.currentTime * (100 / musicaAtual.duration);
        slider.value = seekPosition;
    }

    let atualMinutos = Math.floor(musicaAtual.currentTime / 60);
    let atualSegundos = Math.floor(musicaAtual.currentTime - atualMinutos * 60);
    let duracaoMinutos = Math.floor(musicaAtual.currentTime / 60);
    let duracaoSegundos = Math.floor(musicaAtual.currentTime - atualMinutos * 60);

    if (atualMinutos < 10) {
        atualMinutos = "0" + atualMinutos;
    }

    if (duracaoMinutos < 10) {
        duracaoMinutos = "0" + duracaoMinutos;
    }

    if (atualSegundos < 10) {
        atualSegundos = "0" + atualSegundos;
    }

    if (duracaoSegundos < 10) {
        duracaoSegundos = "0" + duracaoSegundos;
    }

    tempoAtual.textContent = atualMinutos + ":" + atualSegundos;
    tempoTotal.textContent = duracaoMinutos + ":" + duracaoSegundos;
}

