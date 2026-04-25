import React from "react";

export default function LivingOptionsFlow({ config }) {
  const options = config?.livingOptions || [];

  return (
    <div className="chatbox-ctas">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="cta-btn"
          onClick={() => {
            window.open(option.url, "_blank", "noopener,noreferrer");
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}