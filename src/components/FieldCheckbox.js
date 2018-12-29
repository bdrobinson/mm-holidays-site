// @flow

import React from "react"
import { Field } from "formik"
import styled from "styled-components"

import FieldErrorMessage from "./FieldErrorMessage"

type Props = {|
  fieldName: string,
  checked: boolean,
  label: string,
|}

const Row = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const LabelText = styled.div`
  margin-left: 0.5em;
`

const FieldCheckbox = ({ fieldName, checked, label }: Props) => {
  return (
    <div>
      <p>
        <Row>
          <Field type="checkbox" name={fieldName} checked={checked} />
          <LabelText>{label}</LabelText>
        </Row>
      </p>
      <FieldErrorMessage name={fieldName} />
    </div>
  )
}

export default FieldCheckbox
