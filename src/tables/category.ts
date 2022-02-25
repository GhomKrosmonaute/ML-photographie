import { Table } from "@ghom/orm"
import { orm } from "../app/orm"
import photo from "./photo"

export function categoryNames(): Promise<CategoryName[]> {
  return orm.db.raw(`
    select
        "head".name as parentName,
        "sub".name as name,
        "sub".id as id
    from "category" "sub"
    left join "category" "head" on "head".id = "sub".categoryId
    where "sub".categoryId is not null
  `)
}

export async function fullCategories(): Promise<
  FullCategory<FullCategory<Photography>>[]
> {
  const headers = await category.query.whereNull("categoryId")
  const fullHeaders: FullCategory<FullCategory<Photography>>[] = []

  for (const header of headers) {
    const subs = await category.query.where({ categoryId: header.id })
    const fullSubs: FullCategory<Photography>[] = []

    for (const sub of subs) {
      fullSubs.push({
        name: sub.name,
        id: sub.id,
        subs: await photo.query.where({ categoryId: sub.id }),
      })
    }

    fullHeaders.push({
      name: header.name,
      id: header.id,
      subs: fullSubs,
    })
  }

  return fullHeaders
}

export interface Category {
  table: string
  version: number
}

const category = new Table<Category>({
  name: "category",
  priority: Infinity,
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .onDelete("cascade")
  },
})

export default category
