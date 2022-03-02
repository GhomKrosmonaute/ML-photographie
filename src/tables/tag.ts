import { Table } from "@ghom/orm"

export interface Tag {
  id: number
  name: string
}

export default new Table<Tag>({
  name: "tag",
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").unique().notNullable()
  },
})
