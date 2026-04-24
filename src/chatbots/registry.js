import fontrowConfig from "./clients/fontrow";
import itanexConfig from "./clients/itanex";
import robinRunConfig from "./clients/robinRun";

const chatbotRegistry = {
  fontrow: fontrowConfig,
  itanex: itanexConfig,
  "robin-run": robinRunConfig,
};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || chatbotRegistry["fontrow"];
}