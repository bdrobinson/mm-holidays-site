// @flow

import React from "react"
import { Formik, type FormikErrors, Field, ErrorMessage } from "formik"

import TextField from "./TextField"
import { type Params } from "../../functions/book"

type FormState = {|
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
  photoPermission: ?("yes" | "no"),
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

const NON_EMPTY_STRINGS: Array<$Keys<FormState>> = [
  "childFirstName",
  "childLastName",
  "childAddress",
  "childPostcode",
  "childPhoneNumber",
  "childEmail",
]

const MUST_BE_TRUE: Array<$Keys<FormState>> = [
  "acceptRecordKeeping",
  "childConfirmation",
  "parentConfirmation",
]

const getInitialState = (): FormState => ({
  // section 1
  campChoice: "1",
  // section 2
  childFirstName: "",
  childLastName: "",
  childAddress: "",
  childPostcode: "",
  childPhoneNumber: "",
  childEmail: "",
  childDobYear: "",
  childDobMonth: "",
  childDobDay: "",
  gender: "male",
  youthGroup: "",
  friendsWith: "",
  // section 3
  title: "",
  parentFirstName: "",
  parentLastName: "",
  parentAddress: "",
  parentPostcode: "",
  parentPhone: "",
  parentEmail: "",
  siblingNames: "",
  // section 4
  contactByEmail: false,
  contactByPhone: false,
  contactByPost: false,
  acceptRecordKeeping: false,
  // section 5
  photoPermission: null,
  // section 6
  heardUrbanSaintsMailing: false,
  heardUrbanSaintsWebsite: false,
  heardBeenBefore: false,
  heardFamilyMember: false,
  heardChurch: false,
  heardScriptureUnion: false,
  heardFriend: false,
  heardOther: "",
  // section 7
  paymentMethod: "bankTransfer",
  paymentAmount: "full",
  // section 8
  otherInfo: "",
  // section 9
  childConfirmation: true,
  // section 10
  parentConfirmation: true,
})

const validateForm = (formState: FormState): FormikErrors<FormState> => {
  const errors = {}
  Object.keys(formState).map(key => {
    if (NON_EMPTY_STRINGS.includes(key)) {
      // $FlowFixMe
      if (formState[key].trim() === "") {
        errors[key] = "This cannot be empty"
      }
    }

    if (MUST_BE_TRUE.includes(key)) {
      if (formState[key] !== true) {
        errors[key] = "Required"
      }
    }
  })
  return errors
}

const createRequestParams = (values: FormState): Params => {
  return {
    campChoice: values.campChoice,
    childFirstName: values.childFirstName,
    childLastName: values.childLastName,
    childAddress: values.childAddress,
    childPostcode: values.childPostcode,
    childPhoneNumber: values.childPhoneNumber,
    childEmail: values.childEmail,
    childDobYear: values.childDobYear,
    childDobMonth: values.childDobMonth,
    childDobDay: values.childDobDay,
    gender: values.gender,
    youthGroup: values.youthGroup,
    friendsWith: values.friendsWith,
    title: values.title,
    parentFirstName: values.parentFirstName,
    parentLastName: values.parentLastName,
    parentAddress: values.parentAddress,
    parentPostcode: values.parentPostcode,
    parentPhone: values.parentPhone,
    parentEmail: values.parentEmail,
    siblingNames: values.siblingNames,
    contactByEmail: values.contactByEmail,
    contactByPhone: values.contactByPhone,
    contactByPost: values.contactByPost,
    acceptRecordKeeping: values.acceptRecordKeeping,
    photoPermission: values.photoPermission === "yes",
    heardUrbanSaintsMailing: values.heardUrbanSaintsMailing,
    heardUrbanSaintsWebsite: values.heardUrbanSaintsWebsite,
    heardBeenBefore: values.heardBeenBefore,
    heardFamilyMember: values.heardFamilyMember,
    heardChurch: values.heardChurch,
    heardScriptureUnion: values.heardScriptureUnion,
    heardFriend: values.heardFriend,
    heardOther: values.heardOther,
    paymentMethod: values.paymentMethod,
    paymentAmount: values.paymentAmount,
    otherInfo: values.otherInfo,
    childConfirmation: values.childConfirmation,
    parentConfirmation: values.parentConfirmation,
  }
}

const BookingForm = () => {
  return (
    <Formik
      initialValues={getInitialState()}
      validate={validateForm}
      onSubmit={async (values, bag) => {
        bag.setSubmitting(true)
        await fetch("/.netlify/functions/book", {
          method: "POST",
          body: JSON.stringify(createRequestParams(values)),
        })
        bag.setSubmitting(false)
      }}
    >
      {({ values, submitForm, handleChange, handleBlur }) => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault()
              submitForm()
            }}
          >
            <section>
              <p>
                <label>
                  <Field type="radio" name="campChoice" value="1" />
                  M+M 1
                </label>
              </p>
              <p>
                <label>
                  <Field type="radio" name="campChoice" value="2" />
                  M+M 2
                </label>
                <ErrorMessage name="campChoice" />
              </p>
            </section>
            <section>
              <h2>Young person</h2>
              <TextField label="First name" name="childFirstName" />
              <TextField label="Surname" name="childLastName" />
              <TextField label="Address" name="childAddress" />
              <TextField label="Postcode" name="childPostcode" />
              <TextField
                label="Contact phone"
                name="childPhoneNumber"
                type="tel"
              />
              <TextField label="Contact email" name="childEmail" type="email" />
              <div>
                <label htmlFor="childDobDay">
                  <p>Date of birth</p>
                </label>
                <Field
                  id="childDobDay"
                  name="childDobDay"
                  type="text"
                  placeholder="dd"
                />
                <Field name="childDobMonth" type="text" placeholder="mm" />
                <Field name="childDobYear" type="text" placeholder="yyyy" />
              </div>
              <div>
                <label>
                  <Field type="radio" name="gender" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Female
                </label>
                <ErrorMessage name="gender" />
              </div>
              <TextField label="Youth group" name="youthGroup" />
              <TextField label="Friends with" name="friendsWith" />
            </section>
            <section>
              <h2>
                Parent/guardian details (required if applicant is under 18)
              </h2>
              <TextField label="Title" name="title" />
              <TextField label="First name" name="parentFirstName" />
              <TextField label="Surname" name="parentLastName" />
              <TextField label="Address" name="parentAddress" />
              <TextField label="Postcode" name="parentPostcode" />
              <TextField label="Contact phone" name="parentPhone" type="tel" />
              <TextField label="Email" name="parentEmail" type="email" />
              <TextField label="Sibling names" name="siblingNames" />
            </section>
            <section>
              <h2>Contact permission</h2>
              <p>
                <label>
                  By email
                  <Field type="checkbox" name="contactByEmail" />
                </label>
              </p>
              <p>
                <label>
                  By phone
                  <Field type="checkbox" name="contactByPhone" />
                </label>
              </p>
              <p>
                <label>
                  By post
                  <Field type="checkbox" name="contactByPost" />
                </label>
              </p>
              <p>
                <label>
                  Accept record keeping
                  <Field type="checkbox" name="acceptRecordKeeping" />
                </label>
              </p>
            </section>
            <section>
              <p>
                Photos
                <label>
                  Yes
                  <Field type="radio" name="photoPermission" value="yes" />
                </label>
                <label>
                  No
                  <Field type="radio" name="photoPermission" value="no" />
                </label>
              </p>
            </section>
            <section>
              <h2>How did you hear about M+M?</h2>
              <p>
                <label>
                  Urban Saints mailing
                  <Field type="checkbox" name="heardUrbanSaintsMailing" />
                </label>
              </p>
              <p>
                <label>
                  Urban Saints website
                  <Field type="checkbox" name="heardUrbanSaintsWebsite" />
                </label>
              </p>
              <p>
                <label>
                  Been before
                  <Field type="checkbox" name="heardBeenBefore" />
                </label>
              </p>
              <p>
                <label>
                  Family member
                  <Field type="checkbox" name="heardFamilyMember" />
                </label>
              </p>
              <p>
                <label>
                  Church
                  <Field type="checkbox" name="heardChurch" />
                </label>
              </p>
              <p>
                <label>
                  Scripture Union
                  <Field type="checkbox" name="heardScriptureUnion" />
                </label>
              </p>
              <p>
                <label>
                  Friend
                  <Field type="checkbox" name="heardFriend" />
                </label>
              </p>
              <TextField name="heardOther" label="Other" />
            </section>
            <section>
              <p>
                <label>
                  Bank transfer
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="bankTransfer"
                  />
                </label>
                <label>
                  Cheque
                  <Field type="radio" name="paymentMethod" value="cheque" />
                </label>
                <label>
                  Cash <Field type="radio" name="paymentMethod" value="cash" />
                </label>
                <ErrorMessage name="paymentMethod" />
              </p>
              <p>
                <label>
                  Full
                  <Field type="radio" name="paymentAmount" value="full" />
                </label>
                <label>
                  Deposit
                  <Field type="radio" name="paymentAmount" value="deposit" />
                </label>
                <ErrorMessage name="paymentAmount" />
              </p>
            </section>
            <section>
              <label>
                <p>Other info</p>
                <textarea
                  label="Other info"
                  name="otherInfo"
                  value={values.otherInfo}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>Child confirmation</p>
                <Field type="checkbox" name="childConfirmation" />
                <ErrorMessage name="childConfirmation" />
              </label>
            </section>
            <section>
              <label>
                <p>Parent confirmation</p>
                <Field type="checkbox" name="parentConfirmation" />
                <ErrorMessage name="parentConfirmation" />
              </label>
            </section>
            <section>
              <button type="submit">Submit</button>
            </section>
          </form>
        )
      }}
    </Formik>
  )
}

export default BookingForm
