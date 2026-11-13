// 3단계: RSVP 폼 — 제출 내역은 이 브라우저의 localStorage에 저장됩니다.
const RSVP_ENTRIES_KEY = 'rsvpEntries';
const RSVP_ADMIN_PASSWORD = '1234';

function rsvpFormContent() {
  return `
    <form id="rsvp-modal-form" class="rsvp-modal-form">
      <input type="text" name="name" placeholder="성함 (필수)" maxlength="8" required>
      <input type="tel" name="phone" placeholder="연락처 (-없이 숫자만 입력해주세요)" inputmode="numeric" pattern="[0-9]*" maxlength="11">

      <p class="form-label">신랑측 / 신부측 <span class="form-label__required">(필수)</span></p>
      <div class="toggle-row" data-toggle-group="side">
        <button type="button" class="toggle-btn is-selected" data-value="groom">신랑측</button>
        <button type="button" class="toggle-btn" data-value="bride">신부측</button>
      </div>

      <p class="form-label">참석 여부 <span class="form-label__required">(필수)</span></p>
      <div class="toggle-row" data-toggle-group="attend">
        <button type="button" class="toggle-btn is-selected" data-value="yes">참석</button>
        <button type="button" class="toggle-btn" data-value="no">불참</button>
      </div>

      <button type="submit" class="pill-btn">제출하기</button>
    </form>
  `;
}

function renderRsvpForm() {
  const modalBody = document.querySelector('#modal-rsvp-intro .modal__body');
  if (!modalBody) return;
  modalBody.innerHTML = rsvpFormContent();

  modalBody.querySelectorAll('.toggle-row').forEach((row) => {
    row.querySelectorAll('.toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        row.querySelectorAll('.toggle-btn').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
      });
    });
  });

  const form = document.getElementById('rsvp-modal-form');
  form.phone.addEventListener('input', () => {
    form.phone.value = form.phone.value.replace(/\D/g, '').slice(0, 11);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim().slice(0, 8);
    if (!name) return;

    const side = modalBody.querySelector('[data-toggle-group="side"] .is-selected').dataset.value;
    const attend = modalBody.querySelector('[data-toggle-group="attend"] .is-selected').dataset.value;
    const entries = JSON.parse(localStorage.getItem(RSVP_ENTRIES_KEY) || '[]');
    entries.push({ name, phone: form.phone.value.trim(), side, attend, submittedAt: Date.now() });
    localStorage.setItem(RSVP_ENTRIES_KEY, JSON.stringify(entries));

    closeModal('modal-rsvp-intro');
    showToast('제출이 완료되었습니다');
  });
}

function initRsvp() {
  const btn = document.getElementById('open-rsvp-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    renderRsvpForm();
    openModal('modal-rsvp-intro');
  });
}

function rsvpAdminPasswordContent() {
  return `
    <p class="popup-heading">참석자 확인하기</p>
    <form id="rsvp-admin-password-form" class="rsvp-modal-form">
      <input type="password" name="password" placeholder="비밀번호" required>
      <p id="rsvp-admin-error" class="rsvp-admin-error" hidden>비밀번호가 올바르지 않습니다.</p>
      <button type="submit" class="pill-btn">확인</button>
    </form>
  `;
}

function formatPhone(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return digits || '-';
}

function rsvpAdminListContent() {
  const entries = JSON.parse(localStorage.getItem(RSVP_ENTRIES_KEY) || '[]');
  const groomList = entries.filter((e) => e.side === 'groom');
  const brideList = entries.filter((e) => e.side === 'bride');

  const renderGroup = (list) => {
    if (!list.length) return '<p class="rsvp-admin-empty">아직 제출된 내역이 없습니다.</p>';
    return `<ul class="rsvp-admin-list">${list.map((e) => `
      <li><span class="rsvp-admin-name">${e.name}</span><span class="rsvp-admin-phone">${formatPhone(e.phone)}</span></li>
    `).join('')}</ul>`;
  };

  return `
    <p class="popup-heading">참석자 확인하기</p>
    <div class="toggle-row" data-toggle-group="admin-side">
      <button type="button" class="toggle-btn is-selected" data-value="groom">신랑측</button>
      <button type="button" class="toggle-btn" data-value="bride">신부측</button>
    </div>
    <div class="rsvp-admin-panel" data-panel="groom">${renderGroup(groomList)}</div>
    <div class="rsvp-admin-panel" data-panel="bride" hidden>${renderGroup(brideList)}</div>
  `;
}

function initRsvpAdminTabs(modalBody) {
  const row = modalBody.querySelector('[data-toggle-group="admin-side"]');
  if (!row) return;
  row.querySelectorAll('.toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      row.querySelectorAll('.toggle-btn').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      modalBody.querySelectorAll('.rsvp-admin-panel').forEach((panel) => {
        panel.hidden = panel.dataset.panel !== btn.dataset.value;
      });
    });
  });
}

function renderRsvpAdminPassword() {
  const modalBody = document.querySelector('#modal-rsvp-admin .modal__body');
  if (!modalBody) return;
  modalBody.innerHTML = rsvpAdminPasswordContent();

  const form = document.getElementById('rsvp-admin-password-form');
  const error = document.getElementById('rsvp-admin-error');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.password.value === RSVP_ADMIN_PASSWORD) {
      modalBody.innerHTML = rsvpAdminListContent();
      initRsvpAdminTabs(modalBody);
    } else {
      error.hidden = false;
    }
  });
}

function initRsvpAdmin() {
  const btn = document.getElementById('open-rsvp-admin-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    renderRsvpAdminPassword();
    openModal('modal-rsvp-admin');
  });
}
