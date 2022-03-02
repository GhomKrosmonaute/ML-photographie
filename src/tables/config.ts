import { Table } from "@ghom/orm"

export interface ConfigEntries {
  url: string
  name: string
  description: string
}

export interface ConfigImage {
  primary: string
  secondary: string
  tertiary: string
  photographer: string
}

export interface ConfigTheme {
  h1_font_family: string
  h2_font_family: string
  p_font_family: string
}

export interface ConfigEntry {
  name: keyof (ConfigEntries & ConfigImage & ConfigTheme)
  value: string
}

export default new Table<ConfigEntry>({
  name: "config",
  setup: (table) => {
    table.string("name").notNullable()
    table.string("value").notNullable()
  },
  async then(table) {
    if (await table.isEmpty()) {
      await table.query.insert([
        { name: "url", value: "http://localhost:6632" },
        { name: "name", value: "Martial Lambert Photographie" },
        {
          name: "description",
          value:
            `Bonjour, accompagnateur montagne pyrénéen et photographe voyageur, je vous propose à travers ce site,
de partir à l'aventure en image et à la découverte de mon travail photographique, avec j'espère, plaisir et intérêt
Merci et..... A bientôt peut être !`.replace(/\n+/g, "<br>"),
        },
        {
          name: "photographer",
          value: "/public/images/defaults/photographer.jpg",
        },
        {
          name: "primary",
          value: "/public/images/defaults/primary.jpg",
        },
        {
          name: "secondary",
          value: "/public/images/defaults/secondary.jpg",
        },
        {
          name: "tertiary",
          value: "/public/images/defaults/tertiary.jpg",
        },
        {
          name: "h1_font_family",
          value: "Gwendolyn, cursive",
        },
        {
          name: "h2_font_family",
          value: "Comfortaa, sans-serif",
        },
        {
          name: "p_font_family",
          value: "Comfortaa, sans-serif",
        },
      ])
    }
  },
})
