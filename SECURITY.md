# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to security@kkiapay.me. All security vulnerabilities will be promptly addressed.

## Recent Security Updates

- **SSRF Protection**: Strict whitelist enforcement for all outgoing requests.
- **Dependency Hardening**: Upgraded `axios` to prevent known vulnerabilities.
- **Request Limiting**: Enforced timeout and body size limits to prevent DoS.
