let openedWindows = [];
let windowCounter = 0;

let windowPositionMultiplier = 20;
let leftWindowPositionMultiplier = 1;
let windowPosition = windowPositionMultiplier;

function drag(e, id) {
    const element = document.getElementById(id);

    let offsetX = e.clientX - element.offsetLeft;
    let offsetY = e.clientY - element.offsetTop;

    const correctPos = 64;
    const minY = 0;
    const maxY = window.innerHeight - correctPos;

    function move(e) {
        if (element.dataset.maximized === "true") {
            return;
        }

        let positionY = (e.clientY - offsetY);
        let positionX = (e.clientX - offsetX);

        if (positionY > maxY) {
            positionY = maxY;
        } else if (positionY < minY) {
            positionY = minY;
        }

        element.style.left = positionX + "px";
        element.style.top = positionY + "px";
    }

    function drop() {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", drop);
    }

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", drop);
}

function updateOpenedWindows(windowId) {
    openedWindows.push(windowId);
}

function checkWindowLimit() {
    var windowLimit = 25;
    openedWindows = openedWindows.filter(id => document.getElementById(id));

    if (openedWindows.length >= windowLimit) {
        alert("You have reached the maximum number of opened windows. All windows will be closed.");

        for (let i = 0; i < openedWindows.length; i++) {
            closeWindow(openedWindows[i]);
        }

        openedWindows = [];
    }
}

function updateWindowPosition() {
    windowPosition = windowCounter * windowPositionMultiplier;

    var resetPositionY = windowCounter % 10 == 0;
    var resetPositionX = leftWindowPositionMultiplier % 10 == 0;

    if (resetPositionY) {
        windowPositionMultiplier /= 1.5;
        windowPosition = windowPositionMultiplier;
        leftWindowPositionMultiplier += 0.5;
    }

    if (resetPositionX) {
        windowPosition = windowPositionMultiplier;
        leftWindowPositionMultiplier = 1;
    }

    console.log("Position: ", windowPosition, "\n\n", "Left Multiplier: ", leftWindowPositionMultiplier);

    return windowPosition;
}

function createWindow(windowTitle, windowPath) {
    const windowId = windowCounter++;

    updateWindowPosition();

    const windowDiv = document.createElement('div');
    windowDiv.id = windowId;
    windowDiv.classList.add('window', 'shadow', 'inside');
    windowDiv.style.top = windowPosition + 'px';
    windowDiv.style.left = windowPosition + 'px';

    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');
    titleBar.onpointerdown = (e) => {
        drag(e, windowId);
    }

    const title = document.createElement('span');
    title.id = 'viewer-title';
    title.textContent = 'Arquivo';

    const windowButtons = document.createElement('div');
    windowButtons.classList.add('window-buttons');

    const maximizeButton = document.createElement('button');
    maximizeButton.textContent = 'O';
    maximizeButton.onclick = () => {
        maximizeWindow(windowId);
    };

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.onclick = () => {
        closeWindow(windowId);
    };

    windowButtons.appendChild(maximizeButton);
    windowButtons.appendChild(closeButton);

    titleBar.appendChild(title);
    titleBar.appendChild(windowButtons);

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'viewer';

    const iframe = document.createElement('iframe');
    iframe.id = 'viewer-frame';

    viewerDiv.appendChild(iframe);

    windowDiv.appendChild(titleBar);
    windowDiv.appendChild(viewerDiv);

    document.body.appendChild(windowDiv);

    title.textContent = windowTitle;
    iframe.src = windowPath;

    checkWindowLimit();
    updateOpenedWindows(windowId);
}

function maximizeWindow(id) {
    const windowElement = document.getElementById(id);

    if (!windowElement.dataset.maximized) {
        getWindowDataset(windowElement);

        windowElement.style.top = "0px";
        windowElement.style.left = "0px";
        windowElement.style.width = '100vw';
        windowElement.style.height = '95vh';
        windowElement.dataset.maximized = "true";

        return;
    }

    resetWindowDataset(windowElement);
}

function closeWindow(id) {
    const windowElement = document.getElementById(id);
    resetWindowDataset(windowElement);
    windowElement.remove();
}

function getWindowDataset(windowElement) {
    windowElement.dataset.oldWidth = windowElement.offsetWidth;
    windowElement.dataset.oldHeight = windowElement.offsetHeight;
    windowElement.dataset.oldLeft = windowElement.offsetLeft;
    windowElement.dataset.oldTop = windowElement.offsetTop;
}

function resetWindowDataset(windowElement) {
    windowElement.style.width = windowElement.dataset.oldWidth + "px";
    windowElement.style.height = windowElement.dataset.oldHeight + "px";
    windowElement.style.left = windowElement.dataset.oldLeft + "px";
    windowElement.style.top = windowElement.dataset.oldTop + "px";

    for (const data in windowElement.dataset) {
        delete windowElement.dataset[data];
    }
}