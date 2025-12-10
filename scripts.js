window.onload = updateClock;

var isDebugActive = false;
let navigationHistory = [];

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

    for (const data in element.dataset) {
        delete element.dataset[data];
    }
}

const archives = {
    about: [
        { name: "About Me", path: "Error 404", icon: "assets/icons/gear.png" },
    ],

    cSharp: [
        {
            name: "Console", icon: "assets/icons/folder.png",
            children: [
                {
                    name: "Snake Game on Console", path: "https://github1s.com/RyanM-Ferreira/snake-game-csharp-cli", icon: "assets/icons/gear.png",
                }
            ]
        }
    ],
    thesis: [
        {
            name: "Other Files and Download", icon: "assets/icons/openFolder.png",
            children: [
                {
                    name: "Itch.io", path: "pages/tcc/itch.html", icon: "assets/icons/gear.png"
                },
                {
                    name: "Other Files", icon: "assets/icons/folder.png",
                    children: [
                        { name: "Banner", path: "pages/tcc/banner.html", icon: "assets/icons/gear.png" },
                    ]
                }
            ]
        },
        {
            name: "Landing Page - Refractions of Greed",
            path: "https://refractionsofgreed.vercel.app",
            icon: "assets/icons/gear.png"
        }
    ],
    test: [
        { name: "First file test", path: "pages/greetings.html", icon: "assets/icons/gear.png" },
        { name: "Second file test", path: "pages/greetings.html", icon: "assets/icons/gear.png" }
    ]
};

function updateArchives(categoryOrChildren, mustReset = false) {
    const fileList = document.getElementById("file-list");
    const pathDiv = document.getElementById("breadcrumb");

    fileList.textContent = null;
    pathDiv.textContent = "Path:/";

    if (mustReset) {
        navigationHistory.length = 0;
    }

    items = Array.isArray(categoryOrChildren) ? categoryOrChildren : archives[categoryOrChildren];

    if (navigationHistory.length > 0) {
        const backButton = document.createElement("button");

        backButton.textContent = "Back";
        backButton.className = "file-button";

        for (const attributes of Object.values(navigationHistory)) {
            for (let values in attributes) {
                if (attributes[values].path == null) {
                    const breadcrumb = document.createElement("button");

                    breadcrumb.textContent = `${String(attributes[values].name)}/`;
                    breadcrumb.className = "breadcrumb-buttons";

                    pathDiv.appendChild(breadcrumb);
                }
            }
        }

        backButton.onclick = () => {
            const previous = navigationHistory.pop();
            updateArchives(previous);
        };

        fileList.appendChild(backButton);
    }

    for (const archive of items) {
        const item = document.createElement("div");
        const icon = document.createElement("img");
        const text = document.createElement("span");

        item.className = "file-item";
        icon.className = "file-icon";

        icon.src = archive.icon;
        text.textContent = archive.name;

        item.appendChild(icon);
        item.appendChild(text);
        fileList.appendChild(item);

        item.onclick = () => {
            if (archive.children) {
                navigationHistory.push(items);
                updateArchives(archive.children);
            } else {
                openArchive(archive.name, archive.path);
            }
        };
    }
}

function openArchive(title, url) {
    document.getElementById("viewer-title").textContent = title;
    document.getElementById("viewer-frame").src = url;

    openWindow("window-viewer");
}

function updateClock() {
    const now = new Date();
    const day = String(now.getDate());
    const month = String(now.getMonth());
    const year = String(now.getFullYear());
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = `${day}/${month}/${year}\n${hour}:${minute}`;
}

setInterval(updateClock, 1000);

function drag(event, id) {
    const element = document.getElementById(id);
    let offsetX = event.clientX - element.offsetLeft;
    let offsetY = event.clientY - element.offsetTop;

    const limitY = window.innerHeight - 96;

    function move(event) {
        if (!element.dataset.maximized) {
            let positionY = (event.clientY - offsetY);

            if (positionY > limitY) {
                positionY = limitY;
            }

            element.style.left = (event.clientX - offsetX) + "px";
            element.style.top = positionY + "px";
        }
    }

    function drop() {
        document.removeEventListener("pointermove", move);
    }

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", drop);
}