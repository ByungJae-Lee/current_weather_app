import React from 'react';

// 계속 props.~~로 데이터를 받으면 불편함 -> 매개변수쪽에 {컴포넌트 지정한 이름} 치면 prop.~~와 같은 효과
// props.weather = {weather} 같은의미
const Weatherbox = ({ weather }) => {
  console.log(weather);
  return (
    <div className="weather-box">
      {/* weather.name만 쓰면 에러가 남, 렌더상태에 null이라서 보여줄게 없기 때문
      따라서  {weather && weather.name} 해도 되지만 {weather?.name}도 같은의미 
      weather가 참이면 name을 보여줘라*/}
      <h1>{weather?.name}</h1>
      {/* 날씨상태 */}
      <h2>{weather?.weather[0].description}</h2>
      {/* 온도 */}
      <h3>{`현재 ${Math.floor(weather?.main.temp)}Cº/ 체감 ${Math.floor(weather?.main.feels_like)}Cº`}</h3>
      <h3>{`최고 ${Math.floor(weather?.main.temp_max)}Cº/ 최저 ${Math.floor(weather?.main.temp_min)}Cº`}</h3>
      <h3>{`풍속 ${weather?.wind.speed} m/s`}</h3>
      <h3>{`습도 ${weather?.main.humidity} %`}</h3>
    </div>
  );
};

export default Weatherbox;
