// @flow

import { sheets_v4 } from "googleapis"

const getNumberOfFilledRows = async (params: {
  sheets: sheets_v4.Sheets
  spreadsheetId: string
  range: string
}): Promise<number> => {
  const result = await params.sheets.spreadsheets.values.get({
    spreadsheetId: params.spreadsheetId,
    range: params.range,
  })
  const rows = result.data.values ?? []
  const firstEmptyRowIndex = rows.findIndex(columns => {
    const isEmpty =
      columns.length === 0 ||
      columns.every(col => ["", null, undefined].includes(col))
    return isEmpty
  })

  if (firstEmptyRowIndex === -1) {
    return rows.length
  }

  // because if it matches row 0, that means there are 0 filled rows
  return firstEmptyRowIndex
}

export const appendRow = async (params: {
  sheetsClient: sheets_v4.Sheets
  spreadsheetId: string
  tabName: string
  startColumn: string
  endColumn: string
  startRow: number
  row: Array<string>
}) => {
  const nFilled = await getNumberOfFilledRows({
    sheets: params.sheetsClient,
    spreadsheetId: params.spreadsheetId,
    range: `${params.tabName}!${params.startColumn}${params.startRow}:${params.endColumn}`,
  })
  const rowNumber = params.startRow + nFilled

  // @ts-ignore
  await params.sheetsClient.spreadsheets.values.update({
    spreadsheetId: params.spreadsheetId,
    range: `${params.tabName}!${params.startColumn}${rowNumber}:${params.endColumn}${rowNumber}`,
    resource: {
      values: [params.row],
    },
    valueInputOption: "USER_ENTERED",
  })
}
