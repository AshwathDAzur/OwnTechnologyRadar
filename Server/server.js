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

/////////////////////     GET DATA BASED ON RINGS     ////////////////////////////

app.get("/rings/:input", async (req, res) => {
  try {
    const input = req.params.input; // Get the input from the URL parameter

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1JlSsRvxz1xVebd0HHDt6vQtS73X6XZz-Bu9BD2k5UAg";
    const range = "Sheet1";
    const response = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });

    // Filter rows based on the input
    const filteredRows = response.data.values.filter((row) => {
      const quadrantIndex = 1;
      return row[quadrantIndex] === input;
    });

    res.send(filteredRows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//http://localhost:2407/quadrant/Themes & Techniques
//http://localhost:2407/quadrant/Products & Platforms
//http://localhost:2407/quadrant/Libraries & Frameworks

/////////////////////     GET DATA BASED ON QUADRANTS     ////////////////////////////

app.get("/quadrants/:input", async (req, res) => {
  try {
    const input = req.params.input; // Get the input from the URL parameter

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1JlSsRvxz1xVebd0HHDt6vQtS73X6XZz-Bu9BD2k5UAg";
    const range = "Sheet1";
    const response = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });

    // Filter rows based on the input
    const filteredRows = response.data.values.filter((row) => {
      const quadrantIndex = 2;
      return row[quadrantIndex] === input;
    });

    res.send(filteredRows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

////////////////////// GET NUMBER OF RINGS AND QUADRANTS ////////////////////////////

app.get("/radarconfig", async (req, res) => {
  try {
    const input = req.params.input; // Get the input from the URL parameter

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1JlSsRvxz1xVebd0HHDt6vQtS73X6XZz-Bu9BD2k5UAg";
    const range = "Sheet1";
    const response = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });
    const groupedData = {};
    response.data.values.forEach((row) => {
      const quadrantIndex = 2;
      const quadrant = row[quadrantIndex];
      if (!groupedData[quadrant]) {
        groupedData[quadrant] = [];
      }
      groupedData[quadrant].push(row);
    });
    const uniqueQuadrants = Object.keys(groupedData);
    const quadrants = uniqueQuadrants.length - 2;
    const groupedData1 = {};
    response.data.values.forEach((row) => {
      const ringIndex = 1;
      const ring = row[ringIndex];
      if (!groupedData1[ring]) {
        groupedData1[ring] = [];
      }
      groupedData1[ring].push(row);
    });
    const uniquerings = Object.keys(groupedData1);
    const rings = uniquerings.length - 2;
    res.send({ quadrants, rings });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(2407, () => console.log("running on 2407"));
