import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

/* ==========================
   CONFIG — UPDATED FOR NORWOOD CROSSING
========================== */

/* MAIN MENU OPTIONS */
const MAIN_MENU_OPTIONS = [
  'Schedule a Visit',
  'Living Options',
  'Community Life',
  'View Floor Plans',
  'Pricing',
  'Job Inquiry',
  'Ask Us Anything',
];

/* LIVING OPTIONS — UPDATED */
const LIVING_OPTIONS_CTAS = [
  'Assisted Living',
  'Memory Support',
  'Skilled Nursing',
  'Short Term Rehab',
  'Respite Care',
];

/* COMMUNITY LIFE — UPDATED, GALLERY REMOVED */
const COMMUNITY_LIFE_CTAS = [
  'About',
  'Amenities',
  'History',
  'Events',
];

/* COMMUNITY LIFE LINKS — UPDATED, NO GALLERY */
const COMMUNITY_LIFE_LINKS = {
  About: 'https://norwoodcrossing.christiancareallen.org/about/',
  Amenities: 'https://norwoodcrossing.christiancareallen.org/amenities-services/',
  History: 'https://norwoodcrossing.christiancareallen.org/history/',
  Events: 'https://norwoodcrossing.christiancareallen.org/amenities-services/',
};

/* PRICING OPTIONS (unchanged) */
const PRICING_LIVING_OPTIONS_CTAS = [
  'Independent Living',
  'Assisted Living',
  'Memory Care',
  'Skilled Nursing',
  'Not Sure',
  'Other',
];

const WHO_IS_THIS_FOR_CTAS = ['Myself', 'Parent', 'Spouse', 'Relative', 'Friend', 'Other'];
const TIMELINE_CTAS = ['Immediately', '1 to 3 Months', '3 Months +', 'Just Researching'];

const SCHEDULE_TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM',
];

/* MAIN MENU LINKS — UPDATED */
const LINKS = {
  floorPlans: 'https://norwoodcrossing.christiancareallen.org/floor-plans/',
  jobInquiry: 'https://norwoodcrossing.christiancareallen.org/careers/',
  
  /* Living Options direct URLs */
  assisted: 'https://norwoodcrossing.christiancareallen.org/assisted-living/',
  memory: 'https://norwoodcrossing.christiancareallen.org/memory-support/',
  skilled: 'https://norwoodcrossing.christiancareallen.org/skilled-care/',
  rehab: 'https://norwoodcrossing.christiancareallen.org/short-term-rehab/',
  respite: 'https://norwoodcrossing.christiancareallen.org/respite-care/',
};

const INITIAL_FORM = { name: '', email: '', phone: '' };
const INITIAL_PRICING = { livingOption: null, whoIsThisFor: null, timeline: null };
const INITIAL_SCHEDULE = { date: null, time: null };

/* Helpers */
const formatDateLabel = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/* ==========================
   COMPONENTS
========================== */

const ChatHeader = ({ onClose }) => (
  <div className="chatbox-header">
    <div className="chatbox-header-left">
      <img
        src="https://norwoodcrossing.christiancareallen.org/wp-content/uploads/2025/11/cropped-Norwood-Icon-COLOR-1.jpg"
        className="chatbox-logo"
        alt="Community Logo"
      />
      <div className="chatbox-header-text">
        <div className="chatbox-title">Norwood Crossing</div>
        <div className="chatbox-subtitle">Senior Living</div>
      </div>
    </div>

    <button className="chat-close-btn" onClick={onClose}>
      ×
    </button>
  </div>
);

const ChatMessages = ({ messages }) => (
  <div className="chat-messages">
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`chat-message ${msg.sender} ${msg.isWelcome ? 'welcome' : ''}`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

const MainMenuBubbleNav = ({ active, onSelect }) => (
  <div className="mainmenu-bubble-nav">
    {MAIN_MENU_OPTIONS.map((option) => (
      <button
        key={option}
        className={`nav-bubble ${active === option ? 'active' : ''}`}
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

const MainMenuButtons = ({ visible, onClick }) => {
  if (!visible) return null;

  return (
    <div className="chatbox-ctas">
      {MAIN_MENU_OPTIONS.map((option) => (
        <button key={option} className="cta-btn" onClick={() => onClick(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

const StepCTAs = ({ options, onSelect }) => (
  <div className="step-cta-list">
    {options.map((option) => (
      <button key={option} className="step-cta-btn" onClick={() => onSelect(option)}>
        {option}
      </button>
    ))}
  </div>
);

const BubbleStep = ({ question, options, selected, onSelect }) => (
  <div className="step-block">
    {question && <div className="step-question">{question}</div>}

    <div className="bubble-group">
      {options.map((option) => (
        <button
          key={option}
          className={`bubble ${selected === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

/* ==========================
   SCHEDULE CALENDAR (unchanged)
========================== */

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const weekdayShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const toISODate = (date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const ScheduleCalendar = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initial = selectedDate ? new Date(selectedDate) : today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (year, month, day) => {
    const test = new Date(year, month, day);
    test.setHours(0, 0, 0, 0);
    return test < today;
  };

  const handleClick = (day) => {
    if (!day) return;
    if (isDisabled(viewYear, viewMonth, day)) return;
    onSelectDate(toISODate(new Date(viewYear, viewMonth, day)));
  };

  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    const d = new Date(selectedDate);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  };

  return (
    <div className="schedule-calendar">
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={() => {
            const newMonth = viewMonth - 1;
            if (newMonth < 0) {
              setViewYear((y) => y - 1);
              setViewMonth(11);
            } else {
              setViewMonth(newMonth);
            }
          }}
        >
          ‹
        </button>

        <div className="calendar-title">
          {monthNames[viewMonth]} {viewYear}
        </div>

        <button
          className="calendar-nav-btn"
          onClick={() => {
            const newMonth = viewMonth + 1;
            if (newMonth > 11) {
              setViewYear((y) => y + 1);
              setViewMonth(0);
            } else {
              setViewMonth(newMonth);
            }
          }}
        >
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {weekdayShort.map((d) => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}

        {cells.map((day, idx) => {
          if (day === null)
            return <div key={idx} className="calendar-day empty"></div>;

          const disabled = isDisabled(viewYear, viewMonth, day);
          const selected = isSelected(viewYear, viewMonth, day);

          return (
            <button
              key={idx}
              className={`calendar-day ${
                disabled ? 'disabled-date' : ''
              } ${selected ? 'selected-date' : ''}`}
              disabled={disabled}
              onClick={() => handleClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================
   PART 1 ENDS HERE
========================== */

