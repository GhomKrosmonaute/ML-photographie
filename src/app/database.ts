import knex from "knex"
import path from "path"
import fs from "fs"

interface ConfigEntry {
  name: string
  value: string
}

interface Image {
  id: string
  name: string
  public: boolean
}

const dbPath = path.join(__dirname, "..", "..", "data")

if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath)

export const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(dbPath, "data.sql"),
  },
})

export function image() {
  return db<Image>("image")
}

export function site() {
  return db<ConfigEntry>("site")
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
        value: `Bonjour, accompagnateur montagne pyrénéen et photographe voyageur, je vous propose à travers ce site,
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
    await db.schema.createTable("image", (table) => {
      table.increments("id").primary()
      table.string("name").notNullable()
      table.string("category").notNullable()
      table.boolean("public").defaultTo(false)
    })
  } catch (error) {}
}
