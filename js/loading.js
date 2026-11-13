function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  const hide = () => {
    screen.classList.add('is-hidden');
    setTimeout(() => { screen.style.display = 'none'; }, 500);
  };

  const minDelay = new Promise((resolve) => setTimeout(resolve, 600));
  const pageLoad = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });

  Promise.all([minDelay, pageLoad]).then(hide);
}
