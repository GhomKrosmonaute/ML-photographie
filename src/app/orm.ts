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
    logger: {
      log: (message) => {
        console.log(message)
      },
      error: (message) => {
        console.error(message)
      },
    },
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

orm.load().then(() => console.log("Loaded tables"))

export default orm
