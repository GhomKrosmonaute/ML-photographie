import orm from "../app/orm"
import { Table } from "@ghom/orm"
import photo, { Photo } from "./photo"

export function fetchCategoryNames(): Promise<
  {
    parentName: string
    name: string
    id: number
  }[]
> {
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

export async function fullCategories() {
  //: Promise<FullCategory<FullCategory<Photo>>[]>
  const headers = await category.query.whereNull("categoryId")
  const fullHeaders = []

  for (const header of headers) {
    const subs = await category.query.where({ categoryId: header.id })
    const fullSubs = []

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
  id: number
  name: string
  categoryId: number | null
}

const category = new Table<Category>({
  name: "category",
  priority: 3,
  setup: (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table
      .integer("categoryId")
      .references("id")
      .inTable("category")
      .onDelete("cascade")
  },
  async then(table) {
    if (await table.isEmpty()) {
      const [id] = await table.query.insert({ name: "Privé" })
      await table.query.insert({ name: "Sans catégorie", categoryId: id })
    }
  },
})

export default category
