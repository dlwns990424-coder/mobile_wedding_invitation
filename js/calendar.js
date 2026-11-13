// 2단계: SAVE THE DATE 섹션 — 달력 렌더링 + 디데이 텍스트
const WEDDING_DATE = new Date('2027-02-20T11:00:00');

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  const year = WEDDING_DATE.getFullYear();
  const month = WEDDING_DATE.getMonth(); // 0-indexed
  const highlightDay = WEDDING_DATE.getDate();

  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < firstWeekday; i++) html += '<span></span>';
  for (let d = 1; d <= lastDate; d++) {
    html += `<span class="${d === highlightDay ? 'is-wedding-day' : ''}">${d}</span>`;
  }
  grid.innerHTML = html;
}

function renderDday() {
  const el = document.getElementById('dday-text');
  if (!el) return;

  const diffDays = Math.round((Date.now() - WEDDING_DATE.getTime()) / 86400000);
  const names = '<b>호기</b> & <b>초은</b>';

  if (diffDays === 0) {
    el.innerHTML = `${names} 의 결혼식이 <span class="dday-highlight">오늘</span>입니다!`;
  } else if (diffDays > 0) {
    el.innerHTML = `${names} 결혼한지 <span class="dday-highlight">${diffDays}일</span> 되었습니다`;
  } else {
    el.innerHTML = `${names} 결혼까지 <span class="dday-highlight">${-diffDays}일</span> 남았습니다`;
  }
}
