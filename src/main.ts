import "dotenv/config"

import fs from "fs"
import ejs from "ejs"
import cors from "cors"
import path from "path"
import express from "express"
import session from "express-session"
import bodyParser from "body-parser"
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

// inject variables to CSS
{
  const injection = fs.readFileSync(
    path.join(__dirname, "..", "templates", "injection.css"),
    "utf-8"
  )
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "css", "injection.css"),
    injection.replace(
      "/* VARIABLES */",
      Object.entries(process.env)
        .filter(([name]) => name.startsWith("ML_CSS_"))
        .map(([name, value]) => {
          return `  ${name.replace("ML_CSS_", "--")}: ${value};`
        })
        .join("\n")
    ),
    "utf-8"
  )
}

export const app = express()
  .set("views", path.join(__dirname, "..", "views"))
  .set("view engine", "ejs")
  .use(
    cors(),
    bodyParser(),
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

    res.render("pages/home", { admin: true })
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
      { name: "banner", value: "/public/images/banner.jpg" },
    ])
  } catch (error) {}

  const config = await database.db<ConfigEntry>("site").select()

  for (const entry of config) app.locals.site[entry.name] = entry.value

  console.log(app.locals.site)
})()
