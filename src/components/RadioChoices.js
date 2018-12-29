// @flow

import React from "react"
import styled from "styled-components"
import { Field, ErrorMessage } from "formik"

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
  cursor: pointer;
`

type Props = {|
  title?: ?string,
  fieldName: string,
  value: string,
  options: Array<{ value: string, label: string, subtitle?: ?string }>,
|}

const RadioChoices = ({ options, value, fieldName, title }: Props) => {
  return (
    <div>
      {title != null && <Title>{title}</Title>}
      <Main>
        {options.map(option => {
          return (
            <label key={option.value}>
              <Choice>
                <LabelText>{option.label}</LabelText>
                {option.subtitle != null && (
                  <LabelSubtitle>{option.subtitle}</LabelSubtitle>
                )}
                <Field
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  checked={option.value === value}
                  style={{ cursor: "pointer" }}
                />
              </Choice>
            </label>
          )
        })}
        <ErrorMessage name={fieldName} />
      </Main>
    </div>
  )
}

export default RadioChoices
