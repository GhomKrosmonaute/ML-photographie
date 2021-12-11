import React from "react"

import Head from "./Head"
import ColorBar from "./ColorBar"

export default function Page({ site, children, scroll }) {
  return (
    <>
      <Head site={site} scroll={scroll} />
      <body>
        <ColorBar />
        {children}
        <ColorBar bottom />
      </body>
    </>
  )
}
