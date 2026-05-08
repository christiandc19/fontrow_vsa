if (typeof globalThis.process === "undefined") {
  globalThis.process = { env: {} };
}

if (typeof window !== "undefined" && typeof window.process === "undefined") {
  window.process = globalThis.process;
}