// Fade-in on scroll
window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

// Button ripple click effect
document.querySelectorAll(".button, .button-outline").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    this.appendChild(circle);

    const x = e.clientX - this.getBoundingClientRect().left;
    const y = e.clientY - this.getBoundingClientRect().top;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    setTimeout(() => circle.remove(), 600);
  });
});
