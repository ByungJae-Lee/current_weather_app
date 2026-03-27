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
      <div>{weather?.name}</div>
      {/* 화시표현 섭씨 *1.8 +32 */}
      <h2>{`현재온도 ${Math.floor(weather?.main.temp)}Cº/ ${Math.floor(weather?.main.temp * 1.8 + 32) }Fº`}</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default Weatherbox;
