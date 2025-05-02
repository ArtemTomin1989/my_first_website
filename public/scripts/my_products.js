document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const modal = document.getElementById("confirmModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const deleteForm = document.getElementById("deleteForm");

  let currentProductId = null;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentProductId = button.getAttribute("data-id");
      deleteForm.setAttribute(
        "action",
        `/delete_my_products/${currentProductId}`
      );
      modal.classList.remove("hidden");
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
