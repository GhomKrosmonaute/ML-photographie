import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"

export default function Admin({ site }) {
  return (
    <Page site={site} scroll={true}>
      <Section
        backgroundName="primary"
        site={site}
        id="metrics"
        next="/admin#settings"
      >
        <Nav>
          <a href="/"> Accueil </a>
          <a href="/new"> Importer </a>
          <a href="/admin#settings"> Paramètres </a>
        </Nav>

        <h1> Administration </h1>
      </Section>
      <Section
        backgroundName="secondary"
        site={site}
        id="settings"
        prev="/admin#metrics"
      />
    </Page>
  )
}
