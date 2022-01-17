import React from "react"
import Page from "../components/Page"
import Section from "../components/Section"
import PhotoControls from "../components/PhotoControls"

export default function PhotoOrder({
  site,
  photo,
  admin,
}: Pick<Options, "site" | "photo" | "admin">) {
  return (
    <Page
      site={site}
      title={photo.name}
      nav={[
        <a href="/" key={0}>
          Accueil
        </a>,
      ]}
    >
      <Section site={site} backgroundName="primary" id="order">
        <h1>Commander</h1>
        <div className="two-columns">
          <div>
            {/* PHOTO VIEW */}
            <div>
              <img
                id="photo-view"
                src={`/public/images/photos/${photo.id}.jpg`}
                alt={photo.name}
              />
              <PhotoControls admin={admin} photo={photo} />
            </div>
            <h2>{photo.name.replace(".jpg", "")}</h2>
          </div>
          <div>{/* FORM */}</div>
        </div>
      </Section>
    </Page>
  )
}
