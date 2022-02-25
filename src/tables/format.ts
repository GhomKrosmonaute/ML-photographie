import { Table } from "@ghom/orm"

declare interface Format {
  id: number
  name: string
}

export default new Table<Format>({
  name: "format",
  priority: 1,
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
  },
})
