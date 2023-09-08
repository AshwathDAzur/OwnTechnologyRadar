const { google } = require("googleapis");

async function getClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  return await auth.getClient();
}

async function getSpreadsheetData(range) {
  const client = await getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1JlSsRvxz1xVebd0HHDt6vQtS73X6XZz-Bu9BD2k5UAg";
  const response = await googleSheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });
  return response.data.values;
}

module.exports = {
  getClient,
  getSpreadsheetData,
};
