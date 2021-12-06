import * as express from "express"
import * as database from "./database"

const router = express.Router()

router.get("/logout", (req, res) => {
  req.session.admin = false

  res.redirect("/")
})

router
  .route("/login")
  .get((req, res) => {
    if (req.session.admin) res.redirect("/admin")
    else res.render("pages/login")
  })
  .post((req, res) => {
    if (
      !req.body.username ||
      !req.body.password ||
      req.body.username !== process.env.ML_ADMIN_USERNAME ||
      req.body.password !== process.env.ML_ADMIN_PASSWORD
    )
      return res.status(401).send("Mauvais username ou password.")

    req.session.admin = true

    res.redirect("/")
  })

router.get("/admin", (req, res) => {
  if (!req.session.admin)
    return res
      .status(401)
      .send("VOus devez être connecté en tant qu'administrateur.")

  res.render("pages/admin")
})

router.get("/", async (req, res) => {
  res.render("pages/home", {
    admin: req.session.admin,
    images: await database.image().select(),
  })
})

export default router
