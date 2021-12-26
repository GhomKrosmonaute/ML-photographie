import React from "react"

export default function Citation({ content }: { content: string }) {
  return (
    <p className="citation" dangerouslySetInnerHTML={{ __html: content }} />
  )
}
