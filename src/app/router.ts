import path from "path"
import * as handler from "@ghom/handler"
import * as express from "express"

const router = express.Router()

const routeHandler = new handler.Handler(
  path.join(process.cwd(), "dist", "routes")
)

routeHandler.on("finish", async (files) => {
  for (const filepath of files) {
    const extension = require(filepath)
    router.use(extension.default)
  }
})

routeHandler.load().then(() => {
  router.use((req, res, next) => {
    res.status(404).render("Error", {
      code: 404,
      message: "Cette page est inexistante !",
    })
  })

  console.log("Loaded routes")
})

export default router
