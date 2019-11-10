import React, { FC } from "react"
import { Field } from "formik"
import styled from "styled-components"

import { MOBILE_WIDTH, GREY_BORDER_COLOUR } from "../constants"
import FieldErrorMessage from "./FieldErrorMessage"

interface Props {
  name: string
  label: string
  subtitle?: string | null
  type?: string
}

const Main = styled.label`
  display: block;
`

const Label = styled.p`
  margin-bottom: 0;
`

const Subtitle = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.5em;
`

const InputContainer = styled.div`
  margin-bottom: 0.4em;
  width: ${MOBILE_WIDTH - 100}px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
  }
`

const Input = styled(Field)`
  padding: 0.7em;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${GREY_BORDER_COLOUR};
`

const TextField: FC<Props> = ({ name, label, type = "text", subtitle }) => {
  return (
    <Main>
      <Label>{label}</Label>
      {subtitle != null && <Subtitle>{subtitle}</Subtitle>}
      <InputContainer>
        <Input name={name} type={type} />
      </InputContainer>
      <FieldErrorMessage name={name} />
    </Main>
  )
}

export default TextField
