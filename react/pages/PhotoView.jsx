import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Image from "../components/Image"
import Section from "../components/Section"

export default function PhotoView({ site, image, admin }) {
  return (
    <Page site={site}>
      <Section site={site} backgroundName="primary" id="view">
        <Nav>
          <a href="/">Accueil</a>
        </Nav>
        <div
          style={{
            position: "absolute",
            zIndex: 5,
            left: "50vw",
            top: "50vh",
            transform: "translate(-50%, -50%)",
            maxHeight: "50vh",
            maxWidth: "50vw",
          }}
        >
          <Image image={image} admin={admin} view={true} />
        </div>
      </Section>
    </Page>
  )
}
