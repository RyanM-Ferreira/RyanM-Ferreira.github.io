var isStartMenuActive = true;

function startMenu() {
    isStartMenuActive = !isStartMenuActive;
    const startMenu = document.getElementById("start-menu");

    if (isStartMenuActive) {
        startMenu.style.visibility = 'visible';
    } else {
        startMenu.style.visibility = 'hidden';
    }
}