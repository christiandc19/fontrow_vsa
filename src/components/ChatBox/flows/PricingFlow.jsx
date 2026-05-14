import React, { useEffect, useState } from "react";

const scrollChatToBottom = () => {
  setTimeout(() => {
    const chatMain = document.querySelector(".chatbox-main");

    chatMain?.scrollTo({
      top: chatMain.scrollHeight,
      behavior: "smooth",
    });
  }, 50);
};

export default function PricingFlow({
  pricingCfg,
  pricingSelections,
  onSelectLivingOption,
  onSelectInquiryFor,
  onSelectTimeline,
  formData,
  onFormChange,
  onSubmitForm,
  isSubmittingLead,
}) {
  const livingOptions = pricingCfg?.livingOptions || [];
  const inquiryForOptions = pricingCfg?.inquiryForOptions || [];
  const timelineOptions = pricingCfg?.timelineOptions || [];

  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  const [showQuestion3, setShowQuestion3] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion1(true);
      scrollChatToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pricingSelections.livingOption) {
      setShowQuestion2(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowQuestion2(true);
      scrollChatToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, [pricingSelections.livingOption]);

  useEffect(() => {
    if (!pricingSelections.inquiryFor) {
      setShowQuestion3(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowQuestion3(true);
      scrollChatToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, [pricingSelections.inquiryFor]);

  useEffect(() => {
    if (!pricingSelections.timeline) {
      setShowContactForm(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowContactForm(true);
      scrollChatToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, [pricingSelections.timeline]);

  return (
    <div className="pricing-flow flow-section">
      {!showQuestion1 && (
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {showQuestion1 && (
        <div className="step-block">
          <div className="step-question">
            {pricingCfg?.q1 || "What living option are you interested in?"}
          </div>

          {pricingSelections.livingOption ? (
            <div className="selected-answer-row">
              <button
                type="button"
                className="selected-answer-pill"
                onClick={() => onSelectLivingOption(pricingSelections.livingOption)}
              >
                {pricingSelections.livingOption}
              </button>
            </div>
          ) : (
            <div className="step-cta-list">
              {livingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="step-cta-btn"
                  onClick={() => onSelectLivingOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {pricingSelections.livingOption && !showQuestion2 && (
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {showQuestion2 && (
        <div className="step-block">
          <div className="step-question">
            {pricingCfg?.q2 || "Who is this for?"}
          </div>

          {pricingSelections.inquiryFor ? (
            <div className="selected-answer-row">
              <button
                type="button"
                className="selected-answer-pill"
                onClick={() => onSelectInquiryFor(pricingSelections.inquiryFor)}
              >
                {pricingSelections.inquiryFor}
              </button>
            </div>
          ) : (
            <div className="step-cta-list">
              {inquiryForOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="step-cta-btn"
                  onClick={() => onSelectInquiryFor(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {pricingSelections.inquiryFor && !showQuestion3 && (
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {showQuestion3 && (
        <div className="step-block">
          <div className="step-question">
            {pricingCfg?.q3 || "What is your timeline?"}
          </div>

          {pricingSelections.timeline ? (
            <div className="selected-answer-row">
              <button
                type="button"
                className="selected-answer-pill"
                onClick={() => onSelectTimeline(pricingSelections.timeline)}
              >
                {pricingSelections.timeline}
              </button>
            </div>
          ) : (
            <div className="step-cta-list">
              {timelineOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="step-cta-btn"
                  onClick={() => onSelectTimeline(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {pricingSelections.timeline && !showContactForm && (
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {showContactForm && (
        <div className="step-block">
          <div className="step-question">
            {pricingCfg?.contactPrompt ||
              "Share your contact details and we’ll help you with pricing."}
          </div>

          <form className="chat-form" onSubmit={onSubmitForm}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={onFormChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onFormChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={onFormChange}
            />

            <button
              type="submit"
              className="step-cta-btn"
              disabled={isSubmittingLead}
            >
              {isSubmittingLead ? "Submitting..." : "Request Pricing"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
