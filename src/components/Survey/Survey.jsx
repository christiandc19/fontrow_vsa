import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import SurveyLanding from "./components/SurveyLanding";
import LeadCaptureScreen from "./components/LeadCaptureScreen";
import { getClientConfig } from "../../chatbots/registry";
import { getSurvey } from "./config/surveys";
import { getSurveyResult } from "./utils/surveyUtils";
import SurveyQuestionLayout from "./components/SurveyQuestionLayout";
import "./Survey.css";

const STORAGE_PREFIX = "wsa-survey-state";
const WARNING_TIMEOUT_MS = 8 * 60 * 1000;
const SESSION_TIMEOUT_MS = 10 * 60 * 1000;

export default function Survey() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clientKey, surveyKey } = useParams();

  const resolvedClientKey = clientKey || "robin-run";
  const resolvedSurveyKey = surveyKey || "senior-living";

  const survey = getSurvey(resolvedSurveyKey);
  const client = getClientConfig(resolvedClientKey);

  const storageKey = `${STORAGE_PREFIX}-${resolvedClientKey}-${resolvedSurveyKey}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({
    whoFor: { label: "Mom", value: "mom" },
  });
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const totalSteps = survey?.questions?.length || 0;
  const isStartRoute = location.pathname.endsWith("/start");
  const isResultsRoute = location.pathname.endsWith("/results");
  const isLandingRoute = !isStartRoute && !isResultsRoute;
  const isQuestionFlow = isStartRoute && currentIndex < totalSteps;
  const isLeadCaptureStep = isStartRoute && currentIndex >= totalSteps && !leadSubmitted;
  const isComplete = currentIndex >= totalSteps && leadSubmitted;

  const currentQuestion =
    survey && currentIndex < totalSteps ? survey.questions[currentIndex] : null;

  const result = useMemo(() => {
    if (!survey) return null;
    return getSurveyResult(answers, survey);
  }, [answers, survey]);

  useEffect(() => {
    if (!survey || !client) {
      setIsHydrated(true);
      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);

        setCurrentIndex(
          typeof parsed.currentIndex === "number" ? parsed.currentIndex : 0
        );

        setAnswers(
          parsed.answers && typeof parsed.answers === "object"
            ? parsed.answers
            : { whoFor: { label: "Mom", value: "mom" } }
        );

        setLead(
          parsed.lead && typeof parsed.lead === "object"
            ? parsed.lead
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                consent: false,
              }
        );

        setLeadSubmitted(!!parsed.leadSubmitted);
      }
    } catch (error) {
      console.error("Failed to restore survey state:", error);
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey, survey, client]);

  useEffect(() => {
    if (!isHydrated || !survey || !client) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          currentIndex,
          answers,
          lead,
          leadSubmitted,
        })
      );
    } catch (error) {
      console.error("Failed to save survey state:", error);
    }
  }, [currentIndex, answers, lead, leadSubmitted, isHydrated, storageKey, survey, client]);

  useEffect(() => {
    if (!isHydrated || !survey) return;

    const basePath = `/assessments/${resolvedClientKey}/${resolvedSurveyKey}`;

    if (isComplete && !isResultsRoute) {
      navigate(`${basePath}/results`, { replace: true });
      return;
    }

    if (!isComplete && isResultsRoute) {
      navigate(`${basePath}/start`, { replace: true });
    }
  }, [
    isHydrated,
    isComplete,
    isResultsRoute,
    navigate,
    resolvedClientKey,
    resolvedSurveyKey,
    survey,
  ]);

  useEffect(() => {
    const handleTimeout = () => {
      setShowTimeoutWarning(false);
      navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}`, {
        replace: true,
      });
    };

    const resetTimers = () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);

      warningTimerRef.current = setTimeout(() => {
        setShowTimeoutWarning(true);
      }, WARNING_TIMEOUT_MS);

      timerRef.current = setTimeout(() => {
        handleTimeout();
      }, SESSION_TIMEOUT_MS);
    };

    const handleActivity = () => {
      setShowTimeoutWarning(false);
      resetTimers();
    };

    const events = ["click", "keydown", "scroll", "mousemove", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    resetTimers();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [navigate, resolvedClientKey, resolvedSurveyKey]);

  const handleStart = () => {
    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/start`);
  };

const handleAnswer = (question, value) => {
  if (!question) return;

  const selectedOption = question.options.find(
    (opt) => opt.value === value
  );

  setAnswers((prev) => ({
    ...prev,
    [question.id]: selectedOption,
  }));
};

  const handleBack = () => {
    if (currentIndex > 0 && currentIndex <= totalSteps) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const currentAnswer = answers[currentQuestion.id];
    const hasAnswer = currentQuestion.multi
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : !!currentAnswer;

    if (!hasAnswer) return;

    const isLastQuestion = currentIndex === totalSteps - 1;

    if (isLastQuestion) {
      setCurrentIndex(totalSteps);
      navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/start`, {
        replace: true,
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleLeadSubmit = (leadData) => {
    setLead(leadData);
    setLeadSubmitted(true);

    // placeholder for API submission later
    console.log("Survey lead submitted:", {
      clientKey: resolvedClientKey,
      surveyKey: resolvedSurveyKey,
      answers,
      lead: leadData,
      result,
    });

    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}/results`, {
      replace: true,
    });
  };

  const handleRestart = () => {
    setAnswers({
      whoFor: { label: "Mom", value: "mom" },
    });
    setLead({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consent: false,
    });
    setLeadSubmitted(false);
    setCurrentIndex(0);
    localStorage.removeItem(storageKey);
    navigate(`/assessments/${resolvedClientKey}/${resolvedSurveyKey}`, {
      replace: true,
    });
  };

  const handlePrimaryResultAction = () => {
    const actions = client?.survey?.actions || {};
    let url = actions.primary;

    if (result?.key === "memory-support") {
      url = actions.memory || url;
    }

    if (
      result?.key === "assisted-living" ||
      result?.key === "supportive-care"
    ) {
      url = actions.assisted || url;
    }

    if (url) {
      window.location.href = url;
    }
  };

  const timeoutWarning = showTimeoutWarning ? (
    <div className="survey-timeout-warning">
      <p>Still there?</p>
      <button
        type="button"
        onClick={() => {
          setShowTimeoutWarning(false);
        }}
      >
        Continue
      </button>
    </div>
  ) : null;

  if (!survey) {
    return <div>Survey config not found for "{resolvedSurveyKey}".</div>;
  }

  if (!client) {
    return <div>Client config not found for "{resolvedClientKey}".</div>;
  }

  if (!client?.survey?.enabled) {
    return <div>Survey is not available for this client.</div>;
  }

  if (!isHydrated) {
    return null;
  }

  if (isLandingRoute) {
    return (
      <>
      {timeoutWarning}
      <SurveyLanding
        title={survey.landing.title}
        subtitle={survey.landing.subtitle}
        cta={client?.survey?.landing?.ctaLabel || survey.landing.cta}
        onStart={handleStart}
        client={client}
        surveyKey={resolvedSurveyKey}
      />
      </>
    );
  }

  if (isQuestionFlow) {
    return (
      <>
        {timeoutWarning}
        <SurveyQuestionLayout
          title={client?.communityName || "Assessment"}
        subtitle={`Step ${currentIndex + 1} of ${totalSteps}`}
        question={currentQuestion?.question}
        options={currentQuestion?.options || []}
        selected={answers[currentQuestion?.id]?.value}
        onSelect={(val) => handleAnswer(currentQuestion, val)}
        onNext={handleNext}
      />
      </>
    );
  }

  if (isLeadCaptureStep) {
    return (
      <>
        {timeoutWarning}
        <LeadCaptureScreen
          client={client}
          result={result}
          initialValues={lead}
          onBack={() => setCurrentIndex(totalSteps - 1)}
          onSubmit={handleLeadSubmit}
        />
      </>
    );
  }

  if (isResultsRoute && isComplete) {
    return (
      <div className="survey-shell">
        {timeoutWarning}
        <div className="survey-container">
          <ResultScreen
            result={result}
            client={client}
            onRestart={handleRestart}
            onPrimaryAction={handlePrimaryResultAction}
          />
        </div>
      </div>
    );
  }

  return null;
}