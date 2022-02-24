await knex.schema.createTable("photo_support", (table) => {
  table.integer("photoId").references("id").inTable("photo").onUpdate("cascade")
  table
    .integer("supportId")
    .references("id")
    .inTable("support")
    .onUpdate("cascade")
})
