# Tilli — Milestone 2 Final Submission

## 1. Project Overview

Tilli is a browser-based Cash In / Cash Out tracking application. Milestone 2 builds upon the existing implementation from Milestone 1.

## 2. Milestone 1 — Existing Implementation

Milestone 1 established the existing Tilli project, including its frontend pages, styling, and JavaScript interactions.

## 3. Milestone 2 — Feature Added and Improved

### Cash In / Cash Out Transaction Entry with Persistent Storage

This is the only feature added and improved in Milestone 2.

Implementation changes:

- Created `server.js` using Node.js and Express.
- Added the `POST /api/transactions` endpoint to receive transaction data.
- Created `transactions.json` for persistent storage of submitted transactions.
- Updated `tilli-js/app.js` to send transaction data to the backend using `fetch()`.
- Added JSON request parsing and CORS headers to support frontend-backend communication.

Users can submit the date, transaction type, category, particulars, and amount. When the “Other” category is selected, its text is also sent. The backend saves the submitted transaction to `transactions.json`.

## 4. Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- JSON file storage
- Git and GitHub

## 5. How to Run the Project

1. Open the project folder in the terminal.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the backend:

   ```bash
   node server.js
   ```

4. The backend runs at `http://localhost:3001`.
5. Open `cash-in-cash-out.html` using Live Server in Visual Studio Code.
6. Keep the backend server running while testing the form.

## 6. Testing and Verification

The following checks were performed and passed:

- The Express backend server started successfully on port `3001`.
- A `POST /api/transactions` request was tested using `curl` and returned a successful response.
- The submitted test transaction was confirmed in `transactions.json`.

The browser form submission and its success message have not yet been verified end to end.

## 7. Current Limitations

- The displayed balance is maintained in the frontend and resets when the page is reloaded.
- Saved transactions are not yet retrieved and displayed in Till History.
- Transactions are stored in a local JSON file rather than a database.

## 8. Submission Branch

The submission branch is `milestone-2-initial`.
