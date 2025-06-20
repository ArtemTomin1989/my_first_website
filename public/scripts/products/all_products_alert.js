document.addEventListener('DOMContentLoaded', () => {
  const alert = document.querySelector('.alert-wrapper');
  if (alert) {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 5000); // зникає через 5 сек
  }
});
