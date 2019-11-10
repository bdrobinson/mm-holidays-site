import React, { FC } from "react"
import styled from "styled-components"
import { ErrorMessage } from "formik"

const Text = styled.div`
  color: red;
`

interface Props {
  name: string
}

const FieldErrorMessage: FC<Props> = ({ name }) => {
  return (
    <ErrorMessage name={name}>{message => <Text>{message}</Text>}</ErrorMessage>
  )
}

export default FieldErrorMessage
