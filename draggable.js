const audioDrag = document.getElementById("flex-container");
const dropZone = document.getElementById("body-container");
const volSliderDragExemption = document.getElementById("volume-slider");
const proSliderDragExemption = document.getElementById("progress-slider");

let draggable = false;

function volDragStop(event) {
    draggable = false;
}
function proDragStop(event) {
    draggable = false;
}


function onDrop(event) {
    if (draggable = true) {
        audioDrag.style.left = event.clientX - offsetX + "px";
        audioDrag.style.top = event.clientY - offsetY + "px";
    }
}

function onDragOver(event) {
    if (draggable = true) {
        event.preventDefault();
    }
}

let offsetX = 0;
let offsetY = 0;

function onDragStart(event) {
    if (draggable = true) {
        const style = window.getComputedStyle(audioDrag, null);
        offsetX = event.clientX - parseInt(style.left);
        offsetY = event.clientY - parseInt(style.top);
    }
}



dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;
audioDrag.ondragstart = onDragStart;
volSliderDragExemption.onmouseover = volDragStop;
proSliderDragExemption.onmouseover = proDragStop;