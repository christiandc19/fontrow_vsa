import fontrowConfig from "./clients/fontrow";
import robinRunConfig from "./clients/robinRun";
import evergreenHeightsConfig from "./clients/evergreenHeights"; // 👈 ADD

const chatbotRegistry = {
  fontrow: fontrowConfig,
  "robin-run": robinRunConfig,
  "evergreen-heights": evergreenHeightsConfig, // 👈 ADD
};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || chatbotRegistry["fontrow"];
}