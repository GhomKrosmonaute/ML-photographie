import React from "react"

export default function Nav({ children }: Pick<Options, "children">) {
  return (
    <nav>
      <ul>
        {(Array.isArray(children) ? children : [children])
          .filter((child) => !!child)
          .map((child, i) => (
            <li key={i}>{child}</li>
          ))}
      </ul>
    </nav>
  )
}
