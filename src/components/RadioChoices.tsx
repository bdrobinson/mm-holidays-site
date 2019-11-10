import React, { FC } from "react"
import styled from "styled-components"
import { Field } from "formik"

import FieldErrorMessage from "./FieldErrorMessage"

const Main = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const LabelText = styled.div``

const LabelSubtitle = styled.div`
  font-size: 0.7em;
  margin-bottom: 0.7em;
`

const Title = styled.p`
  margin-bottom: 0.3em;
`

const Choice = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 1em;
  margin-right: 0.7em;
  border-radius: 0.4em;
  border-color: #ddd;
  border-style: solid;
  border-width: 1px;
`

interface Props {
  title?: string | null
  fieldName: string
  value: string | null
  options: Array<{
    value: string
    label: string
    subtitle?: string | null
    disabled?: boolean | null
  }>
}

const RadioChoices: FC<Props> = ({ options, value, fieldName, title }) => {
  return (
    <div>
      {title != null && <Title>{title}</Title>}
      <Main>
        {options.map(option => {
          return (
            <label key={option.value}>
              <Choice
                style={{
                  cursor: option.disabled ? "not-allowed" : "pointer",
                  opacity: option.disabled ? 0.5 : 1,
                }}
              >
                <LabelText>{option.label}</LabelText>
                {option.subtitle != null && (
                  <LabelSubtitle>{option.subtitle}</LabelSubtitle>
                )}
                <Field
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  checked={option.value === value}
                  style={{
                    cursor: option.disabled ? "not-allowed" : "pointer",
                    opacity: 1,
                  }}
                  disabled={option.disabled}
                />
              </Choice>
            </label>
          )
        })}
      </Main>
      <FieldErrorMessage name={fieldName} />
    </div>
  )
}

export default RadioChoices
