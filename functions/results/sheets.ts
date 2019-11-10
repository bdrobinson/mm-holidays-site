// @flow

import { google } from "googleapis"

export const appendRow = async (params: {
  googleAuthClientEmail: string
  googlePrivateKey: string
  spreadsheetId: string
  row: Array<string>
}) => {
  // configure a JWT auth client
  const jwtClient = new google.auth.JWT(
    params.googleAuthClientEmail,
    null,
    params.googlePrivateKey,
    ["https://www.googleapis.com/auth/spreadsheets"],
  )
  //authenticate request
  await jwtClient.authorize()

  const sheets = google.sheets({ version: "v4", auth: jwtClient })
  await sheets.spreadsheets.values.append({
    spreadsheetId: params.spreadsheetId,
    range: "Sheet1",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [params.row],
    },
    auth: jwtClient,
  })
}
