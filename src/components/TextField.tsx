import React, { FC } from "react"
import { Field } from "formik"
import styled from "styled-components"

import { MOBILE_WIDTH, GREY_BORDER_COLOUR } from "../constants"
import FieldErrorMessage from "./FieldErrorMessage"
import FieldTitle from "./FieldTitle"

interface Props {
  name: string
  label: string
  subtitle?: string | null
  type?: string
  allowAutocomplete?: boolean
}

const Main = styled.label`
  display: block;
  width: ${MOBILE_WIDTH - 100}px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
  }
`

const Subtitle = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.5em;
`

const InputContainer = styled.div`
  margin-bottom: 0.4em;
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

const TextField: FC<Props> = ({
  name,
  label,
  type = "text",
  subtitle,
  allowAutocomplete = true,
}: Props) => {
  return (
    <Main>
      <FieldTitle>{label}</FieldTitle>
      {subtitle != null && <Subtitle>{subtitle}</Subtitle>}
      <InputContainer>
        <Input
          name={name}
          type={type}
          autoComplete={allowAutocomplete ? undefined : "off"}
        />
      </InputContainer>
      <FieldErrorMessage name={name} />
    </Main>
  )
}

export default TextField
