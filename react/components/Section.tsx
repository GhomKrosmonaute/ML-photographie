import React from "react"

import Gradient from "./Gradient"
import Background from "./Background"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Section({
  id,
  backgroundName,
  site,
  next,
  prev,
  children,
}: Pick<Options, "site" | "children"> & {
  id?: string
  backgroundName: keyof Site["backgrounds"]
  next?: string
  prev?: string
}) {
  return (
    <section id={id}>
      <Background name={backgroundName} site={site} />
      <Gradient />
      {children}
      {prev && (
        <a className="prev" href={prev}>
          <FontAwesomeIcon icon={["fas", "sort-up"]} />
          {/*<i className="fas fa-sort-up" />*/}
        </a>
      )}
      {next && (
        <a className="next" href={next}>
          <FontAwesomeIcon icon={["fas", "sort-down"]} />
          {/*<i className="fas fa-sort-down" />*/}
        </a>
      )}
    </section>
  )
}
