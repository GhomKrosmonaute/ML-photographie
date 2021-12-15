import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"
import Wrapper from "../components/Wrapper"
import Citation from "../components/Citation"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home({
  site,
  admin,
  photos,
}: Pick<Options, "site" | "admin" | "photos">) {
  return (
    <Page site={site} scroll>
      <Section id="title" backgroundName="primary" next="/#gallery" site={site}>
        <Nav>
          <a href="/#gallery"> Gallerie </a>
          <a href="/#about"> A propos </a>
          {admin && <a href="/admin"> Administration </a>}
          {admin && (
            <a href="/logout">
              <span className="more-of-850"> Se déconnecter </span>
              <span className="less-of-850">
                <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
              </span>
            </a>
          )}
          {!admin ? <a href="/login"> Se connecter </a> : null}
        </Nav>

        <h1> {site.name} </h1>
      </Section>

      <Section
        site={site}
        id="gallery"
        backgroundName="secondary"
        prev="/#title"
        next="/#about"
      >
        <Wrapper photos={photos} admin={admin} />
      </Section>

      <Section
        site={site}
        id="about"
        backgroundName="tertiary"
        prev="/#gallery"
      >
        <Citation> {site.description} </Citation>
      </Section>
    </Page>
  )
}
