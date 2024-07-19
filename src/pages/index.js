import * as React from "react"
import Pages from "../components/Pages/Page"
import LoginForm from "../components/Connexion/login"
import Deconnexion from "../components/Connexion/deconnexion";

const IndexPage = () => {
  return (
    <Pages>
      <LoginForm/>
      <Deconnexion/>
    </Pages>
  )
}

export default IndexPage

export const Head = () => <title>WebConférences</title>
