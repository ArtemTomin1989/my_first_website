document.addEventListener("DOMContentLoaded", () => {
  const showDeleteFormBtn = document.getElementById("showDeleteFormBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  showDeleteFormBtn.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
    document.body.classList.add("modal-open");
  });

  cancelDeleteBtn.addEventListener("click", () => {
    closeModal();
  });

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay.style.display === "flex") {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});
