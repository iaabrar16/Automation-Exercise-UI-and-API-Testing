# Automation Exercise: UI and API Testing

This repository contains Cypress tests for end-to-end (E2E) UI interactions and API testing on the Automation Exercise website. The tests are written to simulate user workflows, validate API responses, and ensure the website's functionality meets expected behavior.

## Prerequisites

Before running the tests, ensure you have the following installed:

1. **Node.js** (LTS version recommended)
2. **npm** (comes with Node.js) or **yarn**
3. A code editor like **VS Code** (optional, but recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iaabrar16/Automation-Exercise-UI-and-API-Testing.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Install the Cypress file upload plugin (used for file upload functionality):
   ```bash
   npm install --save-dev cypress-file-upload
   ```

## Directory Structure

```
automation-exercise-tests/
├── cypress/
│   ├── e2e/
│   │   └── automationTests.cy.js  # Contains the combined UI and API tests
│   └── fixtures/
│   └── support/
│       └── commands.js
│
t└── package.json
```

## Running the Tests

### 1. Open Cypress Test Runner

Run the following command to open the Cypress Test Runner:
```bash
npx cypress open
```

- Select `E2E Testing`.
- Choose a browser of your choice (e.g., Chrome, Edge).
- Click on the test file (`automationTests.cy.js`) to run it interactively.

### 2. Run Tests in Headless Mode

To execute the tests in headless mode, run the following command:
```bash
npx cypress run
```
This will execute all tests in the background and provide a report in the terminal.

### 3. Running Specific Tests

If you want to execute a specific test file, use:
```bash
npx cypress run --spec "cypress/e2e/automationTests.cy.js"
```

## API Documentation

### 1. Validate Brand List
- **Method**: GET
- **URL**: `https://automationexercise.com/api/brandsList`
- **Description**: Fetches a list of all available brands and validates their presence or absence.
- **Expected Results**:
  - Response status: `200`
  - Brands that must exist: `Polo`, `Babyhug`, `Biba`
  - Brands that must not exist: `Heineken`, `BMW`, `Razor`

#### Sample Request (Cypress):
```javascript
cy.request('GET', `https://automationexercise.com/api/brandsList`).then((response) => {
    expect(response.status).to.eq(200);

    const brands = response.body;
    expect(brands).to.include('Polo');
    expect(brands).to.include('Babyhug');
    expect(brands).to.include('Biba');

    expect(brands).to.not.include('Heineken');
    expect(brands).to.not.include('BMW');
    expect(brands).to.not.include('Razor');
});
```

### 2. Verify User Login
- **Method**: POST
- **URL**: `https://automationexercise.com/api/verifyLogin`
- **Description**: Validates user login credentials.
- **Request Parameters**:
  - `email`: The user's email address.
  - `password`: The user's password.
- **Expected Results**:
  - Response status: `200`

#### Sample Request (Cypress):
```javascript
cy.request('POST', 'https://automationexercise.com/api/verifyLogin', {
    "email": "iaaabrar19@gmail.com",
    "password": "YourPassword123"
}).then((response) => {
    expect(response.status).to.eq(200);
});
```

## Test Details

### 1. UI Tests
The UI tests simulate the following workflow:
- User registration with detailed form filling.
- Navigating to product categories and subcategories.
- Interacting with a product (e.g., changing quantity).
- Completing a payment simulation with dummy data.
- Contact form submission with file upload.

### 2. API Tests
The API tests validate:
- Fetching a brand list and ensuring the response contains or excludes specific brands.
- Verifying user login credentials through a `POST` request.

## Environment Variables

If needed, you can use environment variables to manage sensitive data such as emails or passwords. Create a `cypress.env.json` file in the root directory with the following structure:

```json
{
  "email": "iaa20@gmail.com", 
  "password": "YourPassword123"
}
```

Update the test code to reference these variables using:
```javascript
Cypress.env('email')
Cypress.env('password')
```

## Dependencies

- [Cypress](https://www.cypress.io/) - JavaScript End-to-End Testing Framework
- [cypress-file-upload](https://www.npmjs.com/package/cypress-file-upload) - Plugin for handling file uploads

## Notes

- Ensure you have stable internet connectivity while running the tests.
- If the website’s structure changes, test selectors might need updates.
- The `file.txt` used for the file upload test must exist in the `cypress/fixtures/` directory.

