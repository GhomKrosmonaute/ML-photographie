exports.up = async function (knex) {}

exports.down = async function (knex) {
  await knex.schema.dropTable("photo_format")
  await knex.schema.dropTable("photo_support")
  await knex.schema.dropTable("format")
  await knex.schema.dropTable("support")
  await knex.schema.dropTable("site")
  await knex.schema.dropTable("photo")
  await knex.schema.dropTable("category")
}
