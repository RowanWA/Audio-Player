const SongName = document.getElementById("song-name");
const By = document.getElementById("by");
const ArtistName = document.getElementById("artist-name");
const AlbumPhoto = document.getElementById("album-cover-fmt");

const SongList = ["Hyëna&nbsp","Neurodivergent&nbsp", "Torpedeos&nbsp"];
const ArtistList = ["KMFDM", "Rabbit Junk", "MDFMK"];
const SourceList = ["audio/HYËNA.mp3", "audio/Neurodivergent.mp3", "audio/Torpedoes.mp3"];
const CoverList = ["images/Hyenas.jpg", "images/Neurodivergent.jpg", "images/Torpedoes.jpeg"];


let playlistPosition = 0;

const audioPlayer = new Audio();
const playPauseButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

audioPlayer.src = SourceList[playlistPosition];
audioPlayer.volume = 0.5;

let playing = false;
let updatingProgress = false;

function onPreviousClick() {
    playlistPosition = playlistPosition - 1;
    
    // resets counter once array has reached limit
    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    audioPlayer.pause();
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    audioPlayer.src = SourceList[playlistPosition];
    SongName.innerHTML = SongList[playlistPosition];
    By.innerHTML = "by&nbsp;"
    ArtistName.innerHTML = ArtistList[playlistPosition];
    AlbumPhoto.src = CoverList[playlistPosition];
    playing = false;

}

function onNextClick() {
    playlistPosition = playlistPosition + 1;
    // resets counter once array has reached limit
    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    audioPlayer.pause();
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    audioPlayer.src = SourceList[playlistPosition];
    SongName.innerHTML = SongList[playlistPosition];
    By.innerHTML = "by&nbsp;"
    ArtistName.innerHTML = ArtistList[playlistPosition];
    AlbumPhoto.src = CoverList[playlistPosition];
    playing = false;
}


function onPlayPauseClick() {
    if(playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '<img class="button-img" src="images/pause.png">';
        SongName.innerHTML = SongList[playlistPosition];
        By.innerHTML = "by&nbsp;"
        ArtistName.innerHTML = ArtistList[playlistPosition];
        AlbumPhoto.src = CoverList[playlistPosition];
        playing = true;
    }
}

function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;
    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;

    let SS = integerSeconds % 60;
    if (SS <10) SS = "0" + SS;
    return MM + ":" + SS;
}

function onTimeUpdate() {
    if(!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

function onEnd() {
    progressSlider.value = 0;
    playlistPosition = playlistPosition + 1;
    // resets counter once array has reached limit
    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    playPauseButton.innerHTML = '<img class="button-img" src="images/pause.png">';
    audioPlayer.src = SourceList[playlistPosition];
    SongName.innerHTML = SongList[playlistPosition];
    By.innerHTML = "by&nbsp;"
    ArtistName.innerHTML = ArtistList[playlistPosition];
    AlbumPhoto.src = CoverList[playlistPosition];
    playing = true;
    progressText.innerHTML = "00:00";
    audioPlayer.play();
    
}

function onVolumeSliderChange() {
    audioPlayer.volume = (volumeSlider.value) * 0.01;
}

function onProgressMouseDown() {
    updatingProgress = true;
}

function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
}

previousButton.onclick = onPreviousClick;
nextButton.onclick = onNextClick;

playPauseButton.onclick = onPlayPauseClick;

audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown

