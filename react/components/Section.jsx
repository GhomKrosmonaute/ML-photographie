import React from "react"

import Gradient from "./Gradient"
import Background from "./Background"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"

export default function Section({
  id,
  backgroundName,
  site,
  next,
  prev,
  children,
}) {
  return (
    <section id={id}>
      <Background name={backgroundName} site={site} />
      <Gradient />
      {children}
      {prev && (
        <a className="prev" href={prev}>
          <FontAwesomeIcon icon={faSortUp} />
          {/*<i className="fas fa-sort-up" />*/}
        </a>
      )}
      {next && (
        <a className="next" href={next}>
          <FontAwesomeIcon icon={faSortDown} />
          {/*<i className="fas fa-sort-down" />*/}
        </a>
      )}
    </section>
  )
}
