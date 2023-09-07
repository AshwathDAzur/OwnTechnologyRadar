const express = require("express");
const { google } = require("googleapis");
const cors = require("cors"); // Import the cors middleware

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1JlSsRvxz1xVebd0HHDt6vQtS73X6XZz-Bu9BD2k5UAg";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  res.send(getRows.data);
});

app.listen(2407, () => console.log("running on 2407"));
