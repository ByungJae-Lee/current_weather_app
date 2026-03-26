import { useEffect } from 'react';
import './App.css';

/*
1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
2. 현재 날씨정보에는 도씨, 화씨, 날씨상태
3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시)
4. 도시버튼 클릭 시 도시별 날씨가 나온다
5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
6. 데이터를 들고오는 동안 로딩스피터가 돌아야 함
*/

function App() {
  // 현재위치 정보 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // 호출과 동시에 lat, lon정보를 넘김
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  // 현재위치 날씨 함수
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5276c98c6ea7b92a652b3169f3f6e807`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('data', data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return <></>;
}

export default App;
