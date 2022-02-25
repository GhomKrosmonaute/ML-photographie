import { Table } from "@ghom/orm"

export interface Tag {
  photoId: number
  tagId: number
}

export default new Table<Tag>({
  name: "photo_tag",
  setup: (table) => {
    table
      .integer("photoId")
      .references("id")
      .inTable("photo")
      .onUpdate("cascade")
    table.integer("tagId").references("id").inTable("tag").onUpdate("cascade")
  },
})
