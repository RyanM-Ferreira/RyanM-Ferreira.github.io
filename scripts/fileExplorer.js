let navigationHistory = [];

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
