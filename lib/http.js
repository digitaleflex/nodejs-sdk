const axios = require("axios");
// const opts = require('./opts')

const http = axios.create({
  // baseURL: opts.baseURL,
  timeout: 5000,
  maxBodyLength: 1024 * 1024, // 1MB
  maxContentLength: 1024 * 1024, // 1MB
  headers: {
    "Content-Type": "application/json",
  },
});

const ALLOWED_HOSTS = ["api.kkiapay.me", "api-sandbox.kkiapay.me"];

http.interceptors.request.use(
  (config) => {
    if (config.url) {
      // Resolve full URL to check hostname
      // config.baseURL should be set by the consumer (e.g. transaction/index.js)
      // If not set, we default to a safe value to allow URL parsing, or fail if it's relative without base.
      const baseURL = config.baseURL || "https://api.kkiapay.me";
      try {
        const urlObj = new URL(config.url, baseURL);
        if (!ALLOWED_HOSTS.includes(urlObj.hostname)) {
          // Prevent SSRF: Internal networks, localhost, etc.
          throw new Error(
            `Security Error: Request to allowed host '${urlObj.hostname}' is blocked.`
          );
        }
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          // Fallback: If URL construction fails, we might block to be safe.
          throw new Error("Security Error: Invalid URL construction.");
        }
        throw error;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = http;
