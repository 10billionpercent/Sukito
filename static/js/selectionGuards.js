function shakeElement(element) {
  element.classList.add("shake");
  window.setTimeout(() => {
    element.classList.remove("shake");
  }, 400);
}

function updatePillIcon(pill, isSelected) {
  const icon = pill.querySelector("i.bi");
  if (!icon) return;

  icon.classList.toggle("bi-plus", !isSelected);
  icon.classList.toggle("bi-x", isSelected);
}

function bindSelectionGuard(selector, maxSelected) {
  const pills = document.querySelectorAll(selector);

  pills.forEach((pill) => {
    pill.addEventListener("click", (event) => {
      event.preventDefault();

      const selected = document.querySelectorAll(`${selector}.selected`);
      const isAlreadySelected = pill.classList.contains("selected");

      if (isAlreadySelected) {
        pill.classList.remove("selected");
        updatePillIcon(pill, false);
        return;
      }

      if (selected.length < maxSelected) {
        pill.classList.add("selected");
        updatePillIcon(pill, true);
        return;
      }

      selected.forEach((selectedPill) => {
        shakeElement(selectedPill);
      });
    });
  });
}

bindSelectionGuard(".genre-pill", 5);
bindSelectionGuard(".status-pill", 1);
bindSelectionGuard(".type-pill", 1);
