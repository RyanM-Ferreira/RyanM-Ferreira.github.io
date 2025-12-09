window.onload = updateClock;

var isDebugActive = false;

function openWindow(id) {
    element = document.getElementById(id);
    element.style.display = "block";
    resetProperties(element);
}

function closeWindow(id) {
    element = document.getElementById(id);
    element.style.display = "none";
}

function maximizeWindow(id) {
    const element = document.getElementById(id);

    if (!element.dataset.maximized) {
        getProperties(element);

        element.style.top = "0px";
        element.style.left = "0px";
        element.style.width = "100%";
        element.style.height = "91%";
        element.dataset.maximized = "true";

        return;
    }

    resetProperties(element);
}

function getProperties(element) {
    element.dataset.oldWidth = element.offsetWidth;
    element.dataset.oldHeight = element.offsetHeight;
    element.dataset.oldLeft = element.offsetLeft;
    element.dataset.oldTop = element.offsetTop;
}

function resetProperties(element) {
    element.style.width = element.dataset.oldWidth + "px";
    element.style.height = element.dataset.oldHeight + "px";
    element.style.left = element.dataset.oldLeft + "px";
    element.style.top = element.dataset.oldTop + "px";

    for (const key in element.dataset) {
        delete element.dataset[key];
    }
}

const archives = {
    about: [
        { name: "About Me", path: "Error 404", icon: "assets/icons/openFolder.png" },
    ],
    cSharp: [
        { name: "Snake Game on Console", path: "https://github1s.com/RyanM-Ferreira/snake-game-csharp-cli", icon: "assets/icons/openFolder.png" }
    ],
    thesis: [
        { name: "Final Game Development Project - Landing Page", path: "https://refractionsofgreed.vercel.app", icon: "assets/icons/openFolder.png" },
        { name: "Final Game Development Project - Itch.io", path: "pages/tcc/itch.html", icon: "assets/icons/openFolder.png" },
        { name: "Final Game Development Project - Banner", path: "pages/tcc/banner.html", icon: "assets/icons/openFolder.png" }
    ],
    test: [
        { name: "First file test", path: "pages/greetings.html", icon: "assets/icons/openFolder.png" }
    ]
};

function updateArchives(category) {
    const list = document.getElementById("file-list");
    list.textContent = "";

    for (const archive of archives[category]) {
        const item = document.createElement("div");
        const icon = document.createElement("img");
        const text = document.createElement("span");

        item.className = "file-item";
        icon.className = "file-icon";

        icon.src = archive.icon;
        text.textContent = archive.name;

        item.appendChild(icon);
        item.appendChild(text);

        list.appendChild(item);

        item.onclick = () => openArchive(archive.name, archive.path);
    }
}

function openArchive(title, url) {
    openWindow("window-viewer");

    document.getElementById("viewer-title").textContent = title;
    document.getElementById("viewer-frame").src = url;
}

function updateClock() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = `${hour}:${minute}`;
}

setInterval(updateClock, 1000);

function drag(event, id) {
    const element = document.getElementById(id);
    let offsetX = event.clientX - element.offsetLeft;
    let offsetY = event.clientY - element.offsetTop;

    function move(e) {
        if (!element.dataset.maximized) {
            element.style.left = (e.clientX - offsetX) + "px";
            element.style.top = (e.clientY - offsetY) + "px";
        }
    }

    function drop() {
        document.removeEventListener("pointermove", move);
    }

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", drop);
}