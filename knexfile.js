const path = require("path")
const fs = require("fs")

const dbPath = path.join(__dirname, "data")

if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath)

module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "seeds"),
  },
  connection: {
    filename: path.join(dbPath, "data.sql"),
  },
}
