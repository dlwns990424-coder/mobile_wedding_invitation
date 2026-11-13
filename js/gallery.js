// 3단계: 갤러리 — 실제 사진 전까지 회색 블록으로 영역 크기만 표시합니다.
// 실제 사진이 준비되면 renderGalleryItem()에서 <div class="gallery-item-ph">를
// <img src="assets/images/실제파일명.jpg">로 교체하면 됩니다.
const GALLERY_PAGE_SIZE = 9;
const GALLERY_TOTAL_PHOTOS = 18;

let galleryVisibleCount = GALLERY_PAGE_SIZE;

function renderGalleryItem() {
  return '<div class="gallery-item-ph"></div>';
}

function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  const moreBtn = document.getElementById('gallery-more-btn');

  grid.innerHTML = Array.from({ length: galleryVisibleCount }, renderGalleryItem).join('');
  moreBtn.hidden = galleryVisibleCount >= GALLERY_TOTAL_PHOTOS;
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const moreBtn = document.getElementById('gallery-more-btn');
  if (!grid || !moreBtn) return;

  renderGalleryGrid();

  moreBtn.addEventListener('click', () => {
    galleryVisibleCount = Math.min(galleryVisibleCount + GALLERY_PAGE_SIZE, GALLERY_TOTAL_PHOTOS);
    renderGalleryGrid();
  });
}
