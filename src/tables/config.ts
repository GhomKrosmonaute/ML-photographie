import { Table } from "@ghom/orm"

declare interface ConfigEntries {
  url: string
  name: string
  description: string
}

declare interface ConfigImage {
  primary: string
  secondary: string
  tertiary: string
  photographer: string
}

declare interface ConfigEntry {
  name: keyof (ConfigEntries & ConfigImage)
  value: string
}

export default new Table<ConfigEntry>({
  name: "config",
  setup: (table) => {
    table.string("name").notNullable()
    table.string("value").notNullable()
  },
})
