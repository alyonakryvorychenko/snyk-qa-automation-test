# TEST PLAN

## Framework
Playwright Test (TypeScript) — chosen for modern E2E testing, first-class TypeScript support,
fast local runs, tracing and HTML reports.

## Strategy
- Page Object Model (POM) to keep tests maintainable.
- Tests isolated and idempotent — each test logs in via the UI

## Test cases
### Login
- Successful login -> redirect to Users List page
- Invalid password -> error message
- Invalid/unregistered email -> error message
- Empty fields -> validation messages

### Users / Search
- User list loads and shows records
- Search full name -> exact match present
- Search partial -> matching subset shown
- Search random -> no results state shown

## Test data
Credentials provided via environment variables. Tests assume stable sample users exist in the app.

## Reporting & artifacts
- HTML report (Playwright), screenshots and traces on failures.

## Critical QA Eye
### Noticed bugs:
- The test case “Login with valid credentials and redirect to Admin Panel” currently redirects the user to the Admin Panel. According to the requirement, after successful login, the user should be redirected to the List Users page.
- The test case “Open User list and check user data presence” fails. The List Users table does not contain the required “Role” and “Email” columns.
### Recomendation about implementation for developers:
1. When searching with a random name on the List Users page, there is no "No results found" message displayed. According to the requirements, such a message should be present.
2. Provide information or access to API endpoints (e.g., login endpoint) to speed up test execution.
3. Maybe add (data-test-id) atribute to some elements
### Integrate test to CI/CD
It is considered a best practice to integrate automated tests into the CI/CD pipeline (e.g., using GitHub Actions).
This ensures tests run automatically on important events such as push or pull requests.
I did not implement this step since it was not included in the original requirements.
