import { seniorLivingSurvey } from "../data/seniorLiving";
import { downsizingSurvey } from "../data/downsizing";
import { memorySupportSurvey } from "../data/memorySupport";
import { affordabilitySurvey } from "../data/affordability";

export const surveys = {
  "senior-living": seniorLivingSurvey,
  downsizing: downsizingSurvey,
  "memory-support": memorySupportSurvey,
  affordability: affordabilitySurvey,
};

export function getSurvey(surveyKey) {
  return surveys[surveyKey] || surveys["senior-living"];
}