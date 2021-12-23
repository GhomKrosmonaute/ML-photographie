exports.up = async function (knex) {
  await knex.schema.createTable("site", (table) => {
    table.string("name").notNullable()
    table.string("value").notNullable()
  })

  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .onDelete("cascade")
  })

  await knex.schema.createTable("photo", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .onUpdate("cascade")
    table.boolean("public").defaultTo(false)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable("site")
  await knex.schema.dropTable("photo")
  await knex.schema.dropTable("category")
}
