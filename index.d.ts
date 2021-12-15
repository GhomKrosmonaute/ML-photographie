declare interface ConfigEntry {
  name: string
  value: string
}

declare interface Photography {
  id: number
  name: string
  public: boolean
  categoryId: number
}

declare interface FullPhotography {
  id: number
  name: string
  public: boolean
}

declare interface Category {
  id: number
  name: string
  categoryId: number | null
}

declare interface FullCategory<
  Subs extends FullCategory<Photography> | Photography
> {
  id: number
  name: string
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
  categoryNames: Pick<Category, "id" | "name">[]
}
