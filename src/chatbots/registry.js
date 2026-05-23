import robinRunConfig from "./clients/robinRun";
import wsaConfig from "./clients/wsa";
import evergreenHeightsConfig from "./clients/evergreenHeights";
import asburyHeightsConfig from "./clients/asburyHeights";

const chatbotRegistry = {
  "robin-run": robinRunConfig,

  "evergreen-heights": evergreenHeightsConfig,

  "asbury-heights": asburyHeightsConfig,

  "web-smart-assistant": wsaConfig,
};

export function getClientConfig(clientKey) {
  return (
    chatbotRegistry[clientKey] ||
    chatbotRegistry["web-smart-assistant"]
  );
}