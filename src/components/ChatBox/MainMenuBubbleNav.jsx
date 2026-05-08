import React from "react";

export default function MainMenuBubbleNav({ items, activeId, onSelect }) {
  return (
    <div className="mainmenu-bubble-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-bubble ${activeId === item.id ? "active" : ""}`}
          onClick={() => onSelect(item)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}