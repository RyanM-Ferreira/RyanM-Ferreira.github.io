function loadContent(data) {
    var projectData = data;

    document.getElementById("project-title").textContent = projectData.title;
    document.getElementById("project-status").textContent = projectData.status;
    document.getElementById("project-year").textContent = projectData.year;

    const github = document.getElementById("project-github");
    github.href = projectData.github;

    document.getElementById("project-description").textContent = projectData.description;
    document.getElementById("project-notes").textContent = projectData.notes;

    const techList = document.getElementById("tech-list");

    for (var item of projectData.technologies) {
        const div = document.createElement("div");
        div.className = "tech";
        div.textContent = item;
        techList.appendChild(div);
    }

    const preview = document.getElementById("preview-image");
    preview.src = projectData.previewImage;
    preview.alt = projectData.title;

    const gallery = document.getElementById("gallery");

    for (var source of projectData.gallery) {
        const img = document.createElement("img");
        img.src = source;
        img.alt = projectData.title;
        gallery.appendChild(img);
    }

    async function loadReadme() {
        let object = await fetch(projectData.readme);
        let text = await object.text();
        document.getElementById("readme").textContent = text;
    }

    loadReadme();
}

function loadProject(projectId) {
    var message = `Project ${projectId} not found...`;
    const data = window.projectData[projectId];

    if (!data) {
        console.error(message);
        alert(message);

        return;
    }

    loadContent(data);
}