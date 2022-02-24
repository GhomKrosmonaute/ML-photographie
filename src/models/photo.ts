await knex.schema.createTable("photo", (table) => {
  table.increments("id").primary()
  table.string("name").notNullable()
  table
    .integer("categoryId")
    .references("id")
    .inTable("category")
    .onUpdate("cascade")
  table.boolean("public").defaultTo(false)
  table.boolean("highlighted").defaultTo(false)
})
