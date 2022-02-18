import React from "react"

export default function Photographer({ site }: Pick<Options, "site">) {
  return (
    <img
      id="photographer"
      src={site.photographer ?? `/public/images/defaults/photographer.jpg`}
      alt="Photographe"
    />
  )
}
