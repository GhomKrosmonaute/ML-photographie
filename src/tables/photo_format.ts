import { Table } from "@ghom/orm"

export default new Table<{
  photoId: number
  formatId: number
}>({
  name: "photo_format",
  setup: (table) => {
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
  },
})
