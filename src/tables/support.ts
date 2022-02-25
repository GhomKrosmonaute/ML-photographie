import { Table } from "@ghom/orm"

declare interface Support {
  id: number
  name: string
  description: string
}

export default new Table<Support>({
  name: "support",
  priority: 1,
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("description").notNullable()
  },
})
