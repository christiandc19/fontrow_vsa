import React from "react";
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
}) {
  const hasSelectedDateAndTime = !!(callSelections.date && callSelections.time);

  return (
    <div className="schedule-section">
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

        {callSelections.date && (
          <div className="schedule-selected">
            Selected date: <span>{formatDateLabel(callSelections.date)}</span>
          </div>
        )}
      </div>

      {callSelections.date && (
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
            {scheduleCfg.contactPrompt ||
              "Please confirm or update your contact details and we’ll confirm your visit."}
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
              {isSubmittingLead
                ? "Sending…"
                : scheduleCfg.returningButton || "Schedule Visit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
