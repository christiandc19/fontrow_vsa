import React from "react";
import ServicesFlow from "./flows/ServicesFlow";
import ProjectsFlow from "./flows/ProjectsFlow";
import QuoteFlow from "./flows/QuoteFlow";
import ScheduleFlow from "./flows/ScheduleFlow";
import AskFlow from "./flows/AskFlow";
import OptionsFlow from "./flows/OptionsFlow";
import CommunityFlow from "./flows/CommunityFlow";
import PricingFlow from "./flows/PricingFlow";

export default function FlowRenderer({
  activeFlowId,
  flowData,
  flowState,
  flowVisibility,
  flowHandlers,
  formatDateLabel,
  // Back button handler from ChatBox
  onBack,
}) 

{

const {
  mergedConfig,
  services,
  projects,
  quoteCfg,
  scheduleCfg,
  askCfg,

  // Pricing flow config
  pricingCfg,

  quoteProjectTypes,
  quoteClientTypes,
  quoteTimelines,
  callTimeSlots,
} = flowData;


  const {
    quoteSelections,
    callSelections,

    // Pricing flow selections
    pricingSelections,

    hasTypedQuestion,
    askQuestion,
    setAskQuestion,
    formData,
    isSubmittingLead,
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
    // Pricing flow handlers
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
      return (
        <OptionsFlow
          config={mergedConfig}
          onBack={onBack}
        />
      );

    case "community":
      return (
        <CommunityFlow
          community={mergedConfig?.community}
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

        default:
          return null;
      }
    }