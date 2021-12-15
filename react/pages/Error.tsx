import React from "react"

import ErrorPage from "../components/ErrorPage"

export default function Error({
  site,
  code,
  message,
}: Pick<Options, "site" | "code" | "message">) {
  return <ErrorPage site={site} code={code} message={message} />
}
