import "dotenv/config"
import ejs from "ejs"
import cors from "cors"
import path from "path"
import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"

import * as database from "./app/database"

declare module "express-session" {
  interface SessionData {
    admin: boolean
  }
}

interface ConfigEntry {
  name: string
  value: string
}

export const app = express()
  .set("views", path.join(__dirname, "..", "views"))
  .set("view engine", "ejs")
  .use(
    cors(),
    cookieParser(),
    session({ secret: process.env.ML_SESSION_SECRET as string })
  )
  .use("/public", express.static(path.join(__dirname, "..", "public")))
  .get("/logout", (req, res) => {
    req.session.admin = false

    res.redirect("/")
  })
  .get("/login", (req, res) => {
    if (req.session.admin) res.redirect("/admin")
    else res.render("pages/login")
  })
  .post("/login", (req, res) => {
    if (
      !req.body.username ||
      !req.body.password ||
      req.body.username !== process.env.ML_ADMIN_USERNAME ||
      req.body.password !== process.env.ML_ADMIN_PASSWORD
    )
      return res.status(401).send("Mauvais username ou password.")

    req.session.admin = true

    res.sendStatus(200)
  })
  .get("/admin", (req, res) => {
    if (!req.session.admin)
      return res
        .status(401)
        .send("VOus devez être connecté en tant qu'administrateur.")

    res.render("pages/admin")
  })
  .get("/", (req, res) => {
    res.render("pages/home", { admin: req.session.admin })
  })

app.listen(Number(process.env.ML_PORT ?? 3000))

app.locals.site = {
  url: process.env.ML_SITE_URL,
}
;(async function setup() {
  try {
    await database.db.schema.createTable("site", (table) => {
      table.string("name").notNullable()
      table.string("value").notNullable()
    })

    await database.db<ConfigEntry>("site").insert([
      { name: "name", value: "Martial Lambert Photographie" },
      { name: "description", value: "Photographe" },
    ])
  } catch (error) {}

  const config = await database.db<ConfigEntry>("site").select()

  for (const entry of config) app.locals.site[entry.name] = entry.value

  console.log(app.locals.site)
})()
