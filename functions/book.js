// @flow

import sendgrid from "@sendgrid/mail"
import dotenv from "dotenv"

dotenv.config()

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
  childPhoneNumber: string,
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
  parentAddressLine1: string,
  parentAddressLine2: string,
  parentAddressCity: string,
  parentAddressCounty: string,
  parentPostcode: string,
  parentPhone: string,
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
  console.log("handling event", event.params)
  handleAsync(event, context, callback).catch(err => {
    console.log("got error", err)
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
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

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

  const msg = {
    to: { name: "Ben Robinson", email: params.childEmail },
    from: { name: "M+M Bookings", email: "bookings@madnessandmayhem.org.uk" },
    subject: "You are successfully booked on to M+M 2019!",
    text: "You are successfully booked on to M+M 2019!",
    html: "<body><h2>Success!</h2><p>Here is a paragraph</p></body>",
  }
  console.log("sending email")
  await sendgrid.send(msg)
  console.log("email sent successfully!")
  callback(null, {
    statusCode: 200,
    body: "",
  })
}
