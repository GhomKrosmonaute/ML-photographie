import React from "react"

import AdminPage from "../components/AdminPage"
import Section from "../components/Section"
import Nav from "../components/Nav"

export default function PhotoAdd({ site, admin }) {
  return (
    <AdminPage site={site} admin={admin}>
      <Section site={site} backgroundName="primary">
        <Nav>
          <a href="/"> Accueil </a>
        </Nav>
      </Section>
    </AdminPage>
  )
}
