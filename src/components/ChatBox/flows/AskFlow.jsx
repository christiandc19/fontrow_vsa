import React from "react";

export default function AskFlow({
  askCfg,
  hasTypedQuestion,
  askQuestion,
  setAskQuestion,
  showAskForm,
  showAskSubmit,
  formData,
  onFormChange,
  onAskQuestionSubmit,
  onSubmitForm,
  isSubmittingLead,
}) {
  return (
    <div className="flow-section">
      {!hasTypedQuestion ? (
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
      ) : showAskForm ? (
        <>
          <div className="step-question">
            {askCfg.contactPrompt ||
              "Please share your contact details so we can follow up."}
          </div>

          <form className="chat-form" onSubmit={onSubmitForm}>
            <input
              name="name"
              value={formData.name}
              onChange={onFormChange}
              placeholder="First & Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              placeholder="Email"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              placeholder="Phone"
              required
            />
            <button className="cta-btn" type="submit" disabled={isSubmittingLead}>
              {isSubmittingLead ? "Sending…" : "Submit"}
            </button>
          </form>
        </>
      ) : showAskSubmit ? (
        <>
          <div className="step-question">
            {askCfg.returningPrompt ||
              "Thanks! We’ll follow up with you about your question."}
          </div>

          <div className="existing-user-info">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>

            <button
              className="cta-btn"
              onClick={onSubmitForm}
              disabled={isSubmittingLead}
              type="button"
            >
              {isSubmittingLead
                ? "Sending…"
                : askCfg.returningButton || "Submit Question"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}