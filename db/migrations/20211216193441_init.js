exports.up = async function (knex) {
  await knex.schema.createTable("site", (table) => {
    table.string("name").notNullable()
    table.string("value").notNullable()
  })

  await knex.schema.createTable("format", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
  })

  await knex.schema.createTable("support", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("description").notNullable()
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

  await knex.schema.createTable("photo_format", (table) => {
    table
      .integer("photoId")
      .references("id")
      .inTable("photo")
      .onUpdate("cascade")
    table
      .integer("formatId")
      .references("id")
      .inTable("format")
      .onUpdate("cascade")
  })

  await knex.schema.createTable("photo_support", (table) => {
    table
      .integer("photoId")
      .references("id")
      .inTable("photo")
      .onUpdate("cascade")
    table
      .integer("supportId")
      .references("id")
      .inTable("support")
      .onUpdate("cascade")
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable("photo_format")
  await knex.schema.dropTable("photo_support")
  await knex.schema.dropTable("format")
  await knex.schema.dropTable("support")
  await knex.schema.dropTable("site")
  await knex.schema.dropTable("photo")
  await knex.schema.dropTable("category")
}
