import React from "react"

import Page from "../components/Page"
import Section from "../components/Section"
import Nav from "../components/Nav"

export default function PhotoAdd({ site, error }) {
  return (
    <Page site={site}>
      <Section site={site} backgroundName="primary">
        <Nav>
          <a href="/"> Accueil </a>
          <a href="/#gallery"> Gallerie </a>
          <a href="/admin"> Administration </a>
          <a href="/logout"> Se déconnecter </a>
        </Nav>

        <h1 style={{ paddingBottom: "250px" }}> Importer une photo </h1>

        <form
          action="/photo/add"
          method="post"
          style={{
            position: "absolute",
            zIndex: 2,
            left: "50vw",
            top: "50vh",
            transform: "translate(-50%, -50%)",
          }}
        >
          <input type="file" name="photo" />
          <label>
            <input type="checkbox" name="public" /> Rendre la photo publique.
          </label>
          <input type="submit" value="Envoyer" />
          {error && <span className="error"> {error} </span>}
        </form>
      </Section>
    </Page>
  )
}
