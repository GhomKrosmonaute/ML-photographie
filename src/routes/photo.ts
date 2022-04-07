import path from "path"
import fileUpload from "express-fileupload"
import * as express from "express"
import * as utils from "../app/utils"
import photoTable from "../tables/photo"
import categoryTable, { fetchCategoryNames } from "../tables/category"

const photo = express.Router()
const router = express.Router()

router.use("/photo", photo)

photo
  .route("/add")
  .all(utils.adminOnly)
  .get(async (req, res) => {
    const categoryNames = await fetchCategoryNames()

    res.render("PhotoAdd", { categoryNames })
  })
  .post(fileUpload({}), async (req, res) => {
    const photo = req.files?.photo
    const name = req.body.name
    const categoryId = Number(req.body.categoryId)
    const _public = req.body.public

    const categories = await categoryTable.query.whereNotNull("categoryId")

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

    const id = await photoTable.query.insert({
      name,
      categoryId,
      public: !!_public,
    })

    photo.mv(
      path.join(process.cwd(), "public", "images", "photos", id + ".jpg"),
      async (error) => {
        if (error)
          return res.status(500).render("PhotoAdd", {
            categoryNames: await fetchCategoryNames(),
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

export default router
