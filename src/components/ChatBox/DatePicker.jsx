import React from 'react';

const DatePicker = ({ handleDateSelect }) => {
  const dates = ['2025-11-15', '2025-11-16', '2025-11-17', '2025-11-18'];
  return (
    <div className="date-picker-container">
      <div>Select a date:</div>
      {dates.map((date, index) => (
        <button key={index} onClick={() => handleDateSelect(date)}>{date}</button>
      ))}
    </div>
  );
};

export default DatePicker;
