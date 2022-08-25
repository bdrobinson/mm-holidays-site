import React, { FC } from "react"
import Layout from "../components/Layout"
import HeadTags from "../components/HeadTags"

interface Props {}

const NotFoundPage: FC<Props> = () => (
  <Layout>
    <h2>404</h2>
    <p>This URL doesn&apos;t exist.</p>
  </Layout>
)

export const Head = () => {
  return <HeadTags title={null} seoDescription="404 page" path={null} />
}

export default NotFoundPage
