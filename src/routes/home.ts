import * as express from "express"
import photoTable, { Photo } from "../tables/photo"

const router = express.Router()

router.get("/", async (req, res) => {
  res.render("Home", {
    admin: req.session.admin,
    photos: await photoTable.query
      .select()
      .where({ highlighted: true })
      .limit(10),
  })
})

export default router
