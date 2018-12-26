// @flow

// $FlowFixMe
import differenceInMonths from "date-fns/differenceInMonths"
import format from "date-fns/format"

import { type Params } from "../book"

const stringifyBoolean = (bool: boolean) => {
  return bool ? "Yes" : "No"
}

const parseDate = (year: string, month: string, day: string) => {
  return new Date(`${year}/${month}/${day}`)
}

const campStartDate = (params: Params) => {
  if (params.campChoice === "1") {
    return new Date("2019/07/27")
  } else {
    return new Date("2019/08/03")
  }
}

export const columns: Array<{
  id: string,
  name: string,
  getValue: Params => string,
}> = [
  {
    id: "campChoice",
    name: "Camp week",
    getValue: (params: Params) => params.campChoice,
  },
  {
    id: "childFirstName",
    name: "Name (first)",
    getValue: params => params.childFirstName,
  },
  {
    id: "childLastName",
    name: "Name (last)",
    getValue: params => params.childLastName,
  },
  { id: "gender", name: "Gender", getValue: params => params.gender },
  {
    id: "childDob",
    name: "DOB",
    getValue: params =>
      `${params.childDobDay}/${params.childDobMonth}/${params.childDobYear}`,
  },
  {
    id: "childYearsNow",
    name: "Years (now)",
    getValue: params => {
      const birthDate = parseDate(
        params.childDobDay,
        params.childDobMonth,
        params.childDobDay,
      )
      const now = new Date()
      const monthAge = differenceInMonths(now, birthDate)
      const yearsNow = Math.floor(monthAge / 12)
      return yearsNow.toFixed(0)
    },
  },
  {
    id: "childMonthsNow",
    name: "Months (now)",
    getValue: params => {
      const birthDate = parseDate(
        params.childDobDay,
        params.childDobMonth,
        params.childDobDay,
      )
      const now = new Date()
      const monthAge = differenceInMonths(now, birthDate)
      return (monthAge % 12).toFixed(0)
    },
  },
  {
    id: "childYearsCamp",
    name: "Years (holiday)",
    getValue: params => {
      const birthDate = parseDate(
        params.childDobDay,
        params.childDobMonth,
        params.childDobDay,
      )
      const camp = campStartDate(params)
      const monthAge = differenceInMonths(camp, birthDate)
      return Math.floor(monthAge / 12).toFixed(0)
    },
  },
  {
    id: "childMonthsCamp",
    name: "Months (holiday)",
    getValue: params => {
      const birthDate = parseDate(
        params.childDobDay,
        params.childDobMonth,
        params.childDobDay,
      )
      const camp = campStartDate(params)
      const monthAge = differenceInMonths(camp, birthDate)
      return (monthAge % 12).toFixed(0)
    },
  },
  {
    id: "childAddressLine1",
    name: "Address line 1",
    getValue: params => params.childAddressLine1,
  },
  {
    id: "childAddressLine2",
    name: "Address line 2",
    getValue: params => params.childAddressLine2,
  },
  {
    id: "childAddressCity",
    name: "Town/city",
    getValue: params => params.childAddressCity,
  },
  {
    id: "childAddressCounty",
    name: "County",
    getValue: params => params.childAddressCounty,
  },
  {
    id: "childPostcode",
    name: "Postcode",
    getValue: params => params.childPostcode,
  },
  {
    id: "childHomePhone",
    name: "Child's home phone",
    // This might be a mobile but that's okay
    getValue: params => params.childPhone,
  },
  {
    id: "childMobilePhone",
    name: "Child's mobile",
    getValue: params => "",
  },
  {
    id: "childEmail",
    name: "Child's email",
    getValue: params => params.childEmail,
  },
  {
    id: "youthGroup",
    name: "Youth group",
    getValue: params => params.youthGroup,
  },
  {
    id: "friendsWith",
    name: "Friends with",
    getValue: params => params.friendsWith,
  },
  { id: "title", name: "Title (parent)", getValue: params => params.title },
  {
    id: "parentFirstName",
    name: "First name (parent)",
    getValue: params => params.parentFirstName,
  },
  {
    id: "parentLastName",
    name: "Last name (parent)",
    getValue: params => params.parentLastName,
  },
  {
    id: "parentChildRelationship",
    name: "Relationship to child",
    getValue: params => params.parentRelationshipToChild,
  },
  {
    id: "parentAddressLine1",
    name: "Address line 1 (parent)",
    getValue: params => params.parentAddressLine1,
  },
  {
    id: "parentAddressLine2",
    name: "Address line 2 (parent)",
    getValue: params => params.parentAddressLine2,
  },
  {
    id: "parentAddressCity",
    name: "City (parent)",
    getValue: params => params.parentAddressCity,
  },
  {
    id: "parentAddressCounty",
    name: "County (parent)",
    getValue: params => params.parentAddressCounty,
  },
  {
    id: "parentPostcode",
    name: "Postcode (parent)",
    getValue: params => params.parentPostcode,
  },
  {
    id: "parentMobilePhone",
    name: "Parent mobile phone",
    getValue: params => params.parentMobile,
  },
  {
    id: "parentDaytimePhone",
    name: "Parent daytime phone",
    getValue: params => params.parentDaytimePhone,
  },
  {
    id: "parentEveningPhone",
    name: "Parent evening phone",
    getValue: params => params.parentEveningPhone,
  },
  {
    id: "parentEmail",
    name: "Parent email",
    getValue: params => params.parentEmail,
  },
  {
    id: "siblingNames",
    name: "Sibling names",
    getValue: params => params.siblingNames,
  },
  {
    id: "contactByEmail",
    name: "Contact email?",
    getValue: params => stringifyBoolean(params.contactByEmail),
  },
  {
    id: "contactByPhone",
    name: "Contact phone?",
    getValue: params => stringifyBoolean(params.contactByPhone),
  },
  {
    id: "contactByPost",
    name: "Contact post?",
    getValue: params => stringifyBoolean(params.contactByPost),
  },
  {
    id: "acceptRecordKeeping",
    name: "Accept record keeping",
    getValue: params => stringifyBoolean(params.acceptRecordKeeping),
  },
  {
    id: "photoPermission",
    name: "Photo permission",
    getValue: params => stringifyBoolean(params.photoPermission),
  },
  {
    id: "heardUrbanSaintsMailing",
    name: "Urban Saints mailing?",
    getValue: params => stringifyBoolean(params.heardUrbanSaintsMailing),
  },
  {
    id: "heardUrbanSaintsWebsite",
    name: "Urban Saints website?",
    getValue: params => stringifyBoolean(params.heardUrbanSaintsWebsite),
  },
  {
    id: "heardBeenBefore",
    name: "Been before",
    getValue: params => stringifyBoolean(params.heardBeenBefore),
  },
  {
    id: "heardFamilyMember",
    name: "Family member",
    getValue: params => stringifyBoolean(params.heardFamilyMember),
  },
  {
    id: "heardChurch",
    name: "Church",
    getValue: params => stringifyBoolean(params.heardChurch),
  },
  {
    id: "heardScriptureUnion",
    name: "Scripture union",
    getValue: params => stringifyBoolean(params.heardScriptureUnion),
  },
  {
    id: "heardFriend",
    name: "Friend",
    getValue: params => stringifyBoolean(params.heardFriend),
  },
  {
    id: "heardOther",
    name: "Other",
    getValue: params => params.heardOther,
  },
  {
    id: "paymentMethod",
    name: "Payment method",
    getValue: params => params.paymentMethod,
  },
  {
    id: "paymentAmount",
    name: "Payment amount",
    getValue: params => params.paymentAmount,
  },
  {
    id: "dietaryNeeds",
    name: "Dietary needs",
    getValue: params => params.dietaryNeeds,
  },
  {
    id: "medicalIssues",
    name: "Medical issues",
    getValue: params => params.medicalIssues,
  },
  {
    id: "behaviouralNeeds",
    name: "Behavioural needs",
    getValue: params => params.behaviouralNeeds,
  },
  {
    id: "englishNotFirstLanguage",
    name: "English not first language",
    getValue: params => params.englishNotFirstLanguage,
  },
  {
    id: "anythingElse",
    name: "Anything else",
    getValue: params => params.anythingElse,
  },
  {
    id: "childConfirmation",
    name: "Child confirmation",
    getValue: params => stringifyBoolean(params.childConfirmation),
  },
  {
    id: "parentConfirmation",
    name: "Parent confirmation",
    getValue: params => stringifyBoolean(params.parentConfirmation),
  },
  {
    id: "formSubmissionDate",
    name: "Form submission date",
    getValue: params => format(new Date(), "YYYY/MM/DD"),
  },
]
