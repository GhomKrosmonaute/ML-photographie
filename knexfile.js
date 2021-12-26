const path = require("path")
const fs = require("fs")

const dataPath = path.join(__dirname, "data")
const dbPath = path.join(__dirname, "db")

if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath)

module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: path.join(dbPath, "migrations"),
  },
  seeds: {
    directory: path.join(dbPath, "seeds"),
  },
  connection: {
    filename: path.join(dataPath, "data.sql"),
  },
}
