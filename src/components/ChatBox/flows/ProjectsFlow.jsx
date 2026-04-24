import React from "react";
import StepCTAs from "../StepCTAs";

export default function ProjectsFlow({ title, projects, onSelect }) {
  return (
    <div className="flow-section">
      <div className="step-question">{title}</div>

      <StepCTAs
        options={projects.map((project) => project.label)}
        onSelect={onSelect}
      />
    </div>
  );
}