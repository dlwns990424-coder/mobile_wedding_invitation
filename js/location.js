// 실제 기기(모바일)에서 앱이 설치되어 있으면 해당 앱으로, 없으면 반응이 없거나
// 스토어로 안내될 수 있습니다. PC 브라우저에서는 정상적으로 열리지 않는 것이 정상입니다.
function buildMapLinks({ name, lat, lng }) {
  const encodedName = encodeURIComponent(name);
  return {
    naver: `https://map.naver.com/v5/search/${encodedName}`,
    kakaonavi: `kakaonavi://navigate?name=${encodedName}&x=${lng}&y=${lat}&coord_type=wgs84`,
    tmap: `tmap://route?goalname=${encodedName}&goalx=${lng}&goaly=${lat}`,
  };
}

function initLocationLinks() {
  const links = buildMapLinks(venue);

  const naverBtn = document.getElementById('map-naver');
  const kakaoBtn = document.getElementById('map-kakaonavi');
  const tmapBtn = document.getElementById('map-tmap');

  if (naverBtn) naverBtn.href = links.naver;
  if (kakaoBtn) kakaoBtn.href = links.kakaonavi;
  if (tmapBtn) tmapBtn.href = links.tmap;

  const openBtn = document.getElementById('open-map-btn');
  if (openBtn) {
    openBtn.addEventListener('click', () => openModal('modal-map'));
  }
}
