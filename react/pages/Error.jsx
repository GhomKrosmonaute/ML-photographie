import React from "react"

import Section from "../components/Section";
import ErrorPage from "../components/ErrorPage";

export default function Error({ site, code, message }) {
  return <ErrorPage site={site} code={code} message={message}/>
}
