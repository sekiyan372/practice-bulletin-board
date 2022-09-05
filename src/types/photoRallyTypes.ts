export type PhotoRally = {
  id: string
  ja: {
    name: string
    description: string
    imagePath: string
    imageUrl: string
  }
  en: {
    name: string
    description: string
    imagePath: string
    imageUrl: string
  }
  spotIds: string[]
  date: Date
  createdAt: Date
  updatedAt: Date
}

export type Spot = {
  id: string
  image: {
    imagePath: string
    imageUrl: string
  }
  ja: {
    name: string
    description: string
  }
  en: {
    name: string
    description: string
  }
}
