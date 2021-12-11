import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"

export default function Login({ site }) {
  return (
    <Page site={site}>
      <Section backgroundName="primary" site={site}>
        <Nav>
          <a href="/"> Accueil </a>
        </Nav>

        <h1 style={{ paddingBottom: "250px" }}> Connection </h1>

        <form
          action="/login"
          method="post"
          style={{
            position: "absolute",
            zIndex: 2,
            left: "50vw",
            top: "50vh",
            transform: "translate(-50%, -50%)",
          }}
        >
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </Section>
    </Page>
  )
}
