import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"
import Wrapper from "../components/Wrapper"
import Citation from "../components/Citation"
import Photographer from "../components/Photographer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home({
  site,
  admin,
  photos,
}: Pick<Options, "site" | "admin" | "photos">) {
  return (
    <Page
      site={site}
      title="Accueil"
      nav={[
        <a key={0} href="/gallery">
          Gallerie
        </a>,
        <a key={1} href="/#about">
          A propos
        </a>,
        admin && (
          <a key={2} href="/admin">
            Administration
          </a>
        ),
        admin && (
          <a key={3} href="/logout">
            <span className="more-of-850"> Se déconnecter </span>
            <span className="less-of-850">
              <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
            </span>
          </a>
        ),
        !admin ? (
          <a key={4} href="/login">
            Se connecter
          </a>
        ) : null,
      ]}
      scroll
    >
      <Section
        id="title"
        backgroundName="primary"
        next="/#highlighted"
        site={site}
      >
        <h1> {site.name} </h1>
      </Section>

      <Section
        site={site}
        id="highlighted"
        backgroundName="secondary"
        prev="/#title"
        next="/#about"
      >
        <h1>Photos mises en avant</h1>
        <div
          style={{
            width: "80vw",
            height: "70vh",
          }}
        >
          <Wrapper photos={photos} admin={admin} autoScroll />
        </div>
      </Section>

      <Section
        site={site}
        id="about"
        backgroundName="tertiary"
        prev="/#highlighted"
      >
        <Citation content={site.description}>
          <Photographer site={site} />
        </Citation>
      </Section>
    </Page>
  )
}
