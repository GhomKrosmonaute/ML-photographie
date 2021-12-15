import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"

export default function Login({
  site,
  error,
}: Pick<Options, "site" | "error">) {
  return (
    <Page site={site} title="Se connecter" nav={[<a href="/"> Accueil </a>]}>
      <Section backgroundName="primary" site={site}>
        <h1> Connection </h1>

        <form action="/login" method="post">
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoFocus={true}
          />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
          {error && <span className="error"> {error} </span>}
        </form>
      </Section>
    </Page>
  )
}
