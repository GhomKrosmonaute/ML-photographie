import path from "path"
import fs from "fs"
import { ORM } from "@ghom/orm"

const dataDirectory = path.join(process.cwd(), "data")

if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory)

/**
 * Welcome to the database file!
 * You can get the docs of **knex** [here](http://knexjs.org/)
 */
const orm = new ORM(
  {
    tablePath: path.join(process.cwd(), "dist", "tables"),
  },
  {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.join(dataDirectory, "sqlite3.db"),
    },
  }
)

orm.on("load", (filepath) =>
  console.log("Loaded table " + path.relative(process.cwd(), filepath))
)

orm.init().catch()

export default orm
