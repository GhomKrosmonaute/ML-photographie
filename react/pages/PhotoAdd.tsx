import React from "react"

import Page from "../components/Page"
import Section from "../components/Section"
import Nav from "../components/Nav"

export default function PhotoAdd({
  site,
  error,
  categoryNames,
}: Pick<Options, "site" | "error" | "categoryNames">) {
  return (
    <Page
      site={site}
      title="Importer une photo"
      nav={[
        <a href="/"> Accueil </a>,
        <a href="/#gallery"> Gallerie </a>,
        <a href="/admin"> Administration </a>,
        <a href="/logout"> Se déconnecter </a>,
      ]}
    >
      <Section site={site} backgroundName="primary">
        <h1> Importer une photo </h1>

        <form
          action="/photo/add"
          method="post"
          encType="multipart/form-data"
          style={{ width: "40vw" }}
        >
          <input type="file" name="photo" required />
          <label>
            <input type="checkbox" name="public" /> Rendre la photo publique.
          </label>
          <input type="text" name="name" required />
          <select name="categoryId" required>
            {categoryNames.map((category, i) => (
              <option key={i} value={category.id}>
                {category.parentName} / {category.name}
              </option>
            ))}
          </select>
          <input type="submit" value="Envoyer" accept="image/png, image/jpeg" />
          {error && <span className="error"> {error} </span>}
        </form>
      </Section>
    </Page>
  )
}
