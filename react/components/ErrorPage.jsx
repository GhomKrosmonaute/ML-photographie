import React from "react"

import Page from "./Page"
import Section from "./Section"
import Nav from "./Nav"

export default function ErrorPage({ site, code, message, children }) {
  return (
    <Page site={site}>
      <Section site={site} backgroundName="primary">
        <Nav>
          <a href="/">Accueil</a>
        </Nav>

        <h1
          style={{
            fontFamily: "arial",
          }}
        >
          Error
          <span
            style={{
              color: "var(--COLOR_3)",
              margin: "0 10px",
            }}
          >
            {code}
          </span>
        </h1>
        <div
          style={{
            position: "absolute",
            left: "50vw",
            top: "60vh",
            fontSize: "25px",
            transform: "translateX(-50%)",
            color: "var(--COLOR_5)",
            textAlign: "center",
          }}
        >
          {message}
        </div>
        {children}
      </Section>
    </Page>
  )
}
