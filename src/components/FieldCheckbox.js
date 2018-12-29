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

const Main = styled.div`
  color: inherit;
`

const Row = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 0.3em;
`

const LabelText = styled.div`
  margin-left: 0.5em;
`

const FieldCheckbox = ({ fieldName, checked, label }: Props) => {
  return (
    <Main>
      <Row>
        <Field type="checkbox" name={fieldName} checked={checked} />
        <LabelText>{label}</LabelText>
      </Row>
      <FieldErrorMessage name={fieldName} />
    </Main>
  )
}

export default FieldCheckbox
