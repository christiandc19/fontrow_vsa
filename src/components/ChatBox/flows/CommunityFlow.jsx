import React, { useState } from "react";

export default function CommunityFlow({ community, onSelectFlow }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = Array.isArray(community?.images) ? community.images : [];
  const buttons = Array.isArray(community?.buttons) ? community.buttons : [];
  const currentImage = images[activeImageIndex];

  const goNext = () => {
    if (!images.length) return;

    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    if (!images.length) return;

    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleButtonClick = (button) => {
    if (button.type === "link" && button.url) {
      window.location.href = button.url;
      return;
    }

    if (button.type === "flow" && button.flowId) {
      onSelectFlow(button.flowId);
    }
  };

  return (
    <div className="community-flow">
      <div className="community-gallery">
        {images.length > 1 && (
          <button
            type="button"
            className="gallery-arrow left"
            onClick={goPrev}
            aria-label="Previous community photo"
          >
            ‹
          </button>
        )}

        {currentImage ? (
          <img
            src={currentImage.src}
            alt={currentImage.alt || "Community photo"}
            className="community-image"
          />
        ) : (
          <div className="community-image-fallback">
            Community image coming soon
          </div>
        )}

        {images.length > 1 && (
          <button
            type="button"
            className="gallery-arrow right"
            onClick={goNext}
            aria-label="Next community photo"
          >
            ›
          </button>
        )}
      </div>

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
