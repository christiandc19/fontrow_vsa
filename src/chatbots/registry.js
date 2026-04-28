import fontrowConfig from "./clients/fontrow";
import robinRunConfig from "./clients/robinRun";

const chatbotRegistry = {
  fontrow: fontrowConfig,
  "robin-run": robinRunConfig,
};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || chatbotRegistry["fontrow"];
}