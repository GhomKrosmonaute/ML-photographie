import React from "react"

import Head from "./Head"
import ColorBar from "./ColorBar"

export default function Page({ site, children, scroll }) {
  const coolDown = 1000
  let time = Date.now()

  /** @param event {React.WheelEvent} */
  function handleWheel(event) {
    if (!scroll) return

    console.log("wheel handled")

    event.preventDefault()

    const section = document.querySelector("section")

    if (!section) return

    console.log("section found")

    if (Date.now() > time + coolDown) time = Date.now()
    else return

    console.log("cooldown ok")

    const height = section.clientHeight
    const currentScroll =
      document.body.scrollTop - (document.body.scrollTop % height)

    if ((event.wheelDeltaY ?? event.deltaY) < 0) {
      // next
      document.body.scroll(
        0,
        Math.min(currentScroll + height, document.body.scrollHeight - height)
      )
    } else {
      // prev
      document.body.scroll(0, Math.max(currentScroll - height, 0))
    }
  }

  return (
    <>
      <Head site={site} />
      <body onWheel={handleWheel}>
        <ColorBar />
        {children}
        <ColorBar bottom />
      </body>
    </>
  )
}
