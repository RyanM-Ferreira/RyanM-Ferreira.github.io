window.category = {
    social: [
        { name: "Github Profile", path: "https://github.com/RyanM-Ferreira", icon: "assets/icons/github.png" },
        { name: "Mail me", path: "mailto:ryanmatheusferreira@outlook.com.br", icon: "assets/icons/mail.png" },
        { name: "LinkedIn", path: "", icon: "assets/icons/gear.png" }
    ],
    about: [
        { name: "Desktop.ini", path: "index.html", icon: "assets/icons/gear.png" },
        { name: "About this Project", path: "pages/project-info.html", icon: "assets/icons/gear.png", additional: 'portfolio' },
        {
            name: "Submenu", icon: "assets/icons/arrow.png",
            children: [
                { name: "Placeholder", path: "", icon: "assets/icons/gear.png" },
                {
                    name: "Other Submenu", icon: "assets/icons/arrow.png",
                    children: [
                        { name: "Mail me", path: "mailto:ryanmatheusferreira@outlook.com.br", icon: "assets/icons/mail.png" },
                    ],
                }
            ],
        },
    ],
    utilities: [
        { name: "Desktop.ini", path: "index.html", icon: "assets/icons/gear.png" },
        {
            name: "System", icon: "assets/icons/arrow.png",
            children: [
                { name: "Placeholder", path: "", icon: "assets/icons/gear.png" },
            ],
        },
        {
            name: "Others", icon: "assets/icons/arrow.png",
            children: [
                { name: "Placeholder", path: "", icon: "assets/icons/gear.png" },
            ],
        },
    ],
};