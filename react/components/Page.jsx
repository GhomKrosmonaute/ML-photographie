import React from "react"

import Head from "./Head"
import ColorBar from "./ColorBar"

export default function Page({ site, children }) {
  return (
    <>
      <Head site={site} />
      <body>
        <ColorBar />
        {children}
      </body>
    </>
  )
}
