export type Album = {
  id: string
  ja: {
    name: string
    imagePath: string
    imageUrl: string
  }
  en: {
    name: string
    imagePath: string
    imageUrl: string
  }
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
}

export const albumStatus = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  BLOCK: 'block',
} as const
export type AlbumStatus = typeof albumStatus[keyof typeof albumStatus]
export const albumStatusArray = Object.values(albumStatus)

export type AlbumPhoto = {
  id: string
  imagePath: string
  imageUrl: string
  comment: string
  name: string
  status: AlbumStatus
  createdAt: Date
  updatedAt: Date
}
