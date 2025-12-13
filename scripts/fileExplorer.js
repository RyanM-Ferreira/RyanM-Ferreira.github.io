const archives = {
    about: [
        { name: "About Me", path: "Error 404", icon: "assets/icons/gear.png" },
    ],
    c_scharp: [
        {
            name: "Console", icon: "assets/icons/folder.png",
            children: [
                {
                    name: "Snake Game on Console", path: "https://github1s.com/RyanM-Ferreira/snake-game-csharp-cli", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/snake-game-csharp-cli.git"
                }
            ]
        },
        {
            name: "Godot", icon: "assets/icons/folder.png",
            children: [
                {
                }
            ]
        }
    ],
    cpp: [
        {
            name: "Console", icon: "assets/icons/folder.png",
            children: [
                {
                    name: "Space Invaders on Console", path: "https://github.com/RyanM-Ferreira/space-invaders-cpp-cli", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/space-invaders-cpp-cli"
                }
            ]
        }
    ],
    thesis: [
        {
            name: "Other Files and Download", icon: "assets/icons/openFolder.png",
            children: [
                {
                    name: "Itch.io", path: "pages/tcc/itch.html", icon: "assets/icons/gear.png",
                },
                {
                    name: "Other Files", icon: "assets/icons/folder.png",
                    children: [
                        { name: "Banner", path: "pages/tcc/banner.html", icon: "assets/icons/gear.png", },
                    ]
                }
            ]
        },
        { name: "Landing Page - Refractions of Greed", path: "https://refractionsofgreed.vercel.app", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/Refractions-of-Greed---Landing-Page" }
    ],
    javascript: {
        
    },
    internal: [
        { name: "About this project", path: "pages/template.html", icon: "assets/icons/gear.png" },
        { name: "Launch other desktop instance", path: "index.html", icon: "assets/icons/gear.png" }
    ]
};

const navigationHistory = {};

function updateArchives(windowId, categoryOrChildren, mustReset = false) {
    const fileList = document.getElementById(`file-list-${windowId}`);
    const pathDiv = document.getElementById(`breadcrumb-${windowId}`);

    fileList.textContent = null;
    pathDiv.textContent = "Path:/";

    if (!navigationHistory[windowId]) {
        navigationHistory[windowId] = [];
    }

    const history = navigationHistory[windowId];

    if (mustReset) {
        history.length = 0;
    }

    items = Array.isArray(categoryOrChildren) ? categoryOrChildren : archives[categoryOrChildren];

    if (history.length > 0) {
        const backButton = document.createElement("button");

        backButton.textContent = "Back";
        backButton.className = "file-button";

        for (const attributes of history) {
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
            const previous = history.pop();
            updateArchives(windowId, previous);
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

        if (archive.git != null) {
            const gitDiv = document.createElement("div");
            const gitLink = document.createElement("a");
            const gitIcon = document.createElement("img");

            gitIcon.src = "assets/icons/github.png";

            gitLink.href = archive.git;
            gitLink.textContent = "Git Repo";
            gitLink.target = "_blank";

            gitDiv.className = "git-div";

            gitDiv.appendChild(gitLink);
            gitDiv.appendChild(gitIcon);

            item.appendChild(gitDiv);
        }

        fileList.appendChild(item);

        item.onclick = () => {
            if (archive.children) {
                history.push(items);
                updateArchives(windowId, archive.children);
            } else {
                createWindow(archive.name, archive.path);
            }
        };
    }
}

function createExplorer() {
    const explorer = document.createElement("div");
    const windowId = windowCounter++;

    updateWindowPosition();

    explorer.style.top = windowPosition + 'px';
    explorer.style.left = (windowPosition * leftWindowPositionMultiplier) + 'px';

    explorer.id = windowId;
    explorer.className = "window shadow inside";

    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";
    titleBar.onpointerdown = (e) => {
        drag(e, windowId)
    };

    const span = document.createElement("span");
    span.textContent = `Explorer.exe - My Projects`;

    const windowButtons = document.createElement("div");
    windowButtons.className = "window-buttons";

    const maxButton = document.createElement("button");
    maxButton.textContent = "O";
    maxButton.onclick = () => {
        maximizeWindow(windowId)
    };

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.onclick = () => {
        closeWindow(windowId)
    };

    windowButtons.appendChild(maxButton);
    windowButtons.appendChild(closeButton);
    titleBar.appendChild(span);
    titleBar.appendChild(windowButtons);
    explorer.appendChild(titleBar);

    const folders = document.createElement("div");
    folders.className = "folders";

    const categories = [
        { id: "about", label: "About me" },
        { id: "thesis", label: "My thesis" },
        { id: "c_scharp", label: "C#" },
        { id: "cpp", label: "C++" },
        { id: "javascript", label: "JavaScript" },
        { id: "internal", label: "Internal files" }
    ];

    for (const category of categories) {
        const div = document.createElement("div");
        const text = document.createElement("div");
        const img = document.createElement("img");

        div.className = "folder";
        img.src = "assets/icons/folder.png";
        text.textContent = category.label;

        div.appendChild(img);
        div.appendChild(text);

        folders.appendChild(div);

        div.onclick = () => updateArchives(windowId, category.id, true);
    }

    const breadcrumb = document.createElement("div");
    const fileList = document.createElement("div");
    const fileContent = document.createElement("div");
    const explorerRect = document.createElement("div");

    breadcrumb.id = `breadcrumb-${windowId}`;
    fileList.id = `file-list-${windowId}`;

    breadcrumb.className = "breadcrumb";
    fileList.className = "file-list";
    fileContent.className = "file-content";
    explorerRect.className = "explorer-rect";

    fileContent.appendChild(breadcrumb);
    fileContent.appendChild(fileList);

    explorerRect.appendChild(folders);
    explorerRect.appendChild(fileContent);

    explorer.appendChild(explorerRect);

    document.body.appendChild(explorer);

    checkWindowLimit();
    updateOpenedWindows(windowId);
}