// @flow

import React from "react"
import styled from "styled-components"
import { ErrorMessage } from "formik"

const Text = styled.div`
  color: red;
`

type Props = {|
  name: string,
|}

const FieldErrorMessage = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>{message => <Text>{message}</Text>}</ErrorMessage>
  )
}

export default FieldErrorMessage
