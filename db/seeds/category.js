exports.seed = async function (knex) {
  await knex("category").del()
  const [id] = await knex("category").insert({ name: "Privé" })
  await knex("category").insert({ name: "Sans catégorie", categoryId: id })
}
