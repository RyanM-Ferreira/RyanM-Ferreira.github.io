window.onload = UpdateClock;

var isDebugActive = false;

function openWindow(id) {
    document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function showURL(title, url) {
    openWindow("window-viewer");

    document.getElementById("viewer-title").textContent = title;
    document.getElementById("viewer").style.display = "block";
    document.getElementById("viewer-frame").src = url;
}

function UpdateClock() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = `${hour}:${minute}`;
}

setInterval(UpdateClock, 1000);

function drag(event, id) {
    const element = document.getElementById(id);
    let offsetX = event.clientX - element.offsetLeft;
    let offsetY = event.clientY - element.offsetTop;

    function move(event) {
        element.style.left = (event.clientX - offsetX) + "px";
        element.style.top = (event.clientY - offsetY) + "px";
    }

    function drop() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", drop);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", drop);
}