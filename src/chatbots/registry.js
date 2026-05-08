import fontrowConfig from "./clients/fontrow";
import robinRunConfig from "./clients/robinRun";
import wsaConfig from "./clients/wsa";
import evergreenHeightsConfig from "./clients/evergreenHeights"; // 👈 ADD

const chatbotRegistry = {
  fontrow: fontrowConfig,
  "robin-run": robinRunConfig,
  "evergreen-heights": evergreenHeightsConfig, // 👈 ADD
  "web-smart-assistant": wsaConfig, // ✅ ADD THIS

};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || chatbotRegistry["fontrow"];
}