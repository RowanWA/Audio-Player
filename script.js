const SongName = document.getElementById("song-name");
const By = document.getElementById("by");
const ArtistName = document.getElementById("artist-name");


const audioPlayer = new Audio();

const playPauseButton = document.getElementById("play");

const progressSlider = document.getElementById("progress-slider");

audioPlayer.src = "audio/HYËNA [ ezmp3.cc ].mp3";

let playing = false;

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

function onLoadedMetadata(){
    console.log(audioPlayer.duration);
}



function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime;
}

function onEnd() {
    progressSlider.value = 0;
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    playing = false;
}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;



