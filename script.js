const audioPlayer = new Audio();

const playPauseButton = document.getElementById("play");

const progressSlider = document.getElementById("progress-slider");

audioPlayer.src = "audio/HYËNA [ ezmp3.cc ].mp3";

let playing = false;

function onPlayPauseClick() {
    if(playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">'
        playing = false;
    } else {
        audioPlayer.play();
        playPauseButton.innerHTML = '<img class="button-img" src="images/pause.png">'
        playing = true;
    }
}

function onLoadedMetadata(){
    console.log(audioPlayer.duration);
}

function onTimeUpdate() {
    progressSlider.value = audioPlayer.currentTime
}

playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;