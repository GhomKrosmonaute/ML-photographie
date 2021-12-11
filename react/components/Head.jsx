import React from "react"

import Embed from "./Embed"

export default function Head({ site }) {
  return (
    <head>
      <title> {site.name} </title>
      <link
        rel="shortcut icon"
        href="/public/images/favicon.png"
        type="image/x-icon"
      />
      <link rel="stylesheet" href="/public/css/index.css" />
      <Embed site={site} />
    </head>
  )
}
