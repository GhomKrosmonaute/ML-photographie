import knex from "knex"
import path from "path"

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "data.sql"),
  },
})
