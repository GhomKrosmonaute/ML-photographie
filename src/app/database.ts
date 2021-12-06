import knex from "knex"
import path from "path"
import fs from "fs"

interface ConfigEntry {
  name: string
  value: string
}

interface Image {
  sellable: boolean
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

;(async function setup() {
  try {
    await db.schema.createTable("site", (table) => {
      table.string("name").notNullable()
      table.string("value").notNullable()
    })

    await site().insert([
      { name: "name", value: "Martial Lambert Photographie" },
      { name: "description", value: "Photographe" },
      { name: "banner", value: "/public/images/banner.jpg" },
    ])
  } catch (error) {}

  try {
    await db.schema.createTable("image", (table) => {
      table.string("name").notNullable()
      table.string("category").notNullable()
      table.boolean("public").defaultTo(false)
    })
  } catch (error) {}
})()
