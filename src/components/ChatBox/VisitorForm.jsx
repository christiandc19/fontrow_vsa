import React, { useState } from 'react';

const VisitorForm = ({ onSubmit }) => {
  const [info, setInfo] = useState({ fullName: '', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <form onSubmit={handleSubmit} className="visitor-form">
      <input
        type="text"
        placeholder="Full Name"
        value={info.fullName}
        onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
        required
        className="form-input"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={info.phone}
        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
        required
        className="form-input"
      />
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default VisitorForm;
