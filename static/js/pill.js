if (!window.__pillBound) {
    window.__pillBound = true;

    document.addEventListener("click", (e) => {
      const pill = e.target.closest(".pill");
      if (!pill) return;

      e.preventDefault();
      pill.classList.toggle("selected");

      const icon = pill.querySelector("i.bi");
      if (!icon) return;

      const isSelected = pill.classList.contains("selected");

      icon.classList.toggle(`bi-plus`, !isSelected);
      icon.classList.toggle(`bi-x`, isSelected);
    });
}