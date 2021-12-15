import React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

import Nav from "./Nav"
import Head from "./Head"
import ColorBar from "./ColorBar"

library.add(fas)

export default function Page({
  site,
  title,
  children,
  scroll,
  nav,
}: Pick<Options, "site" | "children" | "title"> & {
  scroll?: boolean
  nav?: any[]
}) {
  return (
    <>
      <Head title={title} site={site} scroll={scroll} />
      <body>
        {nav && <Nav>{nav}</Nav>}
        <ColorBar />
        {children}
        <ColorBar bottom />
      </body>
    </>
  )
}
