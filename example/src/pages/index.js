import React from "react"
import Typography from "@material-ui/core/Typography"
import { AlphabetSoupWithDimensions } from "react-alphabet-soup"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO
      title="react-alphabet-soup"
      keywords={[`react`, `animation`, `text`, `alphabet-soup`]}
    />
    <Typography variant="h4" gutterBottom>
      Generate an Alphabet Soup like animation with the text
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Hover over the text area to try it!
    </Typography>
    <Typography variant="h6">
      Sorting: 'none' | TransitionStyle='constant'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="none"
        transitionStyle="constant"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'none' | TransitionStyle: 'constant' | untidyOnHover: true
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="none"
        transitionStyle="constant"
        untidyOnHover={true}
      />
    </div>
    <Typography variant="h6">
      Sorting: 'sortByY' | TransitionStyle: 'constant' | vertical: true
    </Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: `70px`,
          height: "900px",
          marginBottom: `1.45rem`,
        }}
      >
        <AlphabetSoupWithDimensions
          text="Hello, world!"
          fontSize="24px"
          sorting="sortByY"
          transitionStyle="constant"
          vertical={true}
        />
      </div>
    </div>
    <Typography variant="h6">
      Sorting: 'sortByY' | TransitionStyle: 'constant' | untidyOnHover: true |
      vertical: true
    </Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: `70px`,
          height: "900px",
          marginBottom: `1.45rem`,
        }}
      >
        <AlphabetSoupWithDimensions
          text="Hello, world!"
          fontSize="24px"
          sorting="sortByY"
          transitionStyle="constant"
          untidyOnHover={true}
          vertical={true}
        />
      </div>
    </div>
    <Typography variant="h6">
      Sorting: 'none' | TransitionStyle: 'progressive'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="none"
        transitionStyle="progressive"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'none' | TransitionStyle: 'random'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="none"
        transitionStyle="random"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'costFunction' | TransitionStyle: 'constant'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="costFunction"
        costFunctionYWeight={3}
        transitionStyle="constant"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'costFunction' | TransitionStyle: 'progressive'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="costFunction"
        costFunctionYWeight={3}
        transitionStyle="progressive"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'costFunction' | TransitionStyle: 'random'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="costFunction"
        costFunctionYWeight={3}
        transitionStyle="random"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'sortByX' | TransitionStyle: 'random'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="sortByX"
        transitionStyle="random"
      />
    </div>
    <Typography variant="h6">
      Sorting: 'sortByY' | TransitionStyle: 'random'
    </Typography>
    <div style={{ width: `100%`, height: "500px", marginBottom: `1.45rem` }}>
      <AlphabetSoupWithDimensions
        text="Hello, world!"
        fontSize="24px"
        sorting="sortByY"
        transitionStyle="random"
      />
    </div>
  </Layout>
)

export default IndexPage
