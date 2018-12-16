// @flow

import React from "react"
import { Formik, type FormikErrors } from "formik"

type FormState = {|
  firstName: string,
  lastName: string,
  gender: "male" | "female",
  dobDay: ?string,
  dobMonth: ?string,
  dobYear: ?string,
  childAddress: string,
  childCity: string,
  childCounty: string,
  childPostcode: string,
  childHomePhone: string,
  childMobile: string,
  childEmail: string,
  guardianPrefix: string,
  guardianFirstName: string,
  guardianLastName: string,
  guardianRelationship: string,
  guardianAddress: string,
  guardianCity: string,
  guardianRegion: string,
  guardianPostcode: string,
  guardianCountry: string,
  guardianDaytimePhone: string,
  guardianEveningPhone: string,
  guardianMobile: string,
  guardianEmail: string,
  urbanSaintsTick: boolean,
  churchGroupName: string,
  churchGroupTown: string,
  friendsWith: string,
  siblingNames: string,
  paymentMethod:
    | "fullBankTransfer"
    | "depositBankTransfer"
    | "fullCheque"
    | "depositCheque"
    | "fullCash"
    | "depositCash",
  dietaryNeeds: string,
  medicalIssues: string,
  specialNeeds: string,
  language: string,
  anythingElse: string,
  heardUrbanSaintsMailing: boolean,
  heardUrbanSaintsWebsite: boolean,
  heardBeenBefore: boolean,
  heardFamilyMember: boolean,
  heardChurch: boolean,
  heardScriptureUnion: boolean,
  heardFriend: boolean,
  heardOther: ?string,
  ypDeclaration: boolean,
  ypDeclarationDate: string,
  guardianDeclaration: boolean,
  guardianDeclarationDate: string,
|}

const getInitialState = (): FormState => ({
  firstName: "",
  lastName: "",
  gender: "male",
  dobDay: null,
  dobMonth: null,
  dobYear: null,
  childAddress: "",
  childCity: "",
  childCounty: "",
  childPostcode: "",
  childHomePhone: "",
  childMobile: "",
  childEmail: "",
  guardianPrefix: "",
  guardianFirstName: "",
  guardianLastName: "",
  guardianRelationship: "",
  guardianAddress: "",
  guardianCity: "",
  guardianCountry: "",
  guardianRegion: "",
  guardianPostcode: "",
  guardianDaytimePhone: "",
  guardianEveningPhone: "",
  guardianMobile: "",
  guardianEmail: "",
  urbanSaintsTick: false,
  churchGroupName: "",
  churchGroupTown: "",
  friendsWith: "",
  siblingNames: "",
  paymentMethod: "fullBankTransfer",
  dietaryNeeds: "",
  medicalIssues: "",
  specialNeeds: "",
  language: "",
  anythingElse: "",
  heardUrbanSaintsMailing: false,
  heardUrbanSaintsWebsite: false,
  heardBeenBefore: false,
  heardFamilyMember: false,
  heardChurch: false,
  heardScriptureUnion: false,
  heardFriend: false,
  heardOther: null,
  ypDeclaration: false,
  ypDeclarationDate: "",
  guardianDeclaration: false,
  guardianDeclarationDate: "",
})

const validateForm = (formState: FormState): FormikErrors<FormState> => {
  const errors = {}
  if (formState.firstName.trim() === "") {
    errors.firstName = "Required"
  }
  if (formState.lastName.trim() === "") {
    errors.lastName = "Required"
  }
  if (formState.dobDay == null) {
    errors.dobDay = "Required"
  }
  if (formState.dobMonth == null) {
    errors.dobMonth = "Required"
  }
  if (formState.dobYear == null) {
    errors.dobYear = "Required"
  }

  if (formState.childAddress.trim() === "") {
    errors.childAddress = "Required"
  }
  if (formState.childCity.trim() === "") {
    errors.childCity = "Required"
  }
  if (formState.childCounty.trim() === "") {
    errors.childCounty = "Required"
  }
  if (formState.childPostcode.trim() === "") {
    errors.childPostcode = "Required"
  }
  if (formState.childEmail.trim() === "") {
    errors.childEmail = "Required"
  }

  if (formState.guardianFirstName.trim()) {
    errors.guardianFirstName = "Required"
  }
  if (formState.guardianLastName.trim()) {
    errors.guardianLastName = "Required"
  }
  if (formState.guardianAddress.trim()) {
    errors.guardianAddress = "Required"
  }
  if (formState.guardianCity.trim()) {
    errors.guardianCity = "Required"
  }
  if (formState.guardianRegion.trim()) {
    errors.guardianRegion = "Required"
  }
  if (formState.guardianPostcode.trim()) {
    errors.guardianPostcode = "Required"
  }
  if (formState.guardianDaytimePhone.trim()) {
    errors.guardianDaytimePhone = "Required"
  }
  if (formState.guardianEveningPhone.trim()) {
    errors.guardianEveningPhone = "Required"
  }
  if (formState.guardianMobile.trim()) {
    errors.guardianMobile = "Required"
  }
  if (formState.guardianEmail.trim()) {
    errors.guardianEmail = "Required"
  }
  if (formState.urbanSaintsTick === false) {
    errors.urbanSaintsTick = "Required"
  }
  if (formState.ypDeclaration === false) {
    errors.ypDeclaration = "Required"
  }
  if (formState.ypDeclarationDate.trim() === "") {
    errors.ypDeclarationDate = "Required"
  }
  if (formState.guardianDeclaration === false) {
    errors.guardianDeclaration = "Required"
  }
  if (formState.guardianDeclarationDate.trim() === "") {
    errors.guardianDeclarationDate = "Required"
  }

  return errors
}

const BookingForm = () => {
  return (
    <Formik
      initialValues={getInitialState()}
      validate={validateForm}
      onSubmit={() => {
        //
      }}
    >
      {({ values }) => {
        return <>{null}</>
      }}
    </Formik>
  )
}

export default BookingForm
