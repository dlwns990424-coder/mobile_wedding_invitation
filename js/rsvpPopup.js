const RSVP_POPUP_STORAGE_KEY = 'hideRsvpPopupUntil';

function rsvpPopupContent() {
  return `
    <p class="popup-heading">·˚ 참석 여부를 알려주세요 ·˚</p>
    <p class="popup-body">
      특별한 날을 축하하는 마음으로 참석해 주시는 모든 분들을
      정성껏 모실 수 있도록 참석 여부 전달을 부탁드립니다.
    </p>
    <p class="popup-date">2027년 2월 20일(토) 11:00<br>벡스코 W웨딩홀 지하1층</p>
    <label class="popup-hide">
      <input type="checkbox" id="hide-today-checkbox"> 오늘 하루 보지 않기
    </label>
    <button class="pill-btn" id="popup-rsvp-btn">참석여부 남기기</button>
  `;
}

function initRsvpPopup() {
  const modalBody = document.querySelector('#modal-rsvp-intro .modal__body');
  if (!modalBody) return;
  modalBody.innerHTML = rsvpPopupContent();

  document.getElementById('hide-today-checkbox').addEventListener('change', (e) => {
    if (e.target.checked) {
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      localStorage.setItem(RSVP_POPUP_STORAGE_KEY, String(midnight.getTime()));
    } else {
      localStorage.removeItem(RSVP_POPUP_STORAGE_KEY);
    }
  });

  document.getElementById('popup-rsvp-btn').addEventListener('click', () => {
    renderRsvpForm();
  });

  const hideUntil = Number(localStorage.getItem(RSVP_POPUP_STORAGE_KEY) || 0);
  if (Date.now() < hideUntil) return;
  openModal('modal-rsvp-intro');
}
