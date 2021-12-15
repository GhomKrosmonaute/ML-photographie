import React from "react"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

import Head from "./Head"
import ColorBar from "./ColorBar"

library.add(fas)

export default function Page({
  site,
  title,
  children,
  scroll,
}: Pick<Options, "site" | "children" | "title"> & {
  scroll?: boolean
}) {
  return (
    <>
      <Head title={title} site={site} scroll={scroll} />
      <body>
        <ColorBar />
        {children}
        <ColorBar bottom />
      </body>
    </>
  )
}
