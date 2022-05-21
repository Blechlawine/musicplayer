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
            accent: material.colors["green-500"],
        },
        extend: {},
    },
    plugins: [],
};
