import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({
  cities,
  setCity,
  handleCityChange,
}) => {
  // console.log(cities);
  return (
    <div className="button_main">
      <Button
        variant={`${setCity === '' ? 'warning' : 'outline-warning'}`}
        onClick={() => handleCityChange('current')}
      >
        Current Location
      </Button>
      {/* map메서드로 순회하며 버튼을 그림,
      onClick */}
      {cities.map((city) => (
        <Button
          variant={`${setCity === city ? 'warning' : 'outline-warning'}`}
          // 버튼을 클릭하면 -> App에 있는 city를 설정해준다
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
