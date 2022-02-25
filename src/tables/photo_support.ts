import { Table } from "@ghom/orm"

export default new Table<{
  photoId: number
  supportId: number
}>({
  name: "photo_support",
  setup: (table) => {
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
  },
})
