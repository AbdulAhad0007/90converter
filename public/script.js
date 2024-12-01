const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
});
const fadeElement = document.getElementById('fadeElement');
window.addEventListener('scroll', function() {
  const rect = fadeElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    fadeElement.classList.add('opacity-100', 'translate-y-0');
  }
});