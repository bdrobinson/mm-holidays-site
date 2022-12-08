import React, { useState, FC, ReactNode, useMemo } from "react"
import { Formik, FormikErrors, Field } from "formik"
import styled from "styled-components"
import { parse, isValid, differenceInYears } from "date-fns"
import * as Sentry from "@sentry/browser"
import fetch from "unfetch"
import Link from "gatsby-link"

import TextField from "./TextField"
import { Params } from "../../functions/book"
import RadioChoices from "./RadioChoices"
import { GREY_BORDER_COLOUR, MOBILE_WIDTH, RED } from "../constants"
import FieldErrorMessage from "./FieldErrorMessage"
import FieldCheckbox from "./FieldCheckbox"
import Button from "./Button"
import FieldTitle from "./FieldTitle"

export type FormState = {
  // section 1
  campChoice: "1" | "2"
  // section 2
  childFirstName: string
  childLastName: string
  childAddressLine1: string
  childAddressLine2: string
  childAddressCity: string
  childAddressCounty: string
  childPostcode: string
  childPhoneNumber: string
  childEmail: string
  childDobYear: string
  childDobMonth: string
  childDobDay: string
  gender: "Male" | "Female"
  youthGroup: string
  friendsWith: string
  // section 3
  title: string
  parentFirstName: string
  parentLastName: string
  parentRelationshipToChild: "Parent" | "Guardian" | "Leader"
  parentAddressSameAsChild: "yes" | "no"
  parentAddressLine1: string
  parentAddressLine2: string
  parentAddressCity: string
  parentAddressCounty: string
  parentPostcode: string
  parentPhone: string
  parentEmail: string
  siblingNames: string
  // section 4
  contactByEmail: boolean
  contactByPhone: boolean
  contactByPost: boolean
  acceptRecordKeeping: boolean
  // section 5
  photoPermission: ("yes" | "no") | null
  // section 6
  heardUrbanSaintsMailing: boolean
  heardUrbanSaintsWebsite: boolean
  heardBeenBefore: boolean
  heardFamilyMember: boolean
  heardChurch: boolean
  heardScriptureUnion: boolean
  heardFriend: boolean
  heardOther: string
  // section 7
  paymentMethod: "Bank transfer" | "Cheque" | "Cash"
  paymentAmount: "Full" | "Deposit"
  // section 8
  dietaryNeeds: string
  medicalIssues: string
  behaviouralNeeds: string
  englishNotFirstLanguage: string
  additionalNeeds: string
  anythingElse: string
  // section 9
  childConfirmation: boolean
  mobileConfirmation: boolean
  // section 10
  parentConfirmation: boolean
}

const NON_EMPTY_STRINGS: Array<keyof FormState> = [
  "childFirstName",
  "childLastName",
  "childAddressLine1",
  "childAddressCity",
  "childAddressCounty",
  "childPostcode",
  "childPhoneNumber",
  "childEmail",
]

const NON_EMPTY_STRINGS_FOR_U18S: Array<keyof FormState> = [
  "parentFirstName",
  "parentLastName",
  "parentPhone",
  "parentEmail",
]

const MUST_BE_TRUE: Array<keyof FormState> = [
  "acceptRecordKeeping",
  "childConfirmation",
  "parentConfirmation",
  "mobileConfirmation",
]

const getInitialState = (): FormState => ({
  // section 1
  campChoice: "2",
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
  parentAddressSameAsChild: "yes",
  parentAddressLine1: "",
  parentAddressLine2: "",
  parentAddressCity: "",
  parentAddressCounty: "",
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
  paymentMethod: "Bank transfer",
  paymentAmount: "Full",
  // section 8
  dietaryNeeds: "",
  medicalIssues: "",
  behaviouralNeeds: "",
  englishNotFirstLanguage: "",
  additionalNeeds: "",
  anythingElse: "",
  // section 9
  childConfirmation: false,
  // section 10
  mobileConfirmation: false,
  // section 11
  parentConfirmation: false,
})

const dayRegex = /^\d\d?$/
const monthRegex = /^\d\d?$/
const yearRegex = /^\d\d\d\d$/

const LOCAL_STORAGE_KEY = "bookingform_v1"

const getLocalStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null
  }
  if (window.localStorage == null) {
    return null
  }
  return window.localStorage
}

const dumpToLocalStorage = (state: FormState) => {
  const localStorage = getLocalStorage()
  if (localStorage == null) {
    return
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
}

const readFromLocalStorage = (): FormState | null => {
  const localStorage = getLocalStorage()
  if (localStorage == null) {
    return null
  }
  const stringified = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stringified == null) {
    return null
  }
  return JSON.parse(stringified)
}

const clearLocalStorage = () => {
  const localStorage = getLocalStorage()
  if (localStorage == null) {
    return
  }
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

const validateForm = (formState: FormState): FormikErrors<FormState> => {
  dumpToLocalStorage(formState)
  const errors: FormikErrors<FormState> = {}
  const age = calculateAge(
    formState.childDobYear,
    formState.childDobMonth,
    formState.childDobDay,
    new Date(),
  )
  Object.keys(formState).map(key => {
    const nonEmptyStrings: Array<keyof FormState> = [
      ...NON_EMPTY_STRINGS,
      ...(age !== null && age >= 18 ? [] : NON_EMPTY_STRINGS_FOR_U18S),
    ]
    // @ts-ignore
    if (nonEmptyStrings.includes(key)) {
      // @ts-ignore
      if (formState[key].trim() === "") {
        // @ts-ignore
        errors[key] = "This cannot be empty"
      }
    }

    // @ts-ignore
    if (MUST_BE_TRUE.includes(key)) {
      // @ts-ignore
      if (formState[key] !== true) {
        // @ts-ignore
        errors[key] = "Required"
      }
    }
  })

  if (formState.photoPermission === null) {
    errors.photoPermission = "Required"
  }

  if (dayRegex.test(formState.childDobDay) === false) {
    errors.childDobDay = "Invalid day"
  }
  if (monthRegex.test(formState.childDobMonth) === false) {
    errors.childDobMonth = "Invalid month"
  }
  if (yearRegex.test(formState.childDobYear) === false) {
    errors.childDobYear = "Invalid year"
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
    parentAddressLine1:
      values.parentAddressSameAsChild === "yes"
        ? values.childAddressLine1
        : values.parentAddressLine1,
    parentAddressLine2:
      values.parentAddressSameAsChild === "yes"
        ? values.childAddressLine2
        : values.parentAddressLine2,
    parentAddressCity:
      values.parentAddressSameAsChild === "yes"
        ? values.childAddressCity
        : values.parentAddressCity,
    parentAddressCounty:
      values.parentAddressSameAsChild === "yes"
        ? values.childAddressCounty
        : values.parentAddressCounty,
    parentPostcode:
      values.parentAddressSameAsChild === "yes"
        ? values.childPostcode
        : values.parentPostcode,
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
    dietaryNeeds: values.dietaryNeeds,
    medicalIssues: values.medicalIssues,
    behaviouralNeeds: values.behaviouralNeeds,
    englishNotFirstLanguage: values.englishNotFirstLanguage,
    additionalNeeds: values.additionalNeeds,
    anythingElse: values.anythingElse,
    childConfirmation: values.childConfirmation,
    mobileConfirmation: values.mobileConfirmation,
    parentConfirmation: values.parentConfirmation,
  }
}

// @ts-ignore
const DobField = styled(Field)`
  border-width: 1px;
  border-radius: 0.3em;
  padding: 0.5em;
  border-style: solid;
  border-color: ${GREY_BORDER_COLOUR};
  margin-right: 10px;
`

const Copy = styled.p`
  font-size: 0.9em;
`

const TextArea = styled.textarea`
  padding: 0.7em;
  width: ${MOBILE_WIDTH - 100}px;
  height: 5em;
  box-sizing: border-box;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${GREY_BORDER_COLOUR};
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
  }
`

// @ts-ignore
const SubmitButton: React.FC<{
  children?: React.ReactNode
  disabled: boolean
}> = styled(Button).attrs({ type: "submit" })<{
  disabled: boolean
}>`
  opacity: ${props =>
    // @ts-ignore
    props.disabled ? 0.6 : 1};
  font-size: 1.2em;
  margin-top: 1em;
`

const newDate = (year: string, month: string, day: string): Date | null => {
  if (
    yearRegex.test(year) === false ||
    monthRegex.test(month) === false ||
    dayRegex.test(day) === false
  ) {
    return null
  }
  const dob = parse(`${year}-${month}-${day}`)
  if (isValid(dob) === false) {
    return null
  }
  return dob
}

const calculateAge = (
  year: string,
  month: string,
  day: string,
  now: Date,
): number | null => {
  const dob = newDate(year, month, day)
  const age = dob !== null ? differenceInYears(now, dob) : null
  return age
}

type SubmitState =
  | { type: "ready" }
  | { type: "success" }
  | { type: "error"; message: string }

interface Props {
  onComplete: (formState: FormState) => void
  initialState: Partial<FormState> | null
}

const BookingForm: FC<Props> = ({ onComplete, initialState }: Props) => {
  const initialSubmitState: SubmitState = {
    type: "ready",
  }
  const [networkSubmitState, setNetworkSubmitState] =
    useState<SubmitState>(initialSubmitState)

  const restoredState = useMemo(() => {
    return readFromLocalStorage()
  }, [])
  return (
    <Formik
      initialValues={{
        ...getInitialState(),
        ...(initialState ?? {}),
        ...(restoredState ?? {}),
      }}
      validate={validateForm}
      onSubmit={async (values, bag) => {
        Sentry.addBreadcrumb({
          category: "booking",
          message: `Submitted form ${JSON.stringify(values)}`,
        })
        bag.setSubmitting(true)
        try {
          const response = await fetch("/.netlify/functions/book", {
            method: "POST",
            body: JSON.stringify(createRequestParams(values)),
          })
          if (response.status !== 200) {
            throw new Error(await response.text())
          }
          setNetworkSubmitState({ type: "success" })
          clearLocalStorage()
          onComplete(values)
        } catch (err) {
          setNetworkSubmitState({
            type: "error",
            message: err instanceof Error ? err.message : "Unknown error",
          })
          Sentry.captureException(err)
        }
        bag.setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        submitForm,
        handleChange,
        submitCount,
        isSubmitting,
      }) => {
        const age = calculateAge(
          values.childDobYear,
          values.childDobMonth,
          values.childDobDay,
          new Date(),
        )
        const hideParentSection = age !== null && age >= 18
        const displayParentSection = !hideParentSection
        return (
          <form
            style={{ marginBottom: "1em" }}
            onSubmit={e => {
              e.preventDefault()
              submitForm()
            }}
            css={`
              section h2 {
                margin-top: 2em;
              }
            `}
          >
            <section>
              <h2 css="margin-top: 0 !important; margin-bottom: 0.3em;">
                Select your dates
              </h2>
              <RadioChoices
                fieldName="campChoice"
                value={values.campChoice}
                options={[
                  {
                    value: "1",
                    label: "Week 1",
                    subtitle: "Sat 22nd – Sat 29th July 2023",
                    disabled: true,
                  },
                  {
                    value: "2",
                    label: "Week 2",
                    subtitle: "Sat 29th July – Sat 5th August 2023",
                    disabled: false,
                  },
                ]}
              />
            </section>
            <section>
              <h2>Child&apos;s details</h2>
              <TextField
                label="Child's first name"
                name="childFirstName"
                allowAutocomplete={false}
              />
              <TextField
                label="Child's surname"
                name="childLastName"
                allowAutocomplete={false}
              />
              <Subsection title="Address">
                <TextField label="Line 1" name="childAddressLine1" />
                <TextField label="Line 2" name="childAddressLine2" />
                <TextField label="Town/City" name="childAddressCity" />
                <TextField label="County" name="childAddressCounty" />
                <TextField label="Postcode" name="childPostcode" />
              </Subsection>
              <TextField
                label="Contact phone"
                name="childPhoneNumber"
                type="tel"
              />
              <TextField label="Contact email" name="childEmail" type="email" />
              <div>
                <label htmlFor="childDobDay">
                  <FieldTitle>Date of birth</FieldTitle>
                </label>
                <DobField
                  id="childDobDay"
                  name="childDobDay"
                  type="number"
                  placeholder="dd"
                  style={{ width: "3em" }}
                />
                <DobField
                  name="childDobMonth"
                  type="number"
                  placeholder="mm"
                  style={{ width: "3em" }}
                />
                <DobField
                  name="childDobYear"
                  type="number"
                  placeholder="yyyy"
                  style={{ width: "6em" }}
                />
              </div>
              <FieldErrorMessage name="childDobDay" />
              <FieldErrorMessage name="childDobMonth" />
              <FieldErrorMessage name="childDobYear" />
              <RadioChoices
                title="Gender"
                fieldName="gender"
                value={values.gender}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
              <TextField
                label="Urban Saints/Energize/Church group attended (if any)"
                name="youthGroup"
              />
              <TextField label="Friends with" name="friendsWith" />
            </section>
            {displayParentSection && (
              <section>
                <h2>
                  Parent/guardian details (required if applicant is under 18)
                </h2>
                <TextField label="Title" name="title" />
                <TextField label="First name" name="parentFirstName" />
                <TextField label="Surname" name="parentLastName" />
                <RadioChoices
                  title="Relationship to child"
                  options={[
                    { label: "Parent", value: "Parent" },
                    { label: "Guardian", value: "Guardian" },
                    { label: "Leader", value: "Leader" },
                  ]}
                  value={values.parentRelationshipToChild}
                  fieldName="parentRelationshipToChild"
                />
                <br />
                <FieldTitle>Address same as child?</FieldTitle>
                <RadioChoices
                  fieldName="parentAddressSameAsChild"
                  value={values.parentAddressSameAsChild}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                />
                {values.parentAddressSameAsChild === "no" && (
                  <Subsection title="Address">
                    <TextField label="Line 1" name="parentAddressLine1" />
                    <TextField label="Line 2" name="parentAddressLine2" />
                    <TextField label="Town/city" name="parentAddressCity" />
                    <TextField label="County" name="parentAddressCounty" />
                    <TextField label="Postcode" name="parentPostcode" />
                  </Subsection>
                )}
                <TextField label="Phone" name="parentPhone" type="tel" />
                <TextField label="Email" name="parentEmail" type="email" />
                <TextField
                  label="Sibling names"
                  subtitle="If applying for sibling discount"
                  name="siblingNames"
                />
              </section>
            )}
            <section>
              <h2>Contact permission</h2>
              <p>
                We would like to stay in touch and keep you up to date with
                future Camps and Urban Saints activities. We will respect how
                often we contact you, and you can change this at any time by
                emailing{" "}
                <a href="mailto:email@urbansaints.org">email@urbansaints.org</a>
                .
              </p>
              <FieldCheckbox
                label="Email"
                checked={values.contactByEmail}
                fieldName="contactByEmail"
              />
              <FieldCheckbox
                label="Phone"
                fieldName="contactByPhone"
                checked={values.contactByPhone}
              />
              <FieldCheckbox
                label="Post"
                fieldName="contactByPost"
                checked={values.contactByPost}
              />
              <Copy>
                We will never sell or swap your data with another organisation
                and will store your details securely, respecting your trust and
                privacy. For our full privacy policy, see{" "}
                <a
                  href="https://www.urbansaints.org/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.urbansaints.org/privacypolicy
                </a>
              </Copy>
              <p>
                I understand that Urban Saints will keep a record of my child’s
                name, address, medical records and attendance at this event to
                comply with safeguarding requirements
              </p>
              <FieldCheckbox
                fieldName="acceptRecordKeeping"
                checked={values.acceptRecordKeeping}
                label="I agree"
              />
            </section>
            <section>
              <h2>Photo (etc) permission</h2>
              <p>
                During the course of the Camp, we plan to be taking videos and
                photographs for creating memories of Camp activities, for use in
                our publicity and or other material produced by Urban Saints.
                This may include publishing on websites and social media (see
                T&Cs section 12). Due to recent legislation changes, it is
                important that we seek permission from yourself and your child
                (over the age of 13) to take and use these images for these
                stated purposes. Please could you discuss with your child
                whether they are happy to give Urban Saints permission to
                include them in any photographs or videos taken and complete the
                consent box below as appropriate.
              </p>
              <p>
                I am happy for Urban Saints to include my child in group videos
                and photographs of M+M Holiday activities and these may be used
                in future publicity, or other material produced by Urban Saints.
                I have consulted with my child who also gives permission.
              </p>
              <RadioChoices
                fieldName="photoPermission"
                value={values.photoPermission}
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </section>
            <section>
              <h2>How did you hear about M+M?</h2>
              <FieldCheckbox
                fieldName="heardUrbanSaintsMailing"
                checked={values.heardUrbanSaintsMailing}
                label="Urban Saints mailing"
              />
              <FieldCheckbox
                fieldName="heardUrbanSaintsWebsite"
                checked={values.heardUrbanSaintsWebsite}
                label="Urban Saints website"
              />
              <FieldCheckbox
                fieldName="heardBeenBefore"
                checked={values.heardBeenBefore}
                label="Been before"
              />
              <FieldCheckbox
                fieldName="heardFamilyMember"
                checked={values.heardFamilyMember}
                label="Family member"
              />
              <FieldCheckbox
                fieldName="heardChurch"
                checked={values.heardChurch}
                label="Church"
              />
              <FieldCheckbox
                fieldName="heardScriptureUnion"
                checked={values.heardScriptureUnion}
                label="Scripture Union"
              />
              <FieldCheckbox
                fieldName="heardFriend"
                checked={values.heardFriend}
                label="Friend"
              />
              <TextField name="heardOther" label="Other" />
            </section>
            <section>
              <h2>Payment information</h2>
              <p>
                If you would find it difficult to pay the full fee of £250,
                please get in touch by emailing{" "}
                <a href="mailto:info@madnessandmayhem.org.uk">
                  info@madnessandmayhem.org.uk
                </a>
                , as there are bursaries available to support.
              </p>
              <RadioChoices
                title="Payment method"
                options={[
                  { label: "Bank transfer", value: "Bank transfer" },
                  { label: "Cheque", value: "Cheque" },
                  { label: "Cash", value: "Cash" },
                ]}
                fieldName="paymentMethod"
                value={values.paymentMethod}
              />
              <RadioChoices
                title="Payment amount"
                options={[
                  { label: "Full (£250)", value: "Full" },
                  { label: "Deposit (£40)", value: "Deposit" },
                ]}
                fieldName="paymentAmount"
                value={values.paymentAmount}
              />
              <Copy>
                <strong>Bank name:</strong> Natwest, M&M Holidays fees account
                <br />
                <strong>Sort code:</strong> 60-13-23
                <br />
                <strong>Account number:</strong> 47430702
                <br />
                <strong>Ref:</strong> Your child&apos;s name
              </Copy>
            </section>
            <section>
              <h2>Other information</h2>
              <p>
                Please let us have any information which would be helpful to the
                M+M Leaders in planning the holiday.
              </p>
              <p>
                A medical form will be sent separately before the holiday
                commences and it is essential that it is completed and returned
                by a parent/guardian immediately.
              </p>
              <label>
                <FieldTitle>Dietary needs</FieldTitle>
                <TextArea
                  name="dietaryNeeds"
                  value={values.dietaryNeeds}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <FieldTitle>Medical issues or disabilities</FieldTitle>
                <TextArea
                  name="medicalIssues"
                  value={values.medicalIssues}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <FieldTitle>Behavioural/social needs</FieldTitle>
                <TextArea
                  name="behaviouralNeeds"
                  value={values.behaviouralNeeds}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <FieldTitle>
                  If English is not your child&apos;s first language
                </FieldTitle>
                <TextArea
                  name="englishNotFirstLanguage"
                  value={values.englishNotFirstLanguage}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <FieldTitle>
                  Additional needs (eg, extra 1:1 time at school)
                </FieldTitle>
                <TextArea
                  name="additionalNeeds"
                  value={values.additionalNeeds}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <label>
                <FieldTitle>Anything else</FieldTitle>
                <TextArea
                  name="anythingElse"
                  value={values.anythingElse}
                  onChange={handleChange}
                />
              </label>
            </section>
            <section>
              <h2>Young person declaration</h2>
              <p>
                I understand that there will be Christian teaching on the
                holiday. I agree to give my full support and co-operation to the
                Holiday Leader. I will behave appropriately at all times.
              </p>
              <FieldCheckbox
                fieldName="childConfirmation"
                checked={values.childConfirmation}
                label="I agree"
              />
            </section>
            <section>
              <h2>Mobile phone declaration</h2>
              <p>
                One of the great benefits of camp is being on holiday and taking
                a break from our normal lives. Since none of us needs to be
                contacted 24/7, we have the following mobile phone policy:
              </p>
              <p>
                <em>
                  All camper mobile phones will be looked after overnight by a
                  designated Holiday Team Leader and returned the following day.
                </em>
              </p>
              <p>
                <em>
                  On Max (9-11s), mobile phones will only be returned for a
                  limited time in the middle of the day.
                </em>
              </p>
              <p>
                <em>
                  On Madness (11-14s) and Mayhem (15-18s) our expectation is
                  that mobile phones will only be used at appropriate times and
                  in communal areas.
                </em>
              </p>
              <p>
                <em>
                  Inappropriate use may mean that we will have to remove your
                  phone for a short while.
                </em>
              </p>
              <p>
                <em>
                  If contact with home is required, we insist that the young
                  person or parent/guardian communicate through the overall week
                  leaders of the camp (Rupert and El Webster/Will and Anna
                  Eley).
                </em>
              </p>
              <p>
                If you have any concerns about this, please{" "}
                <Link to="/contact">contact us</Link> and we would be happy to
                discuss it with you further.
              </p>
              <FieldCheckbox
                fieldName="mobileConfirmation"
                checked={values.mobileConfirmation}
                label="I agree to the mobile phone policy"
              />
            </section>
            <section>
              <h2>
                Parent/guardian declaration (or by young person if over 18)
              </h2>
              <p>
                I agree to the Booking Terms &amp; Conditions. I support and
                approve my son/daughter/ward taking part in this holiday. By
                submitting this, I apply for my child/ward to become a temporary
                member of Urban Saints and acknowledge that this will happen on
                acceptance of this application. I agree to pay any outstanding
                balance by 31st May 2023.
              </p>
              <FieldCheckbox
                fieldName="parentConfirmation"
                checked={values.parentConfirmation}
                label="I agree"
              />
            </section>
            <section css="margin-top: 3em;">
              <div>
                <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
              </div>
              {Object.keys(errors).length > 0 && submitCount > 0 && (
                <p style={{ color: RED }}>
                  Some fields are invalid. Please review the form and then
                  re-submit.
                </p>
              )}
              {networkSubmitState.type === "error" && (
                <p style={{ color: RED }}>
                  {networkSubmitState.message}
                  <br />
                  Could not submit form. Please try again or contact{" "}
                  <a href="mailto:info@madnessandmayhem.org.uk">
                    info@madnessandmayhem.org.uk
                  </a>
                  .
                </p>
              )}
            </section>
          </form>
        )
      }}
    </Formik>
  )
}

export default BookingForm

const Subsection = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <section css="padding-left: 1em; border-left: 3px #ddd solid;">
      <FieldTitle css="font-size: 1em;">{title}</FieldTitle>
      <div>{children}</div>
    </section>
  )
}
