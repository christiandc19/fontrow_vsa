import React from "react";
import ServicesFlow from "./flows/ServicesFlow";
import ProjectsFlow from "./flows/ProjectsFlow";
import QuoteFlow from "./flows/QuoteFlow";
import ScheduleFlow from "./flows/ScheduleFlow";
import AskFlow from "./flows/AskFlow";
import OptionsFlow from "./flows/OptionsFlow";
import CommunityFlow from "./flows/CommunityFlow";
import PricingFlow from "./flows/PricingFlow";
import CommunityLifeFlow from "./flows/CommunityLifeFlow";

export default function FlowRenderer({
  activeFlowId,
  flowData,
  flowState,
  flowVisibility,
  flowHandlers,
  formatDateLabel,
  onBack,
}) {
  const {
    mergedConfig,
    services,
    projects,
    quoteCfg,
    scheduleCfg,
    askCfg,
    pricingCfg,
    quoteProjectTypes,
    quoteClientTypes,
    quoteTimelines,
    callTimeSlots,
  } = flowData;

  const {
    quoteSelections,
    callSelections,
    pricingSelections,
    hasTypedQuestion,
    askQuestion,
    setAskQuestion,
    formData,
    isSubmittingLead,

    // Ask flow typing animation
    showAskStart,
  } = flowState;

  const {
    showQuoteForm,
    showQuoteSubmit,
    showScheduleForm,
    showScheduleSubmit,
    showAskForm,
    showAskSubmit,
  } = flowVisibility;

  const {
    handleServiceSelect,
    handleProjectSelect,
    handleCommunityFlowSelect,
    handleSelectPricingLivingOption,
    handleSelectPricingInquiryFor,
    handleSelectPricingTimeline,
    handleSelectProjectType,
    handleSelectClientType,
    handleSelectTimeline,
    handleSelectCallDate,
    handleSelectCallTime,
    handleAskQuestionSubmit,
    handleFormChange,
    handleSubmitForm,
  } = flowHandlers;

  switch (activeFlowId) {
    case "services":
      return (
        <ServicesFlow
          title={mergedConfig?.servicesTitle || "Please select a service:"}
          services={services}
          onSelect={handleServiceSelect}
        />
      );

    case "projects":
      return (
        <ProjectsFlow
          title={mergedConfig?.projectsTitle || "Select a project category:"}
          projects={projects}
          onSelect={handleProjectSelect}
        />
      );

    case "quote":
      return (
        <QuoteFlow
          quoteCfg={quoteCfg}
          quoteSelections={quoteSelections}
          projectTypes={quoteProjectTypes}
          clientTypes={quoteClientTypes}
          timelines={quoteTimelines}
          onSelectProjectType={handleSelectProjectType}
          onSelectClientType={handleSelectClientType}
          onSelectTimeline={handleSelectTimeline}
          showQuoteForm={showQuoteForm}
          showQuoteSubmit={showQuoteSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmitForm={handleSubmitForm}
          isSubmittingLead={isSubmittingLead}
        />
      );

    case "schedule":
    case "demo":
      return (
        <ScheduleFlow
          scheduleCfg={scheduleCfg}
          callSelections={callSelections}
          callTimeSlots={callTimeSlots}
          formatDateLabel={formatDateLabel}
          onSelectCallDate={handleSelectCallDate}
          onSelectCallTime={handleSelectCallTime}
          showScheduleForm={showScheduleForm}
          showScheduleSubmit={showScheduleSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmitForm={handleSubmitForm}
          isSubmittingLead={isSubmittingLead}
        />
      );

    case "ask":
      return (
        <AskFlow
          askCfg={askCfg}
          showAskStart={showAskStart}
          hasTypedQuestion={hasTypedQuestion}
          askQuestion={askQuestion}
          setAskQuestion={setAskQuestion}
          showAskForm={showAskForm}
          showAskSubmit={showAskSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          onAskQuestionSubmit={handleAskQuestionSubmit}
          onSubmitForm={handleSubmitForm}
          isSubmittingLead={isSubmittingLead}
        />
      );

    case "options":
      return <OptionsFlow config={mergedConfig} onBack={onBack} />;

    case "community":
      return (
        <CommunityFlow
          community={mergedConfig?.community}
          onSelectFlow={handleCommunityFlowSelect}
        />
      );

    case "dining":
      return (
        <CommunityFlow
          community={mergedConfig?.dining}
          onSelectFlow={handleCommunityFlowSelect}
        />
      );

    case "floorplans":
      return (
        <CommunityFlow
          community={mergedConfig?.floorplans}

          // Reuse the same flow handler used by Community/Dining.
          // This lets the floor plan button trigger Back to Main Menu.
          onSelectFlow={handleCommunityFlowSelect}
        />
      );      

    case "pricing":
      return (
        <PricingFlow
          pricingCfg={pricingCfg}
          pricingSelections={pricingSelections}
          onSelectLivingOption={handleSelectPricingLivingOption}
          onSelectInquiryFor={handleSelectPricingInquiryFor}
          onSelectTimeline={handleSelectPricingTimeline}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmitForm={handleSubmitForm}
          isSubmittingLead={isSubmittingLead}
        />
      );

    case "community-life":
      return (
        <CommunityLifeFlow
          communityLife={mergedConfig?.communityLife}
          onSelectFlow={handleCommunityFlowSelect}
          onBack={onBack}
        />
      );

    default:
      return null;
  }
}
