const material = require("./material.js");

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts}"],
    theme: {
        colors: {
            ...material.colors,
            bg: "#121418",
            divider: "rgba(255, 255, 255, 0.08)",
            highlight: "rgba(255, 255, 255, 0.08)",
            overlay: "rgba(0, 0, 0, 0.2)",
            accent: {
                light: material.colors["green-100"],
                DEFAULT: material.colors["green-500"],
                dark: material.colors["green-700"],
            },
        },
        extend: {},
    },
    plugins: [],
};
