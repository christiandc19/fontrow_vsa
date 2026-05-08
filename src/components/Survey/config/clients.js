import robinRun from "../../../chatbots/clients/robinRun";
import evergreenHeights from "../../../chatbots/clients/evergreenHeights";

export const clients = {
  "robin-run": robinRun,
  "evergreen-heights": evergreenHeights,
};

export function getSurveyClient(clientKey) {
  return clients[clientKey];
}