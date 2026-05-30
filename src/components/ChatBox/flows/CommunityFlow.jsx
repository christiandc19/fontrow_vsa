import React, { useEffect, useState } from "react";

export default function CommunityFlow({ community, onSelectFlow }) {
  /* ========================================
     TABS SUPPORT

     Some flows only use community.images.
     Floor Plans uses community.photos and community.floorplans.
  ======================================== */

  const hasTabs =
    Array.isArray(community?.photos) ||
    Array.isArray(community?.floorplans);

  const [activeTab, setActiveTab] = useState(
    community?.defaultTab || "photos"
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = hasTabs
    ? activeTab === "floorplans"
      ? community?.floorplans || []
      : community?.photos || []
    : community?.images || [];

  const buttons = Array.isArray(community?.buttons)
    ? community.buttons
    : [];

  const currentImage = images[activeImageIndex];

  /* Reset slider when changing tabs */
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeTab]);

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
      return;
    }

    if (button.type === "back") {
      onSelectFlow("main-menu");
    }
  };

  return (
    <div className="community-flow">
      <div className="community-gallery-wrap">

        {/* ========================================
            Gallery title
            Helps users understand which section
            they are currently viewing.
        ======================================== */}
    {/* ========================================
        Gallery section label
        Styled like the Floor Plans tabs.
    ======================================== */}

        {hasTabs && (
          <div className="community-tabs">
            <button
              type="button"
              className={`community-tab ${
                activeTab === "photos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>

            <button
              type="button"
              className={`community-tab ${
                activeTab === "floorplans" ? "active" : ""
              }`}
              onClick={() => setActiveTab("floorplans")}
            >
              Floor Plans
            </button>
          </div>
        )}


      {!hasTabs && community?.title && (
        <div className="community-gallery-label">
          {community.title.replace("View ", "")}
        </div>
      )}

        <div className="community-gallery">

                      {images.length > 1 && (
            <button
              type="button"
              className="gallery-arrow left"
              onClick={goPrev}
              aria-label="Previous image"
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
              Image coming soon
            </div>
          )}

          {images.length > 1 && (
            <button
              type="button"
              className="gallery-arrow right"
              onClick={goNext}
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className="community-thumbnails">
            {images.map((image, index) => (
              <button
                key={image.id || index}
                type="button"
                className={`community-thumbnail ${
                  index === activeImageIndex ? "active" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                />
              </button>
            ))}
          </div>
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