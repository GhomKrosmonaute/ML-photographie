import path from "path"
import { Knex } from "knex"

import * as handler from "./handler.js"
import * as database from "./database.js"

import type { MigrationData } from "../tables/migration.js"

export const tableHandler = new handler.Handler(
  process.env.BOT_TABLES_PATH ?? path.join(process.cwd(), "dist", "tables")
)

tableHandler.once("finish", async (pathList) => {
  const tables = await Promise.all(
    pathList.map(async (filepath) => {
      const file = await import("file://" + filepath)
      if (filepath.endsWith(".native.js")) file.default.options.native = true
      file.default.filepath = filepath
      return file.default
    })
  )

  return Promise.all(
    tables
      .sort((a, b) => {
        return (b.options.priority ?? 0) - (a.options.priority ?? 0)
      })
      .map((table) => table.make())
  )
})

export interface TableOptions<Type> {
  name: string
  priority?: number
  migrations?: { [version: number]: (table: Knex.CreateTableBuilder) => void }
  setup: (table: Knex.CreateTableBuilder) => void
}

export class Table<Type> {
  filepath?: string

  constructor(public readonly options: TableOptions<Type>) {}

  get query() {
    return database.db<Type>(this.options.name)
  }

  async make(): Promise<this> {
    try {
      await database.db.schema.createTable(
        this.options.name,
        this.options.setup
      )
      console.log(`created table ${this.options.name}`)
    } catch (error: any) {
      if (error.toString().includes("syntax error")) {
        console.error(
          `you need to implement the "setup" method in options of your ${this.options.name} table!`
        )

        throw error
      } else {
        console.log(`loaded table ${this.options.name}`)
      }
    }

    try {
      const migrated = await this.migrate()

      if (migrated !== false) {
        console.log(
          `migrated table ${this.options.name} to version ${migrated}`
        )
      }
    } catch (error: any) {
      console.error(error)
    }

    return this
  }

  private async migrate(): Promise<false | number> {
    if (!this.options.migrations) return false

    const migrationCollection = new Map<
      number,
      (table: Knex.CreateTableBuilder) => void
    >(
      Object.entries(this.options.migrations)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map((entry) => [Number(entry[0]), entry[1]])
    )

    const fromDatabase = await database
      .db<MigrationData>("migration")
      .where("table", this.options.name)
      .first()

    const data = fromDatabase || {
      table: this.options.name,
      version: 0,
    }

    const baseVersion = data.version

    await database.db.schema.alterTable(this.options.name, (builder) => {
      migrationCollection.forEach((migration, version) => {
        if (version <= data.version) return
        migration(builder)
        data.version = version
      })
    })

    await database
      .db<MigrationData>("migration")
      .insert(data)
      .onConflict("table")
      .merge()

    return baseVersion === data.version ? false : data.version
  }
}

export const tables = new Map<string, Table<any>>()
