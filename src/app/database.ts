import knex from "knex"
import path from "path"

export const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, "..", "..", "data", "data.sql"),
  },
})
