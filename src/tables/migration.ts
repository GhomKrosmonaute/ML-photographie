import { Table } from "../app/table"

export interface MigrationData {
  table: string
  version: number
}

export default new Table<MigrationData>({
  name: "migration",
  priority: Infinity,
  setup: (table) => {
    table.string("table").unique().notNullable()
    table.integer("version").notNullable()
  },
})
