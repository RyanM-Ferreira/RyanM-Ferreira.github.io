var isStartMenuActive = true;

function showCategory(categoryOrChildren, thisElement) {
    const element = thisElement;
    const applicationsList = document.createElement("div");

    const multiplier = 1.1;

    applicationsList.className = "sub-menu-div";
    applicationsList.style.marginLeft = (element.offsetWidth / multiplier) + "px";
    applicationsList.style.marginTop = -(element.offsetHeight / multiplier) + "px";

    menuItems = Array.isArray(categoryOrChildren) ? categoryOrChildren : category[categoryOrChildren];

    for (const menuCategory of menuItems) {
        const itemButton = document.createElement("div");
        const text = document.createElement("span");
        const icon = document.createElement("img");

        itemButton.className = "sub-menu-button";
        icon.className = "category-icon";
        icon.src = menuCategory.icon;
        text.textContent = menuCategory.name;

        itemButton.appendChild(text);
        itemButton.appendChild(icon);

        applicationsList.appendChild(itemButton);

        itemButton.onmouseenter = () => {
            if (menuCategory.children) {
                showCategory(menuCategory.children, itemButton);
            }
        };

        itemButton.onclick = () => {
            if (!menuCategory.children) {
                projectId = (menuCategory.additional !== null) ? menuCategory.additional : null;
                
                console.log (menuCategory.additional, "\n", projectId);
                createWindow(menuCategory.name, menuCategory.path, projectId);
            }
        };
    }

    element.appendChild(applicationsList);

    element.onmouseleave = () => {
        element.removeChild(applicationsList);
    };
}

function openStartMenu() {
    isStartMenuActive = !isStartMenuActive;
    const startMenu = document.getElementById("start-menu");

    if (isStartMenuActive) {
        startMenu.style.visibility = 'visible';
    } else {
        startMenu.style.visibility = 'hidden';
    }
}