import knex from "knex"
import path from "path"
import fs from "fs"

const dbPath = path.join(__dirname, "..", "..", "data")

if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath)

export const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(dbPath, "data.sql"),
  },
})

export function photo() {
  return db<Photography>("photo")
}

export function site() {
  return db<ConfigEntry>("site")
}

export function category() {
  return db<Category>("category")
}

export async function fullCategories(): Promise<
  FullCategory<FullCategory<Photography>>[]
> {
  const headers = await category().whereNull("categoryId")
  const fullHeaders: FullCategory<FullCategory<Photography>>[] = []

  for (const header of headers) {
    const subs = await category().where({ categoryId: header.id })
    const fullSubs: FullCategory<Photography>[] = []

    for (const sub of subs) {
      fullSubs.push({
        name: sub.name,
        id: sub.id,
        subs: await photo().where({ categoryId: sub.id }),
      })
    }

    fullHeaders.push({
      name: header.name,
      id: header.id,
      subs: fullSubs,
    })
  }

  return fullHeaders
}

export async function setup() {
  try {
    await db.schema.createTable("site", (table) => {
      table.string("name").notNullable()
      table.string("value").notNullable()
    })

    await site().insert([
      { name: "name", value: "Martial Lambert Photographie" },
      {
        name: "description",
        value:
          `Bonjour, accompagnateur montagne pyrénéen et photographe voyageur, je vous propose à travers ce site,
de partir à l'aventure en image et à la découverte de mon travail photographique, avec j'espère, plaisir et intérêt
Merci et..... A bientôt peut être !`.replace(/\n+/g, "<br>"),
      },
      {
        name: "background.primary",
        value: "/public/images/defaults/primary.jpg",
      },
      {
        name: "background.secondary",
        value: "/public/images/defaults/secondary.jpg",
      },
      {
        name: "background.tertiary",
        value: "/public/images/defaults/tertiary.jpg",
      },
    ])
  } catch (error) {}

  try {
    await db.schema.createTable("category", (table) => {
      table.increments("id").primary()
      table.string("name").notNullable()
    })

    await category().insert({ name: "Sans catégorie" })

    await db.schema.createTable("photo", (table) => {
      table.increments("id").primary()
      table.string("name").notNullable()
      table
        .integer("categoryId")
        .references("id")
        .inTable("category")
        .notNullable()
      table.boolean("public").defaultTo(false)
    })
  } catch (error) {}
}
