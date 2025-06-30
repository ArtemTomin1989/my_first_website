document.addEventListener("DOMContentLoaded", () => {
  // ======= Product Delete Modal =======
  const deleteButton = document.querySelector(".delete-btn");
  const modal = document.getElementById("confirmModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const deleteForm = document.getElementById("deleteForm");

  if (deleteButton && deleteForm && modal) {
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = deleteButton.getAttribute("data-id");
      deleteForm.setAttribute("action", `/delete_my_products/${productId}`);
      modal.classList.remove("hidden");
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  // ======= Image Delete Modal =======
  const confirmDeleteImageBtn = document.getElementById(
    "confirmDeleteImageBtn"
  );
  const deleteImageModal = document.getElementById("deleteImageModal");
  const cancelDeleteImageBtn = document.getElementById("cancelDeleteImageBtn");

  if (confirmDeleteImageBtn && deleteImageModal && cancelDeleteImageBtn) {
    confirmDeleteImageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteImageModal.classList.remove("hidden");
    });

    cancelDeleteImageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteImageModal.classList.add("hidden");
    });

    deleteImageModal.addEventListener("click", (e) => {
      if (e.target === deleteImageModal) {
        deleteImageModal.classList.add("hidden");
      }
    });
  }

  // ======= Escape Key for All Modals =======
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal) modal.classList.add("hidden");
      if (deleteImageModal) deleteImageModal.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const realFileBtn = document.getElementById("real-file");
  const customTxt = document.getElementById("custom-text");

  realFileBtn.addEventListener("change", () => {
    if (realFileBtn.files.length > 0) {
      customTxt.innerText = realFileBtn.files[0].name;
    } else {
      customTxt.innerText = "No file chosen";
    }
  });
});
