import * as express from "express"

const router = express.Router()

router.get("/logout", (req, res) => {
  req.session.admin = false

  res.redirect("/")
})

router
  .route("/login")
  .get((req, res) => {
    if (req.session.admin) res.redirect("/admin")
    else res.render("Login")
  })
  .post((req, res) => {
    if (
      !req.body.username ||
      !req.body.password ||
      req.body.username !== process.env.ML_ADMIN_USERNAME ||
      req.body.password !== process.env.ML_ADMIN_PASSWORD
    )
      return res.status(401).render("Login", {
        error: "Mauvais nom d'utilisateur ou mot de passe.",
      })

    req.session.admin = true

    res.redirect("/")
  })

export default router
