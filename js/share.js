function initShare() {
  const btn = document.getElementById('share-btn');
  if (!btn) return;

  const originalText = btn.textContent;

  btn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url: location.href });
      } catch (e) {
        // 사용자가 공유를 취소한 경우 등은 무시
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(location.href);
      btn.textContent = '링크가 복사되었습니다';
      setTimeout(() => { btn.textContent = originalText; }, 1500);
    } catch (e) {
      // 클립보드 권한이 없는 환경 등은 조용히 무시
    }
  });
}
