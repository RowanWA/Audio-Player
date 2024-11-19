const audioDrag = document.getElementById ("flex-container");
const dropZone = document.getElementById ("body-container");

function onDrop(event) {
    audioDrag.style.left = event.clientX - offsetX + "px";
    audioDrag.style.top = event.clientY - offsetY + "px";
}

function onDragOver(event) {
    event.preventDefault();
}

let offsetX = 0;
let offsetY = 0;

function onDragStart(event) {
    const style = window.getComputedStyle(audioDrag, null);
    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
}

dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;
audioDrag.ondragstart = onDragStart;