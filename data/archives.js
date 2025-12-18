window.archives = {
    featured_project: [
        {
            name: "Refractions of Greed (High School Final Project)",
            icon: "assets/icons/folder.png",
            children: [
                { name: "Project Overview", path: "pages/project-info.html", icon: "assets/icons/gear.png", additional: 'refractions', git: "https://github.com/RyanM-Ferreira/refractions-of-greed-site" },
                { name: "Landing Page", path: "https://refractionsofgreed.vercel.app", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/refractions-of-greed-site" },
                { name: "Itch.io Page", path: "pages/project/itch.html", icon: "assets/icons/gear.png" },
                {
                    name: "Additional Assets",
                    icon: "assets/icons/folder.png",
                    children: [
                        { name: "Game Banner", path: "pages/project/banner.html", icon: "assets/icons/gear.png" }
                    ]
                }
            ]
        }
    ],
    csharp: [
        {
            name: "Console Applications",
            icon: "assets/icons/folder.png",
            children: [
                { name: "Snake Game - Overview", path: "pages/project-info.html", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/snake-game-csharp-cli.git", additional: 'snake_game' },
                { name: "Snake Game - Source Code", path: "https://github1s.com/RyanM-Ferreira/snake-game-csharp-cli", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/snake-game-csharp-cli.git" }
            ]
        },
        {
            name: "Godot Projects",
            icon: "assets/icons/folder.png",
            children: [
                { name: "Refractions of Greed (Game Source)", path: "pages/project-info.html", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/refractions-of-greed", additional: 'refractions' }
            ]
        }
    ],
    cpp: [
        {
            name: "Console Applications",
            icon: "assets/icons/folder.png",
            children: [
                { name: "Space Invaders - Source Code", path: "https://github.com/RyanM-Ferreira/space-invaders-cpp-cli", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/space-invaders-cpp-cli" }
            ]
        }
    ],
    javascript: [
        { name: "This Portfolio (Current Project)", path: "pages/project-info.html", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/RyanM-Ferreira.github.io", additional: 'portfolio' },
        { name: "KomuniUI", path: "pages/project-info.html", icon: "assets/icons/gear.png", git: "https://github.com/RyanM-Ferreira/komuniui-api", additional: 'komuniui' },
    ],
    about: [
        { name: "About Me", path: "Error 404", icon: "assets/icons/gear.png" }
    ],
    internal: [
        { name: "About This Portfolio", path: "pages/template.html", icon: "assets/icons/gear.png", additional: 'porfolio' },
        { name: "Launch New Instance", path: "index.html", icon: "assets/icons/gear.png" }
    ]
};