function renderAccountList(side) {
  return accounts[side].map((a) => `
    <div class="account-row">
      <p class="account-row__who">${a.role} <b>${a.name}</b> <a href="tel:${a.tel}"><img src="img/call.png" alt="전화 연결" class="call-icon"></a></p>
      <div class="account-row__number">
        <span>${a.bank} ${a.number}</span>
        <button class="copy-btn" data-copy="${a.number}"><img src="img/copy.png" alt="복사" class="copy-icon"></button>
      </div>
    </div>
  `).join('');
}

function initAccountSection() {
  document.querySelectorAll('[data-open-account]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const side = btn.dataset.openAccount;
      document.querySelector('#modal-account .modal__body').innerHTML = renderAccountList(side);
      openModal('modal-account');
    });
  });
}
