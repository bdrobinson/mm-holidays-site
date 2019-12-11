import React, { FC } from "react"
import styled from "styled-components"
import { ErrorMessage } from "formik"

import { RED } from "../constants"

const Text = styled.div`
  color: ${RED};
`

interface Props {
  name: string
}

const FieldErrorMessage: FC<Props> = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>{message => <Text>{message}</Text>}</ErrorMessage>
  )
}

export default FieldErrorMessage
