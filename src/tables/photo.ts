import { Table } from "@ghom/orm"

export interface Photo {
  id: number
  name: string
  public: boolean
  categoryId: number
  highlighted: boolean
}

export default new Table<Photo>({
  name: "photo",
  priority: 2,
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .onUpdate("cascade")
    table.boolean("public").defaultTo(false)
    table.boolean("highlighted").defaultTo(false)
  },
})
