import React, { FC } from "react"
import Layout from "../components/Layout"

interface Props {}

const NotFoundPage: FC<Props> = () => (
  <Layout title={null} seoDescription="404 page" path={null}>
    <h2>404</h2>
    <p>This URL doesn&apos;t exist.</p>
  </Layout>
)

export default NotFoundPage
