import * as utils from "../app/utils"
import * as express from "express"

const router = express.Router()

router.get("/admin", utils.adminOnly, (req, res) => {
  res.render("Admin")
})

export default router
