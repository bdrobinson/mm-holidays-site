// @flow

import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import sendgrid from "@sendgrid/mail"
import dotenv from "dotenv"
import * as Sentry from "@sentry/node"
import { CamperEmail, CampLeaderEmail } from "./results/email"
import { createColumns } from "./results/dataColumns"
import { appendRow } from "./results/sheets"

dotenv.config()

const getEnv = (name: string): string => {
  const val = process.env[name]
  if (val == null) {
    throw new Error(`Could not get envvar ${name}`)
  }
  return val.replace("\\n", "\n")
}

export type Params = {|
  // section 1
  campChoice: "1" | "2",
  // section 2
  childFirstName: string,
  childLastName: string,
  childAddressLine1: string,
  childAddressLine2: string,
  childAddressCity: string,
  childAddressCounty: string,
  childPostcode: string,
  childPhone: string,
  childEmail: string,
  childDobYear: string,
  childDobMonth: string,
  childDobDay: string,
  gender: "Male" | "Female",
  youthGroup: string,
  friendsWith: string,
  // section 3
  title: string,
  parentFirstName: string,
  parentLastName: string,
  parentRelationshipToChild: string,
  parentAddressLine1: string,
  parentAddressLine2: string,
  parentAddressCity: string,
  parentAddressCounty: string,
  parentPostcode: string,
  parentMobile: string,
  parentDaytimePhone: string,
  parentEveningPhone: string,
  parentEmail: string,
  siblingNames: string,
  // section 4
  contactByEmail: boolean,
  contactByPhone: boolean,
  contactByPost: boolean,
  acceptRecordKeeping: boolean,
  // section 5
  photoPermission: boolean,
  // section 6
  heardUrbanSaintsMailing: boolean,
  heardUrbanSaintsWebsite: boolean,
  heardBeenBefore: boolean,
  heardFamilyMember: boolean,
  heardChurch: boolean,
  heardScriptureUnion: boolean,
  heardFriend: boolean,
  heardOther: string,
  // section 7
  paymentMethod: "Bank transfer" | "Cheque" | "Cash",
  paymentAmount: "Full" | "Deposit",
  // section 8
  dietaryNeeds: string,
  medicalIssues: string,
  behaviouralNeeds: string,
  englishNotFirstLanguage: string,
  anythingElse: string,
  // section 9
  childConfirmation: boolean,
  // section 10
  parentConfirmation: boolean,
|}

export const handler = (event: Object, context: Object, callback: Function) => {
  Sentry.init({ dsn: getEnv("SENTRY_DSN_BACKEND") })
  console.log(new Date().toISOString())
  console.log("handling event", event.body)
  handleAsync(event, context, callback).catch(err => {
    console.log("got error", err)
    Sentry.captureException(err)
    callback(null, {
      statusCode: 500,
      body: "Error",
    })
  })
}

export const handleAsync = async (
  event: Object,
  context: Object,
  callback: Function,
) => {
  const SENDGRID_API_KEY = getEnv("SENDGRID_API_KEY")
  const CONFIRMATION_EMAIL_RECIPIENT = getEnv("CONFIRMATION_EMAIL_RECIPIENT")
  const GOOGLE_SPREADSHEET_ID = getEnv("GOOGLE_SPREADSHEET_ID")
  const GOOGLE_CLIENT_EMAIL = getEnv("GOOGLE_CLIENT_EMAIL")
  const GOOGLE_PRIVATE_KEY = getEnv("GOOGLE_PRIVATE_KEY")

  sendgrid.setApiKey(SENDGRID_API_KEY)

  const params: Params = JSON.parse(event.body)

  if (params.acceptRecordKeeping === false) {
    callback(null, {
      statusCode: 400,
      body: "You must accept record keeping",
    })
    return
  }

  if (params.childConfirmation === false) {
    callback(null, {
      statusCode: 400,
      body: "The child confirmation box must be ticked",
    })
    return
  }

  if (params.parentConfirmation === false) {
    callback(null, {
      statusCode: 400,
      body: "The parent confirmation box must be ticked",
    })
    return
  }

  const confirmationEmailAddress =
    params.parentEmail !== ""
      ? params.parentEmail
      : params.childEmail !== ""
        ? params.childEmail
        : null
  if (confirmationEmailAddress == null) {
    callback(null, { statusCode: 400, body: "Please provide an email" })
    return
  }

  const columns = createColumns(params)

  try {
    console.log("appending row to google sheet")
    await appendRow({
      spreadsheetId: GOOGLE_SPREADSHEET_ID,
      row: columns.map(c => c.value),
      googleAuthClientEmail: GOOGLE_CLIENT_EMAIL,
      googlePrivateKey: GOOGLE_PRIVATE_KEY,
    })
  } catch (err) {
    console.log("failed to append row to google sheet")
    console.log(err)
    Sentry.captureException(err)
  }

  try {
    console.log("sending camper confirmation email")
    const html = renderToStaticMarkup(<CamperEmail />)
    const camperEmail = {
      to: {
        name: `${params.parentFirstName} ${params.parentLastName}`,
        email: confirmationEmailAddress,
      },
      from: { name: "M+M Bookings", email: "info@madnessandmayhem.org.uk" },
      subject: "Thank you for applying for a place at M+M 2019",
      text: html,
      html,
    }
    await sendgrid.send(camperEmail)
  } catch (err) {
    console.log(err.response.body)
    console.log("failed to send camper confirmation email", err.message)
    Sentry.captureException(err)
  }

  try {
    console.log("sending camp leader notification email")
    const html = renderToStaticMarkup(<CampLeaderEmail columns={columns} />)
    const leaderEmail = {
      to: {
        name: `M+M Info`,
        email: CONFIRMATION_EMAIL_RECIPIENT,
      },
      from: { name: "M+M Bookings", email: "info@madnessandmayhem.org.uk" },
      subject: "New submission from booking form",
      text: html,
      html,
    }
    await sendgrid.send(leaderEmail)
  } catch (err) {
    console.log(err)
    console.log("failed to send camp leader notification email")
    Sentry.captureException(err)
  }
  console.log("emails sent successfully!")
  callback(null, {
    statusCode: 200,
    body: "",
  })
}
