import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from 'react-spinners';
import Weatherbox from './component/Weatherbox';
import WeatherButton from './component/WeatherButton';

/*
1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다 V
2. 현재 날씨정보에는 도씨, 화씨, 날씨상태 V
3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시) V
4. 도시버튼 클릭 시 도시별 날씨가 나온다
5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
6. 데이터를 들고오는 동안 로딩스피너가 돌아야 함
*/
const API_KEY = import.meta.env.VITE_API_KEY;
// 리액트는 단방향 소통밖에 안되므로 부모 -> 자식, App에 모든 state와 함수를 가지고 있어야 한다.
function App() {
  // getWeatherByCurrentLocation 함수에서 데이터를 받아서 Weatherbox 컴포넌트에 보여준다
  const [weather, setWeather] = useState(null);
  // city 정보 state, WeatherButton 프롭스로 넘김
  const [city, setCity] = useState('');
  // 로딩스피너
  const [loading, setLoading] = useState(true);
  // 도시정보, 100개 1000개 이상의 도시정보들이 들어올 수 있으니 배열을 사용한 것
  const cities = [
    'Taipei',
    'Barcelona',
    'Chiang Mai',
    'Takamatsu',
  ];
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
    // 섭씨 표현: units=metric 추가
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr`;
    // 자료 받아오기 전에 로딩 표시
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log('data', data);
    // 데이터 값을 setWeather로 넣어주기
    setWeather(data);
    // 받아온 후 로딩 끄기
    setLoading(false);
  };
  // 현재위치 도시 불러오는 함수
  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity('');
    } else {
      setCity(city);
    }
  };
  // 도시 정보 불러오는 함수
  const getWeatherByCity = async () => {
    // 클릭하여 변경된 city state를 담는다
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=kr`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    // 클릭하여 변경된 도시의 날씨정보
    setWeather(data);
    setLoading(false);
  };

  // 앱이 렌더된 이후에 바로 city가 없으면 getCurrentLocation 함수가 실행, city가 있으면? 클릭됬으면 getWeatherByCity함수가 실행
  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // // 배열안에 city가 업데이트 될 때마다 useEffect 함수 호출
  // useEffect(() => {
  //   // console.log('city',city)
  //   getWeatherByCity();
  // }, [city]);
  return (
    <div>
      {/* 삼항연산으로 로딩일때 선별적으로 박스UI표시 */}
      {loading ? (
        <div className="container">
          { /* 로딩스피너 */ }
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          {/* 프롭스로 weather data 넘김  */}
          <Weatherbox weather={weather} />
          {/* 프롭스로 cities 넘김 / setCity도 넘김 */}
          <WeatherButton
            cities={cities}
            setCity={city}
            handleCityChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;