import knex from "knex"

export const db = knex(require("../../knexfile"))

export function table<TableName extends keyof TableNames>(
  tableName: TableName
) {
  return db<TableNames[TableName]>(tableName)
}

export function categoryNames(): Promise<CategoryName[]> {
  return db.raw(`
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
  const headers = await table("category").whereNull("categoryId")
  const fullHeaders: FullCategory<FullCategory<Photography>>[] = []

  for (const header of headers) {
    const subs = await table("category").where({ categoryId: header.id })
    const fullSubs: FullCategory<Photography>[] = []

    for (const sub of subs) {
      fullSubs.push({
        name: sub.name,
        id: sub.id,
        subs: await table("photo").where({ categoryId: sub.id }),
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
