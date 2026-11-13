function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add('is-open'));
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('is-open');
  setTimeout(() => { el.hidden = true; }, 200);
}

function initModalCloseHandlers() {
  document.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) {
      closeModal(e.target.closest('.modal').id);
    }
  });
}

function initScrollReveal(selector = '.reveal') {
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.2 });
  targets.forEach((el) => io.observe(el));
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-visible'));

  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 1800);
}

function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      showToast('복사되었습니다');
    });
  });
}

function initBgmToggle() {
  const audio = document.getElementById('bgm');
  const button = document.getElementById('bgm-toggle');
  if (!audio || !button) return;

  document.body.addEventListener('click', () => {
    audio.play().catch(() => {});
  }, { once: true });

  button.addEventListener('click', () => {
    audio.muted = !audio.muted;
    button.textContent = audio.muted ? '🔇' : '🔈';
  });
}
