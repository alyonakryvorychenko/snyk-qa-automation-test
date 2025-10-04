# snyk-qa-automation-test test project

This repository contains end-to-end (E2E) automated tests using [Playwright](https://playwright.dev/).  

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- Git
- Playwright (browsers will be installed automatically)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/alyonakryvorychenko/snyk-qa-automation-test.git
cd snyk-qa-automation-test
npm install
```

Install Playwright browsers (first time only):
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm run test
```

Run specific test suits:
```bash
npx playwright test <test-file-path>
```

Run specific test-case:
```bash
npx playwright test -g "<Test name>"
```

## Test Report
HTML report is generated automatically after test-run
