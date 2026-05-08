import React from "react";
import StepCTAs from "../StepCTAs";

export default function ServicesFlow({ title, services, onSelect }) {
  return (
    <div className="flow-section">
      <div className="step-question">{title}</div>

      <StepCTAs
        options={services.map((service) => service.label)}
        onSelect={onSelect}
      />
    </div>
  );
}