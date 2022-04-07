import * as express from "express"
import photoTable, { Photo } from "../tables/photo"

export async function fetchPhoto(
  req: express.Request,
  res: express.Response
): Promise<null | Photo> {
  const photo = await photoTable.query
    .select()
    .where({ id: Number(req.params.id) })
    .first()

  if (!photo) {
    res.status(404).render("Error", {
      code: 404,
      message: "Cette photo n'existe pas.",
    })

    return null
  }

  return photo
}

export const adminOnly: express.RequestHandler = (req, res, next) => {
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
