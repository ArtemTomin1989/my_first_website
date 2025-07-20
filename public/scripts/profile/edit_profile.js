document.addEventListener("DOMContentLoaded", () => {
  const showDeleteFormBtn = document.getElementById("showDeleteFormBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  const openModal = () => {
    modalOverlay.classList.remove("hidden");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modalOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
  };

  if (showDeleteFormBtn) {
    showDeleteFormBtn.addEventListener("click", openModal);
  }

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("avatar");
  const out = document.getElementById("avatar-file-name");
  if (input && out) {
    input.addEventListener("change", () => {
      out.textContent = input.files?.[0]?.name || "No file chosen";
    });
  }
});
