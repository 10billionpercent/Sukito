const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
    if (!glow) return;

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

const compartmentGlowColors = [
    { selector: ".blue-compartment", color: "var(--blue-light)" },
    { selector: ".green-compartment", color: "var(--green-light)" },
    { selector: ".purple-compartment", color: "var(--purple-light)" },
];

compartmentGlowColors.forEach(({ selector, color }) => {
    document.querySelectorAll(selector).forEach((compartment) => {
        compartment.addEventListener("mouseenter", () => {
            if (!glow) return;
            glow.style.backgroundColor = color;
        });

        compartment.addEventListener("mouseleave", () => {
            if (!glow) return;
            glow.style.backgroundColor = "var(--yellow-gentle)";
        });
    });
});
