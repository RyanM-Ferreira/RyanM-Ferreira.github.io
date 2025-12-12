function createExplorer() {
    const explorer = document.createElement("div");
    const windowId = windowCounter++;

    updateWindowPosition();

    explorer.style.top = windowPosition + 'px';
    explorer.style.left = (windowPosition * leftWindowPositionMultiplier) + 'px';

    explorer.id = windowId;
    explorer.classList = "window", "shadow", "inside";

    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";
    titleBar.onpointerdown = (e) => {
        drag(e, windowId)
    };

    const span = document.createElement("span");
    span.textContent = "Explorer.exe - My Projects";

    const winBtns = document.createElement("div");
    winBtns.className = "window-buttons";

    const maxBtn = document.createElement("button");
    maxBtn.textContent = "O";
    maxBtn.onclick = () => {
        maximizeWindow(windowId)
    };

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.onclick = () => {
        closeWindow(windowId)
    };

    winBtns.appendChild(maxBtn);
    winBtns.appendChild(closeBtn);
    titleBar.appendChild(span);
    titleBar.appendChild(winBtns);
    explorer.appendChild(titleBar);

    const folders = document.createElement("div");
    folders.className = "folders";

    const categories = [
        { id: "about", label: "About me" },
        { id: "cSharp", label: "C#" },
        { id: "thesis", label: "Thesis" },
        { id: "test", label: "File test" }
    ];

    for (const category of categories) {
        const div = document.createElement("div");
        div.className = "folder";
        div.onclick = () => updateArchives(category.id, true);

        const img = document.createElement("img");
        img.src = "assets/icons/folder.png";

        const text = document.createElement("div");
        text.textContent = category.label;

        div.appendChild(img, text);
        folders.appendChild(div);
    }

    explorer.appendChild(folders);

    const breadcrumb = document.createElement("div");
    breadcrumb.id = "breadcrumb";
    breadcrumb.className = "breadcrumb";

    const fileList = document.createElement("div");
    fileList.id = "file-list";
    fileList.className = "file-list";

    explorer.appendChild(breadcrumb);
    explorer.appendChild(fileList);

    document.body.appendChild(explorer);

    checkWindowLimit();
    updateOpenedWindows(windowId);
}