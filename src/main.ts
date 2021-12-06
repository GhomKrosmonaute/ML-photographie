import "dotenv/config"

import ejs from "ejs"
import cors from "cors"
import path from "path"
import express from "express"
import session from "express-session"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import router from "./app/router"
import * as database from "./app/database"

declare module "express-session" {
  interface SessionData {
    admin: boolean
  }
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
  .use(router)

app.listen(Number(process.env.ML_PORT ?? 3000))

app.locals.site = {
  url: process.env.ML_SITE_URL,
}

database.setup().then(() => {
  database
    .site()
    .select()
    .then((config) => {
      for (const entry of config) app.locals.site[entry.name] = entry.value

      console.log(app.locals.site)
    })
})
