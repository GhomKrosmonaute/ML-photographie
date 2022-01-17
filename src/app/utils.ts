import * as express from "express"
import * as database from "./database"

export async function fetchPhoto(
  req: express.Request,
  res: express.Response
): Promise<null | Photography> {
  const photo = await database
    .table("photo")
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
