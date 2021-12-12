import React from "react"

import Page from "./Page"
import ErrorPage from "./ErrorPage"

export default function AdminPage({ site, scroll, children, admin }) {
  return admin ? (
    <Page site={site} scroll={scroll}>
      {" "}
      {children}{" "}
    </Page>
  ) : (
    <ErrorPage code={401} message="Unauthorised page">
      <p>
        {" "}
        Vous devez vous <a href="/login">conecter</a> pour pouvoir visiter cette
        page.{" "}
      </p>
    </ErrorPage>
  )
}
