import React from "react"

import Embed from "./Embed"

export default function Head({ site, scroll }) {
  return (
    <head>
      <title> {site.name} </title>
      <link
        rel="shortcut icon"
        href="/public/images/favicon.png"
        type="image/x-icon"
      />
      <link rel="stylesheet" href="/public/css/index.css" />
      {scroll && <script src="/public/js/scroll.js" defer />}
      <script src="/reload/reload.js" />
      <Embed site={site} />
    </head>
  )
}
