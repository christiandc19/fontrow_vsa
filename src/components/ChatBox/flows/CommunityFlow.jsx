import React, { useState } from "react";

export default function CommunityFlow({
  community,
  onSelectFlow,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = community?.images || [];
  const buttons = community?.buttons || [];

  const currentImage = images[activeImageIndex];

  const goNext = () => {
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleButtonClick = (button) => {
    // Opens website links
    if (button.type === "link" && button.url) {
      window.location.href = button.url;
    }

    // Opens another chatbot flow
    if (button.type === "flow" && button.flowId) {
      onSelectFlow(button.flowId);
    }
  };

  return (
    <div className="community-flow">
      {/* LEFT SIDE - IMAGE GALLERY */}
      <div className="community-gallery">
        <button
          type="button"
          className="gallery-arrow left"
          onClick={goPrev}
        >
          ‹
        </button>

        {currentImage && (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="community-image"
          />
        )}

        <button
          type="button"
          className="gallery-arrow right"
          onClick={goNext}
        >
          ›
        </button>
      </div>

      {/* RIGHT SIDE - CTA BUTTONS */}
      <div className="community-actions">
        {buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            className="community-action-btn"
            onClick={() => handleButtonClick(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}