import path from "path"
import * as utils from "./utils"
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
    return res.status(401).render("Error", {
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

router.get("/admin", adminOnly, (req, res) => {
  res.render("Admin")
})

router.get("/", async (req, res) => {
  res.render("Home", {
    admin: req.session.admin,
    photos: await database
      .table("photo")
      .select()
      .where({ highlighted: true })
      .limit(10),
  })
})

router.get("/gallery", async (req, res) => {
  const categories = await database.fullCategories()

  res.render("Gallery", {
    admin: !!req.session.admin,
    categories,
  })
})

router.use("/photo", photo)

photo
  .route("/add")
  .all(adminOnly)
  .get(async (req, res) => {
    const categoryNames = await database.categoryNames()

    res.render("PhotoAdd", { categoryNames })
  })
  .post(fileUpload({}), async (req, res) => {
    const photo = req.files?.photo
    const name = req.body.name
    const categoryId = Number(req.body.categoryId)
    const _public = req.body.public

    const categories = await database
      .table("category")
      .whereNotNull("categoryId")

    if (!name)
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "Vous devez donner un nom à la photo importée.",
      })

    if (!categoryId)
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "Vous devez assigner une catégorie à la photo importée.",
      })

    if (!photo)
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "Vous devez cibler une photo a importer.",
      })

    if (Array.isArray(photo))
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "Vous ne pouvez cibler qu'une seule photo a importer.",
      })

    if (!photo.mimetype.includes("image"))
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "Le fichier importé doit être une photo valide.",
      })

    const category = categories.find((c) => c.id === categoryId)

    if (!category)
      return res.status(422).render("PhotoAdd", {
        categories,
        error: "La catégorie choisie pour la photo importée doit exister !",
      })

    const id = await database.table("photo").insert({
      name,
      categoryId,
      public: !!_public,
    })

    photo.mv(
      path.join(process.cwd(), "public", "images", "photos", id + ".jpg"),
      async (error) => {
        if (error)
          return res.status(500).render("PhotoAdd", {
            categoryNames: await database.categoryNames(),
            error: "Une erreur est survennue lors de l'import de votre photo..",
          })

        res.redirect("/photo/view/" + id)
      }
    )
  })

photo.get("/view/:id", async (req, res) => {
  const photo = await utils.fetchPhoto(req, res)

  if (!photo) return

  res.render("PhotoView", { admin: req.session.admin, photo })
})

photo.get("/order/:id", async (req, res) => {
  const photo = await utils.fetchPhoto(req, res)

  if (!photo) return

  res.render("PhotoOrder", { admin: req.session.admin, photo })
})

router.use((req, res, next) => {
  res.status(404).render("Error", {
    code: 404,
    message: "Cette page est inexistante !",
  })
})

export default router
