import React from "react";

export default function AskFlow({
  askCfg,
  showAskStart,
  hasTypedQuestion,
  askQuestion,
  setAskQuestion,
  formData,
  onFormChange,
  onAskQuestionSubmit,
  onSubmitForm,
  isSubmittingLead,
  isLeadLocked,
  savedLead,
}) {
  return (
    <div className="flow-section ask-flow-section">
      <div className="ask-flow-inner">
        {!showAskStart ? (
          <div className="chat-message bot typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : !hasTypedQuestion ? (
          <>
            <div className="step-question">
              {askCfg.q1 || "What question do you have?"}
            </div>

            <form className="chat-form" onSubmit={onAskQuestionSubmit}>
              <textarea
                className="ask-textarea"
                value={askQuestion}
                onChange={(e) => setAskQuestion(e.target.value)}
                placeholder={askCfg.placeholder || "Type your question here..."}
                required
                rows="3"
              />

              <button className="cta-btn" type="submit">
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="step-question">
              {askCfg.contactPrompt ||
                "Please confirm or update your contact information so our team can follow up."}
            </div>

            <form className="chat-form" onSubmit={onSubmitForm}>
              <input
                name="name"
                value={isLeadLocked ? savedLead?.name || "" : formData.name}
                onChange={onFormChange}
                placeholder="First & Last Name"
                required
                disabled={isLeadLocked}
              />

              <input
                type="email"
                name="email"
                value={isLeadLocked ? savedLead?.email || "" : formData.email}
                onChange={onFormChange}
                placeholder="Email"
                required
                disabled={isLeadLocked}
              />

              <input
                type="tel"
                name="phone"
                value={isLeadLocked ? savedLead?.phone || "" : formData.phone}
                onChange={onFormChange}
                placeholder="Phone"
                required
                disabled={isLeadLocked}
              />

              <button
                className="cta-btn"
                type="submit"
                disabled={isSubmittingLead}
              >
                {isSubmittingLead
                  ? "Sending…"
                  : askCfg.returningButton || "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}