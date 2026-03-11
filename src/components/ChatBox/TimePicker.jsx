import React from 'react';

const TimePicker = ({ handleTimeSelect }) => {
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'];
  return (
    <div className="time-picker-container">
      <div>Select a time:</div>
      {times.map((time, index) => (
        <button key={index} onClick={() => handleTimeSelect(time)}>{time}</button>
      ))}
    </div>
  );
};

export default TimePicker;
