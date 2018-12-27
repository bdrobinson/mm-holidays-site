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
  parentRelationshipToChild: "Parent" | "Guardian" | "Leader",
  parentAddressLine1: string,
  parentAddressLine2: string,
  parentAddressCity: string,
  parentAddressCounty: string,
  parentPostcode: string,
  parentMobilePhone: string,
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

const NON_EMPTY_STRINGS: Array<$Keys<FormState>> = [
  "childFirstName",
  "childLastName",
  "childAddressLine1",
  "childAddressCity",
  "childAddressCounty",
  "childPostcode",
  "childPhoneNumber",
  "childEmail",
  "parentEmail",
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
  childAddressLine1: "",
  childAddressLine2: "",
  childAddressCity: "",
  childAddressCounty: "",
  childPostcode: "",
  childPhoneNumber: "",
  childEmail: "",
  childDobYear: "",
  childDobMonth: "",
  childDobDay: "",
  gender: "Male",
  youthGroup: "",
  friendsWith: "",
  // section 3
  title: "",
  parentFirstName: "",
  parentLastName: "",
  parentRelationshipToChild: "Parent",
  parentAddressLine1: "",
  parentAddressLine2: "",
  parentAddressCity: "",
  parentAddressCounty: "",
  parentPostcode: "",
  parentMobilePhone: "",
  parentDaytimePhone: "",
  parentEveningPhone: "",
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
  paymentMethod: "Bank transfer",
  paymentAmount: "Full",
  // section 8
  dietaryNeeds: "",
  medicalIssues: "",
  behaviouralNeeds: "",
  englishNotFirstLanguage: "",
  anythingElse: "",
  // section 9
  childConfirmation: false,
  // section 10
  parentConfirmation: false,
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

  if (formState.photoPermission == null) {
    errors.photoPermission = "Required"
  }
  return errors
}

const createRequestParams = (values: FormState): Params => {
  return {
    campChoice: values.campChoice,
    childFirstName: values.childFirstName,
    childLastName: values.childLastName,
    childAddressLine1: values.childAddressLine1,
    childAddressLine2: values.childAddressLine2,
    childAddressCity: values.childAddressCity,
    childAddressCounty: values.childAddressCounty,
    childPostcode: values.childPostcode,
    childPhone: values.childPhoneNumber,
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
    parentRelationshipToChild: values.parentRelationshipToChild,
    parentAddressLine1: values.parentAddressLine1,
    parentAddressLine2: values.parentAddressLine2,
    parentAddressCity: values.parentAddressCity,
    parentAddressCounty: values.parentAddressCounty,
    parentPostcode: values.parentPostcode,
    parentMobile: values.parentMobilePhone,
    parentDaytimePhone: values.parentDaytimePhone,
    parentEveningPhone: values.parentEveningPhone,
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
    dietaryNeeds: values.dietaryNeeds,
    medicalIssues: values.medicalIssues,
    behaviouralNeeds: values.behaviouralNeeds,
    englishNotFirstLanguage: values.englishNotFirstLanguage,
    anythingElse: values.anythingElse,
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
                  <Field
                    type="radio"
                    name="campChoice"
                    value="1"
                    checked={values.campChoice === "1"}
                  />
                  M+M 1
                </label>
              </p>
              <p>
                <label>
                  <Field
                    type="radio"
                    name="campChoice"
                    value="2"
                    checked={values.campChoice === "2"}
                  />
                  M+M 2
                </label>
                <ErrorMessage name="campChoice" />
              </p>
            </section>
            <section>
              <h2>Young person</h2>
              <TextField label="First name" name="childFirstName" />
              <TextField label="Surname" name="childLastName" />
              <TextField label="Address line 1" name="childAddressLine1" />
              <TextField label="Address line 2" name="childAddressLine2" />
              <TextField label="Town/City" name="childAddressCity" />
              <TextField label="County" name="childAddressCounty" />
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
                  <Field
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={values.gender === "Male"}
                  />
                  Male
                </label>
                <label>
                  <Field
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={values.gender === "Female"}
                  />
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
              <p>Relationship to child</p>
              <label>
                <Field
                  type="radio"
                  name="parentRelationshipToChild"
                  value="Parent"
                  checked={values.parentRelationshipToChild === "Parent"}
                />{" "}
                Parent
              </label>
              <br />
              <label>
                <Field
                  type="radio"
                  name="parentRelationshipToChild"
                  value="Guardian"
                  checked={values.parentRelationshipToChild === "Guardian"}
                />{" "}
                Guardian
              </label>
              <br />
              <label>
                <Field
                  type="radio"
                  name="parentRelationshipToChild"
                  value="Leader"
                  checked={values.parentRelationshipToChild === "Leader"}
                />{" "}
                Leader
              </label>
              <br />
              <TextField label="Address" name="parentAddress" />
              <TextField label="Address line 1" name="parentAddressLine1" />
              <TextField label="Address line 2" name="parentAddressLine2" />
              <TextField label="Town/city" name="parentAddressCity" />
              <TextField label="County" name="parentAddressCounty" />
              <TextField label="Postcode" name="parentPostcode" />
              <TextField label="Contact phone" name="parentPhone" type="tel" />
              <TextField
                label="Mobile phone"
                name="parentMobilePhone"
                type="tel"
              />
              <TextField
                label="Daytime phone"
                name="parentDaytimePhone"
                type="tel"
              />
              <TextField
                label="Evening phone"
                name="parentEveningPhone"
                type="tel"
              />
              <TextField label="Email" name="parentEmail" type="email" />
              <TextField label="Sibling names" name="siblingNames" />
            </section>
            <section>
              <h2>Contact permission</h2>
              <p>
                <label>
                  By email
                  <Field
                    type="checkbox"
                    name="contactByEmail"
                    checked={values.contactByEmail}
                  />
                </label>
              </p>
              <p>
                <label>
                  By phone
                  <Field
                    type="checkbox"
                    name="contactByPhone"
                    checked={values.contactByPhone}
                  />
                </label>
              </p>
              <p>
                <label>
                  By post
                  <Field
                    type="checkbox"
                    name="contactByPost"
                    checked={values.contactByPost}
                  />
                </label>
              </p>
              <p>
                <label>
                  Accept record keeping
                  <Field
                    type="checkbox"
                    name="acceptRecordKeeping"
                    checked={values.acceptRecordKeeping}
                  />
                </label>
                <ErrorMessage name="acceptRecordKeeping" />
              </p>
            </section>
            <section>
              <p>
                Photos
                <label>
                  Yes
                  <Field
                    type="radio"
                    name="photoPermission"
                    value="yes"
                    checked={values.photoPermission === "yes"}
                  />
                </label>
                <label>
                  No
                  <Field
                    type="radio"
                    name="photoPermission"
                    value="no"
                    checked={values.photoPermission === "no"}
                  />
                </label>
                <br />
                <ErrorMessage name="photoPermission" />
              </p>
            </section>
            <section>
              <h2>How did you hear about M+M?</h2>
              <p>
                <label>
                  Urban Saints mailing
                  <Field
                    type="checkbox"
                    name="heardUrbanSaintsMailing"
                    value={values.heardUrbanSaintsMailing}
                  />
                </label>
              </p>
              <p>
                <label>
                  Urban Saints website
                  <Field
                    type="checkbox"
                    name="heardUrbanSaintsWebsite"
                    value={values.heardUrbanSaintsWebsite}
                  />
                </label>
              </p>
              <p>
                <label>
                  Been before
                  <Field
                    type="checkbox"
                    name="heardBeenBefore"
                    value={values.heardBeenBefore}
                  />
                </label>
              </p>
              <p>
                <label>
                  Family member
                  <Field
                    type="checkbox"
                    name="heardFamilyMember"
                    value={values.heardFamilyMember}
                  />
                </label>
              </p>
              <p>
                <label>
                  Church
                  <Field
                    type="checkbox"
                    name="heardChurch"
                    value={values.heardChurch}
                  />
                </label>
              </p>
              <p>
                <label>
                  Scripture Union
                  <Field
                    type="checkbox"
                    name="heardScriptureUnion"
                    value={values.heardScriptureUnion}
                  />
                </label>
              </p>
              <p>
                <label>
                  Friend
                  <Field
                    type="checkbox"
                    name="heardFriend"
                    checked={values.heardFriend}
                  />
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
                    value="Bank transfer"
                    checked={values.paymentMethod === "Bank transfer"}
                  />
                </label>
                <label>
                  Cheque
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="Cheque"
                    checked={values.paymentMethod === "Cheque"}
                  />
                </label>
                <label>
                  Cash{" "}
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={values.paymentMethod === "Cash"}
                  />
                </label>
                <ErrorMessage name="paymentMethod" />
              </p>
              <p>
                <label>
                  Full
                  <Field
                    type="radio"
                    name="paymentAmount"
                    value="Full"
                    checked={values.paymentAmount === "Full"}
                  />
                </label>
                <label>
                  Deposit
                  <Field
                    type="radio"
                    name="paymentAmount"
                    value="Deposit"
                    checked={values.paymentAmount === "Deposit"}
                  />
                </label>
                <ErrorMessage name="paymentAmount" />
              </p>
            </section>
            <section>
              <label>
                <p>Dietary needs</p>
                <textarea
                  name="dietaryNeeds"
                  value={values.dietaryNeeds}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>Medical issues</p>
                <textarea
                  name="medicalIssues"
                  value={values.medicalIssues}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>Behavioural needs</p>
                <textarea
                  name="behaviouralNeeds"
                  value={values.behaviouralNeeds}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>English not first language</p>
                <textarea
                  name="englishNotFirstLanguage"
                  value={values.englishNotFirstLanguage}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>Anything else</p>
                <textarea
                  name="anythingElse"
                  value={values.anythingElse}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <p>Child confirmation</p>
                <Field
                  type="checkbox"
                  name="childConfirmation"
                  checked={values.childConfirmation}
                />
                <ErrorMessage name="childConfirmation" />
              </label>
            </section>
            <section>
              <label>
                <p>Parent confirmation</p>
                <Field
                  type="checkbox"
                  name="parentConfirmation"
                  checked={values.parentConfirmation}
                />
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
