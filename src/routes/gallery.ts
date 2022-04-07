import * as express from "express"

import { fullCategories } from "../tables/category"

const router = express.Router()

router.get("/gallery", async (req, res) => {
  const categories = await fullCategories()

  res.render("Gallery", {
    admin: !!req.session.admin,
    categories,
  })
})

export default router
