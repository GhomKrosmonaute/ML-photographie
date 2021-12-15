import React from "react"

export default function Background({
  name,
  site,
}: Pick<Options, "site"> & {
  name: keyof Site["backgrounds"]
}) {
  return (
    <img
      className="background"
      src={site.backgrounds[name] ?? `/public/images/defaults/${name}.jpg`}
      alt={`website ${name} background`}
    />
  )
}
