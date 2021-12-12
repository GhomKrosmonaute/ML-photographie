import * as express from "express"
import * as database from "./database"

const router = express.Router()
const photo = express.Router()

const adminOnly: express.RequestHandler = (req, res, next) => {
  if (!req.session.admin)
    return res
      .status(401)
      .render("pages/Error", { code: 401, message: "Vous devez être connecté en tant qu'administrateur." })

  next()
}

router.get("/logout", (req, res) => {
  req.session.admin = false

  res.redirect("/")
})

router
  .route("/login")
  .get((req, res) => {
    if (req.session.admin) res.redirect("/admin")
    else res.render("pages/Login")
  })
  .post((req, res) => {
    if (
      !req.body.username ||
      !req.body.password ||
      req.body.username !== process.env.ML_ADMIN_USERNAME ||
      req.body.password !== process.env.ML_ADMIN_PASSWORD
    )
      return res
        .status(401)
        .render("pages/Login", { error: "Mauvais username ou password." })

    req.session.admin = true

    res.redirect("/")
  })

router.get("/admin", adminOnly, (req, res) => {
  res.render("pages/Admin")
})

router.get("/", async (req, res) => {
  res.render("pages/Home", {
    admin: req.session.admin,
    images: await database.image().select(),
  })
})

router.use("/photo", photo)

photo
  .route("/add")
  .all(adminOnly)
  .get(async (req, res) => {
    res.render("pages/")
  })
  .post(async () => {})

router.use((req, res, next) => {
  res.status(404).render("pages/Error", { code: 404, message: "Cette page est inexistante !" })
})

export default router
