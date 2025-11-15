import React, { useState } from 'react';
import './ChatBox.css';

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showInquiries, setShowInquiries] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  const [dayOffset, setDayOffset] = useState(0);
  const [visitorInfo, setVisitorInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const inquiries = [
    'How can I help you?',
    'Schedule A Visit',
    'Product Information',
    'Pricing and Plans',
    'Technical Support',
    'Account Issues',
    'General Questions'    
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInquiryClick = (inquiry) => {
    setMessages([...messages, { text: inquiry, sender: 'user' }]);
    setShowInquiries(false);
    setShowBackButton(false);
    
    if (inquiry === 'Schedule A Visit') {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Great! Please select a date for your visit:', sender: 'bot' }]);
        setShowDatePicker(true);
      }, 1000);
      return;
    }
    
    // Simulate bot response based on inquiry
    setTimeout(() => {
      let response = '';
      switch(inquiry) {
        case 'Product Information':
          response = 'I can help you with product details. What would you like to know?';
          break;
        case 'Pricing and Plans':
          response = 'Let me help you understand our pricing options.';
          break;
        case 'Technical Support':
          response = 'I\'m here to assist with technical issues. What problem are you experiencing?';
          break;
        case 'Account Issues':
          response = 'I can help with account-related questions. What do you need assistance with?';
          break;
        case 'General Questions':
          response = 'Feel free to ask me anything!';
          break;
        default:
          response = 'Thanks for your message! How can I assist you further?';
      }
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setShowBackButton(true);
    }, 1000);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getVisibleDays = () => {
    const allDays = getDaysInMonth(currentMonth);
    const validDays = allDays.filter(day => day !== null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter out past dates and get future dates starting from today
    const futureDays = validDays.filter(day => day >= today);
    
    const startIndex = dayOffset;
    return futureDays.slice(startIndex, startIndex + 4);
  };

  const canNavigatePrev = () => {
    return dayOffset > 0;
  };

  const canNavigateNext = () => {
    const allDays = getDaysInMonth(currentMonth);
    const validDays = allDays.filter(day => day !== null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDays = validDays.filter(day => day >= today);
    return dayOffset + 4 < futureDays.length;
  };

  const navigateDays = (direction) => {
    if (direction === -1 && canNavigatePrev()) {
      setDayOffset(dayOffset - 1);
    } else if (direction === 1 && canNavigateNext()) {
      setDayOffset(dayOffset + 1);
    }
  };

  const handleDayClick = (date) => {
    if (date && date >= new Date().setHours(0, 0, 0, 0)) {
      setTempSelectedDate(date);
    }
  };

  const handleCalendarConfirm = () => {
    if (tempSelectedDate) {
      setSelectedDate(tempSelectedDate.toISOString().split('T')[0]);
      setMessages(prev => [...prev, { 
        text: `Selected date: ${tempSelectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, 
        sender: 'user' 
      }]);
      setShowDatePicker(false);
      setTempSelectedDate(null);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Great! Please provide your information:', sender: 'bot' }]);
        setShowVisitorForm(true);
      }, 1000);
    }
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
    setDayOffset(0);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setMessages(prev => [...prev, { text: `Selected time: ${time}`, sender: 'user' }]);
    setShowTimePicker(false);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Great! Please provide your information:', sender: 'bot' }]);
      setShowVisitorForm(true);
    }, 1000);
  };

  const handleVisitorFormSubmit = (e) => {
    e.preventDefault();
    if (visitorInfo.fullName && visitorInfo.email && visitorInfo.phone) {
      setMessages(prev => [...prev, { 
        text: `Name: ${visitorInfo.fullName}\nEmail: ${visitorInfo.email}\nPhone: ${visitorInfo.phone}`, 
        sender: 'user' 
      }]);
      setShowVisitorForm(false);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: `Thank you, ${visitorInfo.fullName}! Your visit is scheduled for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}. We'll send a confirmation to ${visitorInfo.email}.`, 
          sender: 'bot' 
        }]);
        setShowBackButton(true);
        setVisitorInfo({ fullName: '', email: '', phone: '' });
        setSelectedDate('');
        setSelectedTime('');
      }, 1000);
    }
  };

  const handleBackToMenu = () => {
    setShowInquiries(true);
    setShowBackButton(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowVisitorForm(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      setShowInquiries(false);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message!', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbox-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chat</h3>
            <button onClick={toggleChat} className="close-btn">&times;</button>
          </div>
          <div className="chatbox-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">Hello! How can I help you?</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
            {showInquiries ? (
              <div className="inquiries-container">
                <div className="inquiries-title">Select an inquiry:</div>
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
            ) : showDatePicker ? (
              <div className="date-picker-container">
                <div className="calendar-header">
                  <button type="button" onClick={() => changeMonth(-1)} className="nav-btn">‹</button>
                  <span className="month-year">
                    {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <button type="button" onClick={() => changeMonth(1)} className="nav-btn">›</button>
                </div>
                <div className="calendar-row-container">
                  <button 
                    type="button" 
                    onClick={() => navigateDays(-1)} 
                    className="day-nav-btn"
                    disabled={!canNavigatePrev()}
                  >
                    ‹
                  </button>
                  <div className="calendar-days-row">
                    {getVisibleDays().map((date, index) => {
                      const isPast = date && date < new Date().setHours(0, 0, 0, 0);
                      const isSelected = date && tempSelectedDate && date.toDateString() === tempSelectedDate.toDateString();
                      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
                      
                      return (
                        <div 
                          key={date.toISOString()} 
                          className={`calendar-day ${isPast ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleDayClick(date)}
                        >
                          <div className="day-number">{date.getDate()}</div>
                          <div className="day-name">{dayOfWeek}</div>
                        </div>
                      );
                    })}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => navigateDays(1)} 
                    className="day-nav-btn"
                    disabled={!canNavigateNext()}
                  >
                    ›
                  </button>
                </div>
                {tempSelectedDate && (
                  <div className="time-slots-inline">
                    <div className="time-slots-grid">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          className="time-slot-inline"
                          onClick={() => {
                            setSelectedTime(time);
                            setSelectedDate(tempSelectedDate.toISOString().split('T')[0]);
                            const formattedDate = tempSelectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            setMessages(prev => [...prev, { 
                              text: `Date: ${formattedDate}\nTime: ${time}`, 
                              sender: 'user' 
                            }]);
                            setShowDatePicker(false);
                            setTempSelectedDate(null);
                            setTimeout(() => {
                              setMessages(prev => [...prev, { text: 'Great! Please provide your information:', sender: 'bot' }]);
                              setShowVisitorForm(true);
                            }, 1000);
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : showTimePicker ? (
              <div className="time-picker-container">
                <div className="time-slots">
                  {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time, index) => (
                    <button
                      key={index}
                      className="time-slot-btn"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ) : showVisitorForm ? (
              <div className="visitor-form-container">
                <form onSubmit={handleVisitorFormSubmit} className="visitor-form">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={visitorInfo.fullName}
                    onChange={(e) => setVisitorInfo({...visitorInfo, fullName: e.target.value})}
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={visitorInfo.email}
                    onChange={(e) => setVisitorInfo({...visitorInfo, email: e.target.value})}
                    className="form-input"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={visitorInfo.phone}
                    onChange={(e) => setVisitorInfo({...visitorInfo, phone: e.target.value})}
                    className="form-input"
                    required
                  />
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            ) : (
              showBackButton && (
                <div className="back-to-menu-container">
                  <button className="back-to-menu-btn" onClick={handleBackToMenu}>
                    ← Back to Menu
                  </button>
                </div>
              )
            )}
          </div>
          <form onSubmit={handleSendMessage} className="chatbox-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <button onClick={toggleChat} className="chat-toggle-btn">
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default ChatBox;
