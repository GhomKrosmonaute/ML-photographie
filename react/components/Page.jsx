import React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

import Head from "./Head"
import ColorBar from "./ColorBar"

library.add(fas)

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
