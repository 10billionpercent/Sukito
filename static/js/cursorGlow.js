document.addEventListener("mousemove", (e) => {
    const glow = document.getElementById("cursor-glow");
    if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    }
});