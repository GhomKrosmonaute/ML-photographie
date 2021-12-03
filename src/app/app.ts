import "dotenv/config"
import express from "express"
import * as database from "./database"

export const app = express()
  .use((req, res, next) => {
    next()
  })
  .get("/", (req, res) => {
    res.json({ bite: 42 })
  })
  .listen(Number(process.env.ML_PORT ?? 3000))
