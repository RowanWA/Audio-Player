// setting all my constants for elements that will be changed
const SongName = document.getElementById("song-name");
const By = document.getElementById("by");
const ArtistName = document.getElementById("artist-name");
const AlbumPhoto = document.getElementById("album-cover-fmt");

// creating arrays for song names, artists, sources and cover photos that can be accessed later 
const SongList = ["Hyëna&nbsp", "Neurodivergent&nbsp", "Torpedeos&nbsp"];
const ArtistList = ["KMFDM", "Rabbit Junk", "MDFMK"];
const SourceList = ["audio/HYËNA.mp3", "audio/Neurodivergent.mp3", "audio/Torpedoes.mp3"];
const CoverList = ["images/Hyenas.jpg", "images/Neurodivergent.jpg", "images/Torpedoes.jpeg"];

// setting the starting possition for the playlist 
let playlistPosition = 0;

// setting the constants for buttons, sliders and other interactive elements 
const audioPlayer = new Audio();
const playPauseButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const progressSlider = document.getElementById("progress-slider");
const volumeSlider = document.getElementById("volume-slider");
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");

// setting the audio source to the current possition on the array as well as setting default volume
audioPlayer.src = SourceList[playlistPosition];
audioPlayer.volume = 0.5;

// setting the starting value for the progress slider to 0 so it starts at the start of the slider
progressSlider.value = 0;

// sets variable to determine if audio is playing or not
let playing = false;
let updatingProgress = false;
let changingSlider = false;

// sets the audio source to the previous possition in the array
function onPreviousClick() {
    playlistPosition = playlistPosition - 1;

    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    // pauses audio player when track is changed
    audioPlayer.pause();
    // updates pause/play button image, audio source, song name, artist and cover image
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    audioPlayer.src = SourceList[playlistPosition];
    SongName.innerHTML = SongList[playlistPosition];
    By.innerHTML = "by&nbsp;"
    ArtistName.innerHTML = ArtistList[playlistPosition];
    AlbumPhoto.src = CoverList[playlistPosition];
    // updates playing variable to match paused status 
    playing = false;

}

// sets the audio source to the next possition in the array
function onNextClick() {
    playlistPosition = playlistPosition + 1;
    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    // pauses audio player when track is changed
    audioPlayer.pause();
    // updates pause/play button image, audio source, song name, artist and cover image
    playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
    audioPlayer.src = SourceList[playlistPosition];
    SongName.innerHTML = SongList[playlistPosition];
    By.innerHTML = "by&nbsp;"
    ArtistName.innerHTML = ArtistList[playlistPosition];
    AlbumPhoto.src = CoverList[playlistPosition];
    // updates playing variable to match paused status 
    playing = false;
}


function onPlayPauseClick() {
    // if audio is playing pauses the audio when pause button is clicked, then updates button image to a play button
    if (playing) {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<img class="button-img" src="images/play.png">';
        playing = false;
        // if audio is paused the audio resumes|starts playing, then updates button image to a pause button
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

// sets the slider length and duration text to the length of the audio currently playing
function onLoadedMetadata() {
    progressSlider.max = audioPlayer.duration;
    durationText.innerHTML = secondsToMMSS(audioPlayer.duration);
}

// this converts an integer in seconds into minutes and seconds
function secondsToMMSS(seconds) {
    const integerSeconds = parseInt(seconds);
    let MM = parseInt(integerSeconds / 60);
    if (MM < 10) MM = "0" + MM;

    let SS = integerSeconds % 60;
    if (SS < 10) SS = "0" + SS;
    return MM + ":" + SS;
}

// this constantly updates the slider and duration timer to the current values 
function onTimeUpdate() {
    if (!updatingProgress) {
        progressSlider.value = audioPlayer.currentTime;
    }
    progressText.innerHTML = secondsToMMSS(audioPlayer.currentTime);
}

// this automatically plays the next track when the current one ends
function onEnd() {
    progressSlider.value = 0;
    playlistPosition = playlistPosition + 1;

    if (playlistPosition > 2) {
        playlistPosition = 0;
    } else if (playlistPosition < 0) {
        playlistPosition = 2;
    }
    // upates pause/play button image, audio source, song name, artist and cover image to the next track
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

// changes the current volume depending on the volume slider
function onVolumeSliderChange() {
    audioPlayer.volume = (volumeSlider.value) * 0.01;
}

// stops constant updates when slider is being pressed
function onProgressMouseDown() {
    updatingProgress = true;
    changingSlider = true;
}

// changes the audio to the time selected by the slider value and restarts constant updates
function onProgressSliderChange() {
    audioPlayer.currentTime = progressSlider.value;
    updatingProgress = false;
    changingSlider = true;
}

// linking together functions 
previousButton.onclick = onPreviousClick;
nextButton.onclick = onNextClick;
playPauseButton.onclick = onPlayPauseClick;
audioPlayer.onloadedmetadata = onLoadedMetadata;
audioPlayer.ontimeupdate = onTimeUpdate;
audioPlayer.onended = onEnd;
volumeSlider.onchange = onVolumeSliderChange;
progressSlider.onchange = onProgressSliderChange;
progressSlider.onmousedown = onProgressMouseDown

