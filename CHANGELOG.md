# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-01-08

### Security

- **High Severity**: Upgraded `axios` to `^1.8.2` to resolve multiple vulnerabilities (CVE-2025-58754, GHSA-wf5p-g6vw-rhxx).
- **Hardening**: Implemented centralized HTTP client with:
  - strict `timeout` (5000ms)
  - `maxBodyLength` and `maxContentLength` limits (1MB) to prevent DoS.
- **SSRF Protection**: Added strict hostname whitelisting (`api.kkiapay.me`, `api-sandbox.kkiapay.me`) to prevent Server-Side Request Forgery.
- **Error Handling**: Improved error parsing to avoid crashing on undefined responses.
