// @flow

import { differenceInMonths, format } from "date-fns"

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

export type Column = {
  id: string,
  name: string,
  value: string,
}

export const createColumns = (params: Params): Array<Column> => {
  const birthDate = parseDate(
    params.childDobYear,
    params.childDobMonth,
    params.childDobDay,
  )
  const now = new Date()
  const monthAgeNow = differenceInMonths(now, birthDate)

  const campDate = campStartDate(params)
  const monthAgeCamp = differenceInMonths(campDate, birthDate)
  return [
    {
      id: "campChoice",
      name: "Camp week",
      value: params.campChoice,
    },
    {
      id: "childFirstName",
      name: "Name (first)",
      value: params.childFirstName,
    },
    {
      id: "childLastName",
      name: "Name (last)",
      value: params.childLastName,
    },
    { id: "gender", name: "Gender", value: params.gender },
    {
      id: "childDob",
      name: "DOB",
      value: `${params.childDobDay}/${params.childDobMonth}/${
        params.childDobYear
      }`,
    },
    {
      id: "childYearsNow",
      name: "Years (now)",
      value: Math.floor(monthAgeNow / 12).toFixed(0),
    },
    {
      id: "childMonthsNow",
      name: "Months (now)",
      value: (monthAgeNow % 12).toFixed(0),
    },
    {
      id: "childYearsCamp",
      name: "Years (holiday)",
      value: Math.floor(monthAgeCamp / 12).toFixed(0),
    },
    {
      id: "childMonthsCamp",
      name: "Months (holiday)",
      value: (monthAgeCamp % 12).toFixed(0),
    },
    {
      id: "childAddressLine1",
      name: "Address line 1",
      value: params.childAddressLine1,
    },
    {
      id: "childAddressLine2",
      name: "Address line 2",
      value: params.childAddressLine2,
    },
    {
      id: "childAddressCity",
      name: "Town/city",
      value: params.childAddressCity,
    },
    {
      id: "childAddressCounty",
      name: "County",
      value: params.childAddressCounty,
    },
    {
      id: "childPostcode",
      name: "Postcode",
      value: params.childPostcode,
    },
    {
      id: "childHomePhone",
      name: "Child's home phone",
      // This might be a mobile but that's okay
      value: params.childPhone,
    },
    {
      id: "childMobilePhone",
      name: "Child's mobile",
      value: "",
    },
    {
      id: "childEmail",
      name: "Child's email",
      value: params.childEmail,
    },
    {
      id: "youthGroup",
      name: "Youth group",
      value: params.youthGroup,
    },
    {
      id: "friendsWith",
      name: "Friends with",
      value: params.friendsWith,
    },
    { id: "title", name: "Title (parent)", value: params.title },
    {
      id: "parentFirstName",
      name: "First name (parent)",
      value: params.parentFirstName,
    },
    {
      id: "parentLastName",
      name: "Last name (parent)",
      value: params.parentLastName,
    },
    {
      id: "parentChildRelationship",
      name: "Relationship to child",
      value: params.parentRelationshipToChild,
    },
    {
      id: "parentAddressLine1",
      name: "Address line 1 (parent)",
      value: params.parentAddressLine1,
    },
    {
      id: "parentAddressLine2",
      name: "Address line 2 (parent)",
      value: params.parentAddressLine2,
    },
    {
      id: "parentAddressCity",
      name: "City (parent)",
      value: params.parentAddressCity,
    },
    {
      id: "parentAddressCounty",
      name: "County (parent)",
      value: params.parentAddressCounty,
    },
    {
      id: "parentPostcode",
      name: "Postcode (parent)",
      value: params.parentPostcode,
    },
    {
      id: "parentMobilePhone",
      name: "Parent mobile phone",
      value: params.parentMobile,
    },
    {
      id: "parentDaytimePhone",
      name: "Parent daytime phone",
      value: params.parentDaytimePhone,
    },
    {
      id: "parentEveningPhone",
      name: "Parent evening phone",
      value: params.parentEveningPhone,
    },
    {
      id: "parentEmail",
      name: "Parent email",
      value: params.parentEmail,
    },
    {
      id: "siblingNames",
      name: "Sibling names",
      value: params.siblingNames,
    },
    {
      id: "contactByEmail",
      name: "Contact email?",
      value: stringifyBoolean(params.contactByEmail),
    },
    {
      id: "contactByPhone",
      name: "Contact phone?",
      value: stringifyBoolean(params.contactByPhone),
    },
    {
      id: "contactByPost",
      name: "Contact post?",
      value: stringifyBoolean(params.contactByPost),
    },
    {
      id: "acceptRecordKeeping",
      name: "Accept record keeping",
      value: stringifyBoolean(params.acceptRecordKeeping),
    },
    {
      id: "photoPermission",
      name: "Photo permission",
      value: stringifyBoolean(params.photoPermission),
    },
    {
      id: "heardUrbanSaintsMailing",
      name: "Urban Saints mailing?",
      value: stringifyBoolean(params.heardUrbanSaintsMailing),
    },
    {
      id: "heardUrbanSaintsWebsite",
      name: "Urban Saints website?",
      value: stringifyBoolean(params.heardUrbanSaintsWebsite),
    },
    {
      id: "heardBeenBefore",
      name: "Been before",
      value: stringifyBoolean(params.heardBeenBefore),
    },
    {
      id: "heardFamilyMember",
      name: "Family member",
      value: stringifyBoolean(params.heardFamilyMember),
    },
    {
      id: "heardChurch",
      name: "Church",
      value: stringifyBoolean(params.heardChurch),
    },
    {
      id: "heardScriptureUnion",
      name: "Scripture union",
      value: stringifyBoolean(params.heardScriptureUnion),
    },
    {
      id: "heardFriend",
      name: "Friend",
      value: stringifyBoolean(params.heardFriend),
    },
    {
      id: "heardOther",
      name: "Other",
      value: params.heardOther,
    },
    {
      id: "paymentMethod",
      name: "Payment method",
      value: params.paymentMethod,
    },
    {
      id: "paymentAmount",
      name: "Payment amount",
      value: params.paymentAmount,
    },
    {
      id: "dietaryNeeds",
      name: "Dietary needs",
      value: params.dietaryNeeds,
    },
    {
      id: "medicalIssues",
      name: "Medical issues",
      value: params.medicalIssues,
    },
    {
      id: "behaviouralNeeds",
      name: "Behavioural needs",
      value: params.behaviouralNeeds,
    },
    {
      id: "englishNotFirstLanguage",
      name: "English not first language",
      value: params.englishNotFirstLanguage,
    },
    {
      id: "anythingElse",
      name: "Anything else",
      value: params.anythingElse,
    },
    {
      id: "childConfirmation",
      name: "Child confirmation",
      value: stringifyBoolean(params.childConfirmation),
    },
    {
      id: "parentConfirmation",
      name: "Parent confirmation",
      value: stringifyBoolean(params.parentConfirmation),
    },
    {
      id: "formSubmissionDate",
      name: "Form submission date",
      value: format(now, "DD/MM/YYYY"),
    },
  ]
}
