## Purpose
Provide concise, repository-specific guidance for AI coding agents working on this Playwright test suite.

## Quick-run (developer workflows)
- Run tests: `npx playwright test`
- Run a single file: `npx playwright test tests/formPOM.spec.js`
- Run a specific browser: `npx playwright test --project=chromium`
- Open the HTML report: `npx playwright show-report` or open `playwright-report/index.html` in a browser

Note: `package.json` has no test scripts; use the `npx playwright` commands above.

## Big picture / architecture
- This repository is a Playwright Test suite. Configuration lives in `playwright.config.js` (testDir: `./tests`, `baseURL` set to `https://playground-drab-six.vercel.app`).
- Tests live under `tests/`. Page objects are under `tests/pages/` and test data under `tests/data/`.
- HTML reports are produced under `playwright-report/` (reporter set to `html` in the config).

## Patterns & conventions (concrete examples)
- Page Object Model: classes export a page wrapper that accepts the Playwright `page` fixture.
  - Example: `tests/pages/form.page.js` exports `FormPage` with methods like `navigateToForm()` and `fillName()`.
  - Example: `tests/pages/hpTablePage.js` exports `HpTablePage` with helper locators like `nameCell(name)` which sanitizes spaces to build IDs.
- Selectors: prefer Playwright high-level selectors (`getByRole`, `getByLabel`, `getByText`) as used in `tests/pages/form.page.js`.
- Data-driven tests: some specs iterate data arrays exported from `tests/data/*` (see `tests/formPOM.spec.js` which loops `for (const user of USERS)` to create per-user tests).
- Local data fixtures: static JSON lives in `tests/data/json/hpCharacters.json` (used by table-related tests).

## Config-driven behavior to keep in mind
- `baseURL` in `playwright.config.js` allows tests to call `page.goto('/form')` instead of a full URL.
- `trace: 'on-first-retry'` is enabled; when tests retry, traces will be collected for debugging.
- `reporter: 'html'` writes reports into `playwright-report/`.

## Editing/testing guidance for AI agents
- When modifying or adding tests, follow existing patterns: use `async ({ page }) => { ... }` test bodies, instantiate page objects with `new FormPage(page)`.
- Use `getByRole`/`getByLabel` for stable selectors. If IDs are used, mimic the ID-building logic found in `hpTablePage.js`: it concatenates a fixed prefix with the character name after removing spaces (e.g., use name.replace(/\\s/g, '') to sanitize).
- If you add a new npm script to `package.json`, include `test` and `test:report` to simplify developer runs (optional).

## Integration points & dependencies
- Dev dependency: `@playwright/test` (see `package.json`). No other external services are required—the suite targets the `baseURL` site.

## Files to inspect when making changes
- `playwright.config.js` — test runner and baseline settings
- `tests/` — all tests live here
- `tests/pages/` — Page Object classes (POM)
- `tests/data/` — data used by tests (JS arrays and JSON)
- `playwright-report/` — generated HTML reports and traces

## When you need human review
- Large test additions or changing the `baseURL` should be reviewed to ensure CI expectations are preserved.

---
If anything looks unclear or you want more detail (CI commands, Node version, or example PR notes), tell me which area to expand and I'll iterate.
