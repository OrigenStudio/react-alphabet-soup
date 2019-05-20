import React from "react"
import AlphabetSoup from "react-alphabet-soup"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoup text="NEALS YARD" fontSize="24px" sorting="costFunction" costFunctionYWeight={3} />
    </div>
  </Layout>
)

export default IndexPage
