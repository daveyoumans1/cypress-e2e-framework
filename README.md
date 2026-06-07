# Cypress E2E Framework

A modern Cypress end-to-end test framework using JavaScript, demonstrating the Page Object Model pattern, custom commands, and session-based authentication against [Sauce Demo](https://www.saucedemo.com).

## Features

- **Page Object Model** — encapsulated selectors and chainable assertion helpers
- **Custom commands** — `cy.loginAs()` using `cy.session()` for fast, cached authentication
- **Data-driven tests** — fixture-driven user credentials and parameterized test cases
- **Retry logic** — one retry on failure in CI, zero in local interactive mode
- **Video recording & screenshots on failure** — uploaded as GitHub Actions artifacts
- **Multi-browser CI** — Chrome and Firefox in parallel

## Project Structure

```
├── cypress/
│   ├── e2e/              # Test specs
│   │   ├── login.cy.js
│   │   └── inventory.cy.js
│   ├── fixtures/
│   │   └── users.json    # Test user credentials
│   ├── pages/            # Page Object classes
│   │   ├── LoginPage.js
│   │   └── InventoryPage.js
│   └── support/
│       ├── commands.js   # Custom Cypress commands
│       └── e2e.js        # Global support file
├── cypress.config.js
└── package.json
```

## Setup

```bash
npm install
```

## Running Tests

```bash
# Interactive Test Runner (recommended for development)
npm run cy:open

# Headless run (all specs)
npm run cy:run

# Specific browser
npm run cy:run:chrome
npm run cy:run:firefox
```

## Custom Commands

| Command | Description |
|---|---|
| `cy.loginAs('standard')` | Logs in via UI and caches the session — skips login UI on subsequent specs |

## CI

GitHub Actions runs the suite headlessly across Chrome and Firefox on every push and pull request, plus a nightly scheduled run. Screenshots and videos are retained for 7 days.
