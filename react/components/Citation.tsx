import React from "react"

export default function Citation({ children }: Pick<Options, "children">) {
  return <p className="citation"> {children} </p>
}
