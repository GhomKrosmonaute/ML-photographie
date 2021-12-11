import React from "react"

export default function ColorBar({ bottom }) {
  return (
    <div className={"color-bar " + (bottom ? "bottom" : "")}>
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
