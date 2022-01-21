import fs from "fs/promises"
import knex from "knex"
import path from "path"

import config from "../knexfile.js"

const db = knex(config)

const photoDirSrcPath = path.join(process.cwd(), "fixtures", "photos")
const photoDirDestPath = path.join(process.cwd(), "public", "images", "photos")

const photoDirSrc = await fs.readdir(photoDirSrcPath)

const category = await db("category")
  .select()
  .whereNotNull("categoryId")
  .first()

await db("photo").insert(
  await Promise.all(
    photoDirSrc.map(async (name, i) => {
      await fs.copyFile(
        path.join(photoDirSrcPath, name),
        path.join(photoDirDestPath, i + 1 + ".jpg")
      )

      return {
        name,
        id: i + 1,
        highlighted: true,
        categoryId: category.id,
        public: false,
      }
    })
  )
)

await db.destroy()

console.log("fixtures done.")

process.exit(0)
