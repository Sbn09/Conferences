import * as React from "react"
import Pages from "../components/Pages/Page"
import ConfList from "../components/Pages/ConfList.jsx";

const IndexPage = () => {
  return (
    <Pages>
      <ConfList/>
    </Pages>
  )
}

export default IndexPage

export const Head = () => <title>WebConférences</title>
