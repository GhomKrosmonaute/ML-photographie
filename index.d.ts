declare interface ConfigEntry {
  name: string
  value: string
}

declare interface Photography {
  id: number
  name: string
  public: boolean
  categoryId: number
  highlighted: boolean
}

declare interface Category {
  id: number
  name: string
  categoryId: number | null
}

declare interface Support {
  id: number
  name: string
  description: string
}

declare interface Format {
  id: number
  name: string
}

declare interface TableNames {
  format: Format
  support: Support
  photo: Photography
  category: Category
  site: ConfigEntry
  photo_format: { photoId: number; formatId: number }
  photo_support: { photoId: number; supportId: number }
}

declare interface CategoryName {
  parentName: Category["name"]
  name: Category["name"]
  id: Category["id"]
}

declare interface FullCategory<
  Subs extends FullCategory<Photography> | Photography
> {
  id: Category["id"]
  name: Category["name"]
  subs: Subs[]
}

declare interface Site {
  url: string
  name: string
  description: string
  backgrounds: {
    primary: string
    secondary: string
    tertiary: string
  }
}

declare interface Options {
  site: Site
  admin: boolean
  children?: any
  code: number
  message: string
  title?: string
  scroll?: boolean
  error?: any
  photo: Photography
  photos: Photography[]
  category: FullCategory<FullCategory<Photography>>
  categories: FullCategory<FullCategory<Photography>>[]
  categoryNames: CategoryName[]
}
