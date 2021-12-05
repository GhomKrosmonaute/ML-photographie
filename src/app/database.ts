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
