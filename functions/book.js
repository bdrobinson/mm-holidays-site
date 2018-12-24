// @flow

import sendgrid from "@sendgrid/mail"
import Joi from "joi"
import dotenv from "dotenv"

dotenv.config()

export type Params = {|
  // section 1
  campChoice: "1" | "2",
  // section 2
  childFirstName: string,
  childLastName: string,
  childAddress: string,
  childPostcode: string,
  childPhoneNumber: string,
  childEmail: string,
  childDobYear: string,
  childDobMonth: string,
  childDobDay: string,
  gender: "male" | "female",
  youthGroup: string,
  friendsWith: string,
  // section 3
  title: string,
  parentFirstName: string,
  parentLastName: string,
  parentAddress: string,
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
  paymentMethod: "bankTransfer" | "cheque" | "cash",
  paymentAmount: "full" | "deposit",
  // section 8
  otherInfo: string,
  // section 9
  childConfirmation: boolean,
  // section 10
  parentConfirmation: boolean,
|}

const schema = Joi.object().keys({
  // section 1
  campChoice: Joi.string().required(),
  // section 2
  childFirstName: Joi.string().required(),
  childLastName: Joi.string().required(),
  childAddress: Joi.string().required(),
  childPostcode: Joi.string().required(),
  childPhoneNumber: Joi.string().required(),
  childEmail: Joi.string().required(),
  childDobYear: Joi.string().required(),
  childDobMonth: Joi.string().required(),
  childDobDay: Joi.string().required(),
  gender: Joi.string().required(),
  youthGroup: Joi.string().allow(""),
  friendsWith: Joi.string().allow(""),
  // section 3
  title: Joi.string().allow(""),
  parentFirstName: Joi.string().allow(""),
  parentLastName: Joi.string().allow(""),
  parentAddress: Joi.string().allow(""),
  parentPostcode: Joi.string().allow(""),
  parentPhone: Joi.string().allow(""),
  parentEmail: Joi.string().allow(""),
  siblingNames: Joi.string().allow(""),
  // section 4
  contactByEmail: Joi.boolean(),
  contactByPhone: Joi.boolean(),
  contactByPost: Joi.boolean(),
  acceptRecordKeeping: Joi.boolean().required(),
  // section 5
  photoPermission: Joi.boolean(),
  // section 6
  heardUrbanSaintsMailing: Joi.boolean(),
  heardUrbanSaintsWebsite: Joi.boolean(),
  heardBeenBefore: Joi.boolean(),
  heardFamilyMember: Joi.boolean(),
  heardChurch: Joi.boolean(),
  heardScriptureUnion: Joi.boolean(),
  heardFriend: Joi.boolean(),
  heardOther: Joi.string().allow(""),
  // section 7
  paymentMethod: Joi.string().required(),
  paymentAmount: Joi.string().required(),
  // section 8
  otherInfo: Joi.string().allow(""),
  // section 9
  childConfirmation: Joi.boolean().required(),
  // section 10
  parentConfirmation: Joi.boolean().required(),
})

export const handler = (event, context, callback) => {
  console.log("handling event", event.params)
  handleAsync(event, context, callback).catch(err => {
    console.log("got error", err)
    callback(null, {
      statusCode: 500,
      body: "Error",
    })
  })
}

export const handleAsync = async (event, context, callback) => {
  console.log(process.env.SENDGRID_API_KEY)
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

  const params: Params = JSON.parse(event.body)
  Joi.validate(params, schema)

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
