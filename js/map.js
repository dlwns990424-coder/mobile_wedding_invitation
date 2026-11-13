// 카카오맵 JS SDK를 동적으로 불러온 뒤 지도를 그립니다.
// KAKAO_JS_KEY가 설정되지 않았으면 아무 것도 하지 않고 기존 placeholder 문구가 그대로 보입니다.

function loadKakaoMapSdk(onLoad) {
  if (window.kakao && window.kakao.maps) {
    window.kakao.maps.load(onLoad);
    return;
  }
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false`;
  script.onload = () => window.kakao.maps.load(onLoad);
  document.head.appendChild(script);
}

function renderKakaoMap() {
  const container = document.getElementById('kakao-map');
  if (!container) return;

  container.innerHTML = '';
  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(venue.lat, venue.lng),
    level: 3,
  });
  new kakao.maps.Marker({ map, position: map.getCenter() });
}

function initKakaoMap() {
  if (!KAKAO_JS_KEY || KAKAO_JS_KEY === 'YOUR_KAKAO_JAVASCRIPT_KEY') return;
  loadKakaoMapSdk(renderKakaoMap);
}
