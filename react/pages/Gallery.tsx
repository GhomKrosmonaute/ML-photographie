import React from "react"

import Tabs from "../components/Tabs"
import Page from "../components/Page"
import Section from "../components/Section"
import Wrapper from "../components/Wrapper"

export default function Gallery({
  site,
  admin,
  categories,
}: Pick<Options, "site" | "admin" | "categories">) {
  return (
    <Page
      site={site}
      title="Gallerie"
      nav={[<a href="/"> Accueil </a>]}
      scroll={true}
    >
      {categories.map((category, i, base) => {
        return (
          <Section
            key={i}
            site={site}
            id={category.name}
            backgroundName={i === 0 ? "primary" : "secondary"}
            prev={base[i - 1] ? `/gallery#${base[i - 1].name}` : undefined}
            next={base[i + 1] ? `/gallery#${base[i + 1].name}` : undefined}
          >
            <Tabs
              key={i}
              tabs={category.subs.map((subCategory, i) => {
                return [
                  subCategory.name,
                  <Wrapper admin={admin} key={i} photos={subCategory.subs} />,
                ]
              })}
            />
          </Section>
        )
      })}
    </Page>
  )
}
