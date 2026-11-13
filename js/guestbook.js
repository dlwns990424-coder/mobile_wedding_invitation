// 축하 메시지 — 내가 작성한 메시지만 이 브라우저의 localStorage에 저장/삭제됩니다.
// (나중에 Supabase로 옮길 때는 loadGuestbookEntries/saveGuestbookEntries/deleteGuestbookEntry만
//  서버 호출로 바꾸면 되도록, "내가 쓴 글" 데이터와 "원래 있던 샘플 글"을 분리해서 다룹니다.)
const GUESTBOOK_ENTRIES_KEY = 'guestbookEntries';
const GUESTBOOK_POSTITS = ['img/postit_1.png', 'img/postit_2.png'];

function makeGuestbookId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadGuestbookEntries() {
  return JSON.parse(localStorage.getItem(GUESTBOOK_ENTRIES_KEY) || '[]');
}

function saveGuestbookEntries(entries) {
  localStorage.setItem(GUESTBOOK_ENTRIES_KEY, JSON.stringify(entries));
}

function deleteGuestbookEntry(id) {
  saveGuestbookEntries(loadGuestbookEntries().filter((n) => n.id !== id));
}

function renderGuestbookNote(n, i) {
  const bg = GUESTBOOK_POSTITS[i % 2];
  const deleteBtn = n.id
    ? `<button type="button" class="sticky-note__delete" data-delete-id="${n.id}" aria-label="메시지 삭제">×</button>`
    : '';
  return `
    <div class="sticky-note" style="background-image: url('${bg}'); transform: rotate(${n.rotate}deg);">
      ${deleteBtn}
      <p class="sticky-note__name">${n.name}</p>
      <p class="sticky-note__message">${n.message}</p>
    </div>
  `;
}

function renderGuestbookList() {
  const wrap = document.querySelector('.guestbook-marquee');
  const track = document.getElementById('guestbook-track');
  if (!track) return;

  const all = [...loadGuestbookEntries(), ...initialGuestbook];
  const html = all.map(renderGuestbookNote).join('');
  track.innerHTML = html + html;
  if (wrap) wrap.scrollLeft = 0;
}

function initGuestbookMarquee() {
  const wrap = document.querySelector('.guestbook-marquee');
  const track = document.getElementById('guestbook-track');
  if (!wrap || !track) return;

  let autoPlay = true;
  let resumeTimer = null;
  const STEP_PX = 1;    // 한 번에 움직이는 픽셀
  const TICK_MS = 16;   // 몇 ms마다 움직일지 (화면 주사율에 가깝게, 약 60px/s)

  setInterval(() => {
    if (!autoPlay) return;
    wrap.scrollLeft += STEP_PX;
    const half = track.scrollWidth / 2;
    if (half > 0 && wrap.scrollLeft >= half) wrap.scrollLeft -= half;
  }, TICK_MS);

  function scheduleResume() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { autoPlay = true; }, 2000);
  }
  function pauseAuto() {
    autoPlay = false;
    scheduleResume(); // pointerup이 끝까지 안 와도 2초 뒤엔 무조건 재개되는 안전장치
  }

  let isDragging = false;
  let dragMoved = false;
  let startX = 0;
  let startScroll = 0;

  wrap.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragMoved = false;
    pauseAuto();
    startX = e.clientX;
    startScroll = wrap.scrollLeft;
    wrap.classList.add('is-dragging');
    try { wrap.setPointerCapture(e.pointerId); } catch (err) { /* 일부 환경에서 미지원 */ }
  });

  wrap.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragMoved = true;
    wrap.scrollLeft = startScroll - dx;
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    wrap.classList.remove('is-dragging');
    scheduleResume();
  }
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);

  wrap.addEventListener('click', (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}

function initGuestbook() {
  renderGuestbookList();
  initGuestbookMarquee();

  const track = document.getElementById('guestbook-track');
  track.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-delete-id]');
    if (!btn) return;
    if (!confirm('이 메시지를 삭제하시겠습니까?')) return;
    deleteGuestbookEntry(btn.dataset.deleteId);
    renderGuestbookList();
  });

  const form = document.getElementById('guestbook-form');
  const toggleBtn = document.getElementById('guestbook-write-btn');
  const counter = document.getElementById('guestbook-char-counter');

  function updateCounter() {
    counter.textContent = `${form.message.value.length}/50`;
  }
  updateCounter();
  form.message.addEventListener('input', updateCounter);

  toggleBtn.addEventListener('click', () => {
    openModal('modal-guestbook');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim().slice(0, 8);
    const message = form.message.value.trim().slice(0, 50);
    if (!name || !message) return;

    const entries = loadGuestbookEntries();
    entries.unshift({
      id: makeGuestbookId(),
      name,
      message,
      rotate: Math.round(Math.random() * 6 - 3),
    });
    saveGuestbookEntries(entries);
    renderGuestbookList();
    form.reset();
    updateCounter();
    closeModal('modal-guestbook');
  });
}
