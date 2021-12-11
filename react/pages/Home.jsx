import React from "react"

import Nav from "../components/Nav"
import Page from "../components/Page"
import Section from "../components/Section"
import Wrapper from "../components/Wrapper"
import Citation from "../components/Citation"

export default function Home({ site, admin, images }) {
  return (
    <Page site={site}>
      <Section id="title" backgroundName="primary" next="/#gallery" site={site}>
        <Nav>
          <a href="/#gallery"> Gallerie </a>
          <a href="/#about"> A propos </a>
          {admin ? (
            <>
              <a href="/admin"> Administration </a>
              <a href="/logout">
                <span className="more-of-850"> Se déconnecter </span>
                <span className="less-of-850">
                  {" "}
                  <i className="fa fa-sign-out-alt" />{" "}
                </span>
              </a>
            </>
          ) : (
            <a href="/login"> Se connecter </a>
          )}
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
        <Wrapper images={images} />
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
