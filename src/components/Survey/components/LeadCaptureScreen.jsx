import React, { useMemo, useState } from "react";

export default function LeadCaptureScreen({
  client,
  result,
  initialValues,
  onBack,
  onSubmit,
}) {
  const [form, setForm] = useState({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    consent: initialValues?.consent || false,
  });

  const surveyLead = client?.survey?.leadCapture || {};
  const primaryColor =
    client?.survey?.branding?.primaryColor || "#8b2c1a";
  const primaryHoverColor =
    client?.survey?.branding?.primaryHoverColor || "#6f2215";

  const copy = {
    title:
      surveyLead.title || "See Your Recommendation",
    subtitle:
      surveyLead.subtitle ||
      "Before we show your results, share your details so the community team can follow up with helpful next steps.",
    firstNameLabel: surveyLead.firstNameLabel || "First Name",
    lastNameLabel: surveyLead.lastNameLabel || "Last Name",
    emailLabel: surveyLead.emailLabel || "Email",
    phoneLabel: surveyLead.phoneLabel || "Phone",
    consentLabel:
      surveyLead.consentLabel ||
      "I agree to be contacted about senior living options.",
    submitLabel: surveyLead.submitLabel || "Show My Results",
    backLabel: surveyLead.backLabel || "Back",
    note:
      surveyLead.note ||
      "Your information stays private and is only used to help with your inquiry.",
  };

  const canSubmit = useMemo(() => {
    const hasNames = form.firstName.trim() && form.lastName.trim();
    const hasEmail = /\S+@\S+\.\S+/.test(form.email.trim());
    const hasPhone = form.phone.trim().length >= 7;
    return hasNames && hasEmail && hasPhone && form.consent;
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit?.({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      consent: form.consent,
      resultKey: result?.key || "",
      resultTitle: result?.title || "",
    });
  };

  return (
    <div className="survey-shell">
      <div className="survey-container">
        <div className="lead-capture-screen">
          <div className="lead-capture-card">
            {client?.survey?.branding?.logo || client?.logoUrl ? (
              <img
                src={client?.survey?.branding?.logo || client?.logoUrl}
                alt={client?.communityName || "Client logo"}
                className="lead-capture-logo"
              />
            ) : null}

            <div className="lead-capture-kicker">Almost done</div>
            <h1 className="lead-capture-title">{copy.title}</h1>
            <p className="lead-capture-subtitle">{copy.subtitle}</p>

            <form className="lead-capture-form" onSubmit={handleSubmit}>
              <div className="lead-capture-grid">
                <label className="lead-capture-field">
                  <span>{copy.firstNameLabel}</span>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First name"
                  />
                </label>

                <label className="lead-capture-field">
                  <span>{copy.lastNameLabel}</span>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last name"
                  />
                </label>
              </div>

              <label className="lead-capture-field">
                <span>{copy.emailLabel}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="name@example.com"
                />
              </label>

              <label className="lead-capture-field">
                <span>{copy.phoneLabel}</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 555-5555"
                />
              </label>

              <label className="lead-capture-consent">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                />
                <span>{copy.consentLabel}</span>
              </label>

              <p className="lead-capture-note">{copy.note}</p>

              <div className="lead-capture-actions">
                <button
                  type="button"
                  className="lead-capture-btn lead-capture-btn-secondary"
                  onClick={onBack}
                >
                  {copy.backLabel}
                </button>

                <button
                  type="submit"
                  className="lead-capture-btn lead-capture-btn-primary"
                  style={{ background: primaryColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = primaryHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = primaryColor;
                  }}
                  disabled={!canSubmit}
                >
                  {copy.submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}