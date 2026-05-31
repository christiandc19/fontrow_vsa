import React, { useEffect, useState } from "react";
import StepCTAs from "../StepCTAs";
import BubbleStep from "../BubbleStep";
import ScheduleCalendar from "../ScheduleCalendar";

export default function ScheduleFlow({
  scheduleCfg,
  callSelections,
  callTimeSlots,
  formatDateLabel,
  onSelectCallDate,
  onSelectCallTime,
  formData,
  onFormChange,
  onSubmitForm,
  isSubmittingLead,
  isLeadLocked = false,
  savedLead = null,
}) {
  const hasSelectedDate = !!callSelections.date;
  const hasSelectedDateAndTime = !!(callSelections.date && callSelections.time);

  const [showScheduleStart, setShowScheduleStart] = useState(false);
  const [showTimeQuestion, setShowTimeQuestion] = useState(false);

  const contactName = isLeadLocked ? savedLead?.name || "" : formData.name;
  const contactEmail = isLeadLocked ? savedLead?.email || "" : formData.email;
  const contactPhone = isLeadLocked ? savedLead?.phone || "" : formData.phone;

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatMain = document.querySelector(".chatbox-main");
      if (!chatMain) return;

      chatMain.scrollTo({
        top: chatMain.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScheduleStart(true);
      scrollToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!callSelections.date) {
      setShowTimeQuestion(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowTimeQuestion(true);
      scrollToBottom();
    }, 1400);

    return () => clearTimeout(timer);
  }, [callSelections.date]);

  return (
    <div className="schedule-section">
      {!showScheduleStart ? (
        <div className="chat-message bot typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <>
          {scheduleCfg.intro && (
            <div className="step-question">{scheduleCfg.intro}</div>
          )}

          <div className="step-block">
            <div className="step-question">
              {scheduleCfg.q1 || "What date would you like to schedule a visit?"}
            </div>

            <ScheduleCalendar
              selectedDate={callSelections.date}
              onSelectDate={onSelectCallDate}
            />

            {hasSelectedDate && (
              <div className="schedule-selected">
                Selected date: <span>{formatDateLabel(callSelections.date)}</span>
              </div>
            )}
          </div>

          {hasSelectedDate && !showTimeQuestion && (
            <div className="chat-message bot typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          {hasSelectedDate && showTimeQuestion && (
            <div className="step-block">
              <div className="step-question">
                {scheduleCfg.q2 || "What time works best for you?"}
              </div>

              {!callSelections.time ? (
                <StepCTAs options={callTimeSlots} onSelect={onSelectCallTime} />
              ) : (
                <BubbleStep
                  options={callTimeSlots}
                  selected={callSelections.time}
                  onSelect={onSelectCallTime}
                />
              )}
            </div>
          )}

          {hasSelectedDateAndTime && (
            <div className="step-block">
              <div className="step-question">
                {isLeadLocked
                  ? "Your contact details are saved. You can submit another visit request with the same contact information."
                  : scheduleCfg.contactPrompt ||
                    "Please confirm or update your contact details and we’ll confirm your visit."}
              </div>

              <form className="chat-form" onSubmit={onSubmitForm}>
                <input
                  name="name"
                  value={contactName}
                  onChange={onFormChange}
                  placeholder="First & Last Name"
                  required
                  disabled={isLeadLocked}
                />

                <input
                  type="email"
                  name="email"
                  value={contactEmail}
                  onChange={onFormChange}
                  placeholder="Email"
                  required
                  disabled={isLeadLocked}
                />

                <input
                  type="tel"
                  name="phone"
                  value={contactPhone}
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
                    : scheduleCfg.returningButton || "Schedule Visit"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
