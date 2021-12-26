import React from "react"

import Page from "../components/Page"
import Section from "../components/Section"
import Nav from "../components/Nav"

export default function Error({
  site,
  code,
  message,
  children,
}: Pick<Options, "children" | "site" | "code" | "message">) {
  return (
    <Page
      site={site}
      title={`Error ${code}`}
      nav={[<a href="/">Retour à l'accueil</a>]}
    >
      <Section site={site} backgroundName="primary">
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
