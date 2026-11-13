document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();

  renderCalendar();
  renderDday();
  renderGallery();

  initScrollReveal();
  initModalCloseHandlers();
  initCopyButtons();
  initBgmToggle();
  initAccountSection();
  initGuestbook();
  initRsvp();
  initRsvpAdmin();
  initRsvpPopup();
  initShare();
  initLocationLinks();
  initKakaoMap();
  initLetter();
});
