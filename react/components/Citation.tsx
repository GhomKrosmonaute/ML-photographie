import React from "react"

export default function Citation({
  content,
  children,
}: {
  content: string
  children: any
}) {
  return (
    <div>
      {children}
      <p className="citation" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
