import "dotenv/config"

import cors from "cors"
import path from "path"
import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"

import router from "./app/router"
import * as database from "./app/database"

declare module "express-session" {
  interface SessionData {
    admin: boolean
  }
}

const jsx = require("express-react-views")
const reload = require("reload")

const app = express()

reload(app)

app
  .set("views", path.join(__dirname, "..", "views"))
  .set("view engine", "jsx")
  .engine(
    "jsx",
    jsx.createEngine({
      transformViews: false,
    })
  )
  .use(
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
    session({
      secret: process.env.ML_SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  )
  .use("/public", express.static(path.join(__dirname, "..", "public")))
  .use(router)
  .listen(Number(process.env.ML_PORT ?? 3000))

app.locals.site = {
  url: process.env.ML_SITE_URL,
  backgrounds: {},
}

database
  .site()
  .select()
  .then((config) => {
    for (const entry of config) {
      if (!entry.name.startsWith("background."))
        app.locals.site[entry.name] = entry.value
      else app.locals.site.backgrounds[entry.name.split(".")[1]] = entry.value
    }

    //console.log(app.locals.site)
    console.log("Deployed to", app.locals.site.url)
  })
