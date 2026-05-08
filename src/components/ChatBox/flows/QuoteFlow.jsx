import React from "react";
import StepCTAs from "../StepCTAs";
import BubbleStep from "../BubbleStep";

export default function QuoteFlow({
  quoteCfg,
  quoteSelections,
  projectTypes,
  clientTypes,
  timelines,
  onSelectProjectType,
  onSelectClientType,
  onSelectTimeline,
  showQuoteForm,
  showQuoteSubmit,
  formData,
  onFormChange,
  onSubmitForm,
  isSubmittingLead,
}) {
  return (
    <div className="pricing-section">
      {quoteCfg.intro && <div className="step-question">{quoteCfg.intro}</div>}

      <div className="step-block">
        <div className="step-question">
          {quoteCfg.q1 || "What type of project is this?"}
        </div>

        {quoteSelections.projectType === null ? (
          <StepCTAs
            options={projectTypes}
            onSelect={onSelectProjectType}
          />
        ) : (
          <BubbleStep
            options={projectTypes}
            selected={quoteSelections.projectType}
            onSelect={onSelectProjectType}
          />
        )}
      </div>

      {quoteSelections.projectType && (
        <div className="step-block">
          <div className="step-question">
            {quoteCfg.q2 || "Who are you?"}
          </div>

          {quoteSelections.clientType === null ? (
            <StepCTAs
              options={clientTypes}
              onSelect={onSelectClientType}
            />
          ) : (
            <BubbleStep
              options={clientTypes}
              selected={quoteSelections.clientType}
              onSelect={onSelectClientType}
            />
          )}
        </div>
      )}

      {quoteSelections.projectType && quoteSelections.clientType && (
        <div className="step-block">
          <div className="step-question">
            {quoteCfg.q3 || "What is your timeline?"}
          </div>

          {quoteSelections.timeline === null ? (
            <StepCTAs
              options={timelines}
              onSelect={onSelectTimeline}
            />
          ) : (
            <BubbleStep
              options={timelines}
              selected={quoteSelections.timeline}
              onSelect={onSelectTimeline}
            />
          )}
        </div>
      )}

      {showQuoteForm && (
        <div className="step-block">
          <div className="step-question">
            {quoteCfg.contactPrompt ||
              "Please provide your contact details so we can follow up."}
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
        </div>
      )}

      {showQuoteSubmit && (
        <div className="step-block">
          <div className="step-question">
            {quoteCfg.returningPrompt ||
              "Welcome back! We’ll follow up with your quote request."}
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
                : quoteCfg.returningButton || "Submit Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}