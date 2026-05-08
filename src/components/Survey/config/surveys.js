import { seniorLivingSurvey } from "../data/seniorLiving";
import { downsizingSurvey } from "../data/downsizing";
import { memorySupportSurvey } from "../data/memorySupport";
import { affordabilitySurvey } from "../data/affordability";
import careNeedsSurvey from "../data/careNeeds";

// 🔥 ADD IT HERE (below imports, above exports or below — either is fine)
export const surveyList = [
  { key: "senior-living", label: "Senior Living Assessment" },
  { key: "downsizing", label: "Downsizing Guide" },
  { key: "memory-support", label: "Memory Support Assessment" },
  { key: "affordability", label: "Cost & Affordability" },
  { key: "care-needs", label: "Care Needs Assessment" },
];

export const surveys = {
  "senior-living": seniorLivingSurvey,
  downsizing: downsizingSurvey,
  "memory-support": memorySupportSurvey,
  affordability: affordabilitySurvey,
  "care-needs": careNeedsSurvey,
};

export function getSurvey(surveyKey) {
  return surveys[surveyKey] || surveys["senior-living"];
}