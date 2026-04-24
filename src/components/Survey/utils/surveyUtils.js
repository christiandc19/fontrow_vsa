export function getSurveyResult(answers, survey) {
  if (!survey) {
    return {
      title: "Your Results",
      description: "Thanks for completing the assessment.",
      cta: "Continue",
    };
  }

  if (Array.isArray(survey.results)) {
    for (const result of survey.results) {
      if (typeof result.match === "function" && result.match(answers)) {
        return result;
      }
    }
  }

  return (
    survey.defaultResult || {
      title: "Your Results",
      description: "Thanks for completing the assessment.",
      cta: "Continue",
    }
  );
}