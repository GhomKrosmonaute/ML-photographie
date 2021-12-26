import knex from "knex"

export const db = knex(require("../../knexfile"))

export function photo() {
  return db<Photography>("photo")
}

export function site() {
  return db<ConfigEntry>("site")
}

export function category() {
  return db<Category>("category")
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
  const headers = await category().whereNull("categoryId")
  const fullHeaders: FullCategory<FullCategory<Photography>>[] = []

  for (const header of headers) {
    const subs = await category().where({ categoryId: header.id })
    const fullSubs: FullCategory<Photography>[] = []

    for (const sub of subs) {
      fullSubs.push({
        name: sub.name,
        id: sub.id,
        subs: await photo().where({ categoryId: sub.id }),
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
