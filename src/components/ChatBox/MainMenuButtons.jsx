import React from "react";

export default function MainMenuButtons({
  items,
  visible,
  onSelect,
  className = "",
}) {

  if (!visible) return null;

  return (
    <div className={`chatbox-ctas ${className}`}>      
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