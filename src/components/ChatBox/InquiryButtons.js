import React from 'react';
import './InquiryButtons.css';

const InquiryButtons = ({ inquiries, handleInquiryClick }) => (
  <div className="inquiries-container">
    {inquiries.map((inquiry, index) => (
      <button
        key={index}
        className="inquiry-btn"
        onClick={() => handleInquiryClick(inquiry)}
      >
        {inquiry}
      </button>
    ))}
  </div>
);

export default InquiryButtons;
