import fontrowConfig from "./clients/fontrow";
import itanexConfig from "./clients/itanex";

const chatbotRegistry = {
  fontrow: fontrowConfig,
  itanex: itanexConfig,
};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || chatbotRegistry["fontrow"];
}