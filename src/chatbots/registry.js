import fontrowConfig from "./fontrow/config";
import itanexConfig from "./itanex/config";

const chatbotRegistry = {
  fontrow: fontrowConfig,
  itanex: itanexConfig,
};

export function getClientConfig(clientKey) {
  return chatbotRegistry[clientKey] || {};
}