import { robinRunClient } from "../data/clients/robinRun";

export const clients = {
  "robin-run": robinRunClient,
};

export function getSurveyClient(clientKey) {
  return clients[clientKey] || clients["robin-run"];
}