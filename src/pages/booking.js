// @flow

import React from "react"
import { graphql } from "gatsby"

import BookingForm from "../components/BookingForm"
import Layout from "../components/Layout"

type Props = {| data: Object |}

const Booking = ({ data }: Props) => {
  return (
    <Layout title="Book">
      <h1>Book your place</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <BookingForm />
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "//booking/intro.md/" }) {
      html
    }
  }
`

export default Booking
