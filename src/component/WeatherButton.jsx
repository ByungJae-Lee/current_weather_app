import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  // console.log(cities);
  return (
    <div>
      <Button variant="warning">Current Location</Button>
      {/* map메서드로 순회하며 버튼을 그림,
      onClick */}
      {cities.map((item, index) => (
        <Button
          variant="warning"
          key={index}
          // 버튼을 클릭하면 -> App에 있는 city를 설정해준다
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
