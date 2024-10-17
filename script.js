const SongName = document.getElementById("song-name");
const By = document.getElementById("by");
const ArtistName = document.getElementById("artist-name");


const audioPlayer = new Audio();

const playPauseButton = document.getElementById("play");

const progressSlider = document.getElementById("progress-slider");

const volumeSlider = document.getElementById("volume-slider");

const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

audioPlayer.src = "audio/HYËNA [ ezmp3.cc ].mp3";
audioPlayer.volume = 0.5;

let playing = false;
let updatingProgress = false;

function onPlayPauseClick() {
    if(playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '<img class="button-img" src="images/pause.png">';
        SongName.innerHTML = "Hyëna&nbsp;"
        By.innerHTML = "by&nbsp;"
        ArtistName.innerHTML = "KMFDM"
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
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    playing = false;
    progressText.innerHTML = "00:00";
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

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown

