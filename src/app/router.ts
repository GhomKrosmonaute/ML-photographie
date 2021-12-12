import path from "path"

import * as express from "express"
import * as database from "./database"

import fileUpload from "express-fileupload"

const router = express.Router()
const photo = express.Router()

const adminOnly: express.RequestHandler = (req, res, next) => {
  if (process.env.ML_DEV) {
    req.session.admin = true
    next()
    return
  }

  if (!req.session.admin)
    return res.status(401).render("pages/Error", {
      code: 401,
      message: "Vous devez être connecté en tant qu'administrateur.",
    })

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
    const categories = await database.category().select()

    res.render("pages/PhotoAdd", { categories })
  })
  .post(fileUpload({}), async (req, res) => {
    const photo = req.files?.photo
    const name = req.body.name
    const categoryId = Number(req.body.categoryId)
    const _public = req.body.public

    const categories = await database.category().select()

    if (!name)
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "Vous devez donner un nom à la photo importée.",
      })

    if (!categoryId)
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "Vous devez assigner une catégorie à la photo importée.",
      })

    if (!photo)
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "Vous devez cibler une photo a importer.",
      })

    if (Array.isArray(photo))
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "Vous ne pouvez cibler qu'une seule photo a importer.",
      })

    if (!photo.mimetype.includes("image"))
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "Le fichier importé doit être une photo valide.",
      })

    if (!categories.some((c) => c.id === categoryId))
      return res.status(422).render("pages/PhotoAdd", {
        categories,
        error: "La catégorie choisie pour la photo importée doit exister !",
      })

    const id = await database.image().insert({
      name,
      categoryId,
      public: !!_public,
    })

    photo.mv(
      path.join(process.cwd(), "public", "images", "photos", id + ".jpg"),
      async (error) => {
        if (error)
          return res.status(500).render("pages/PhotoAdd", {
            categories,
            error: "Une erreur est survennue lors de l'import de votre photo..",
          })

        res.redirect("/photo/view/" + id)
      }
    )
  })

photo.get("/view/:id", async (req, res) => {
  const image = await database
    .image()
    .select()
    .where({ id: Number(req.params.id) })
    .first()

  if (!image)
    return res.status(404).render("pages/Error", {
      code: 404,
      message: "Cette photo n'existe pas.",
    })

  res.render("pages/PhotoView", { admin: req.session.admin, image })
})

router.use((req, res, next) => {
  res.status(404).render("pages/Error", {
    code: 404,
    message: "Cette page est inexistante !",
  })
})

export default router
