function initLetter() {
  const box = document.getElementById('letterBox');
  if (!box) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => box.classList.add('is-open'), 400);
        io.unobserve(box);
      }
    });
  }, { threshold: 0.4 });

  io.observe(box);
}
