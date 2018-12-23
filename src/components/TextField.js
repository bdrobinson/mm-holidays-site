// @flow

import React from "react"
import { Field, ErrorMessage } from "formik"

type Props = {|
  name: string,
  label: string,
  type?: string,
|}

const TextField = ({ name, label, type = "text" }: Props) => {
  return (
    <div>
      <label>
        <p>{label}</p>
        <Field name={name} type={type} />
        <ErrorMessage name={name} />
      </label>
    </div>
  )
}

export default TextField
