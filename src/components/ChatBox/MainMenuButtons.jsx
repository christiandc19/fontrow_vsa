import React from "react";

export default function MainMenuButtons({ items, visible, onSelect }) {
  if (!visible) return null;

  return (
    <div className="chatbox-ctas">
      {items.map((item) => (
        <button
          key={item.id}
          className="cta-btn"
          onClick={() => onSelect(item)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}