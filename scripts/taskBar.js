window.onload = updateClock;
setInterval(updateClock, 1000);

function updateClock() {
    const now = new Date();
    const day = String(now.getDate());
    const month = String(now.getMonth());
    const year = String(now.getFullYear());
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = `${day}/${month}/${year}\n${hour}:${minute}`;
}