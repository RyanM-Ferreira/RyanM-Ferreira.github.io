function drag(event, id) {
    const element = document.getElementById(id);
    let offsetX = event.clientX - element.offsetLeft;
    let offsetY = event.clientY - element.offsetTop;

    const correctPos = 64;

    const maxY = window.innerHeight - correctPos;
    const minY = (window.innerHeight - maxY) - correctPos;

    function move(event) {
        if (!element.dataset.maximized) {
            let positionY = (event.clientY - offsetY);

            if (positionY > maxY) {
                positionY = maxY;
            }
            else if (positionY < minY) {
                positionY = minY;
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