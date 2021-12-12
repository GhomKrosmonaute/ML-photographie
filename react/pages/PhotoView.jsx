import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"

export default function PhotoView({ site, image, admin }) {
  return (
    <Page site={site}>
      <Section site={site} backgroundName="primary">
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
          <img
            style={{ width: "100%", height: "100%" }}
            src={"/public/images/photos/" + image.id + ".jpg"}
            alt={image.name}
          />
        </div>
      </Section>
    </Page>
  )
}
