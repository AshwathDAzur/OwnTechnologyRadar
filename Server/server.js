const express = require("express");
const cors = require("cors");
const googleSheetsRepository = require("./googlesheetrepo");

const app = express();
app.use(cors());

////////////////////////  GET METHOD : RETURN EVERYTHING IN THE SHEET /////////////////

app.get("/", async (req, res) => {
  try {
    const range = "Sheet1";
    const data = await googleSheetsRepository.getSpreadsheetData(range);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

///////////////////////     GET DATA BASED ON RINGS     ////////////////////////////

app.get("/rings/:input", async (req, res) => {
  try {
    const input = req.params.input;
    const range = "Sheet1";
    const data = await googleSheetsRepository.getSpreadsheetData(range);

    const filteredRows = data.filter((row) => {
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
    const input = req.params.input;
    const range = "Sheet1";
    const data = await googleSheetsRepository.getSpreadsheetData(range);

    const filteredRows = data.filter((row) => {
      const quadrantIndex = 2;
      return row[quadrantIndex] === input;
    });

    res.send(filteredRows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(2407, () => console.log("Running on port 2407"));
