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
    undefined,
    params.googlePrivateKey,
    ["https://www.googleapis.com/auth/spreadsheets"],
  )
  //authenticate request
  await jwtClient.authorize()

  const sheets = google.sheets({ version: "v4", auth: jwtClient })
  // @ts-ignore
  await sheets.spreadsheets.values.append({
    spreadsheetId: params.spreadsheetId,
    range: "2021.5",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [params.row],
    },
    auth: jwtClient,
  })
}
