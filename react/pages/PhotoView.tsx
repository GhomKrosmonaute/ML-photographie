import React from "react"

import Page from "../components/Page"
import Section from "../components/Section"
import PhotoControls from "../components/PhotoControls"

export default function PhotoView({
  site,
  photo,
  admin,
}: Pick<Options, "site" | "photo" | "admin">) {
  return (
    <Page site={site} title={photo.name} nav={[<a href="/">Accueil</a>]}>
      <Section site={site} backgroundName="primary" id="view">
        <h1>{photo.name}</h1>

        <div>
          <img src={`/public/images/photos/${photo.id}.jpg`} alt={photo.name} />
          <PhotoControls admin={admin} photo={photo} />
        </div>
      </Section>
    </Page>
  )
}
