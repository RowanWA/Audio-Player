const audioDrag = document.getElementById ("flex-container");
const dropZone = document.getElementById ("body-container");

function onDrop(event) {
    audioDrag.style.left = event.clientX - offsetX + "px";
    audioDrag.style.top = event.clientY - offsetY + "px";
    console.log("Element has been dropped");
}

function onDragOver(event) {
    event.preventDefault();
    console.log("Something is being dragged over me!");
}

let offsetX = 0;
let offsetY = 0;

function onDragStart(event) {

    const style = window.getComputedStyle(audioDrag, null);

    offsetX = event.clientX - parseInt(style.left);
    offsetY = event.clientY - parseInt(style.top);
    console.log ("I'm being dragged")
}

dropZone.ondrop = onDrop;
dropZone.ondragover = onDragOver;
audioDrag.ondragstart = onDragStart;