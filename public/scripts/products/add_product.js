const realFileInput = document.getElementById("real-file");
const customText = document.getElementById("custom-text");

realFileInput.addEventListener("change", function () {
  if (realFileInput.files.length > 0) {
    customText.textContent = realFileInput.files[0].name;
  } else {
    customText.textContent = "No file chosen";
  }
});
