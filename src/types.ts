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
  date: Date
  createdAt: Date
  updatedAt: Date
}

export type Contest = {
  id: string
  comment: string
  image: string
  mail: string
  name: string
}

export enum AlbumStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
  BLOCK = 'block',
}

export type Album = {
  id: string
  imagePath: string
  imageUrl: string
  name: string
  comment: string
  status: AlbumStatus
  createdAt: Date
  updatedAt: Date
}

export type FocusAlbum = {
  album: Album
  getAlbum: () => Promise<void>
  updateAlbum: (id: string, status: AlbumStatus) => Promise<void>
  deleteAlbum: (id: string, imagePath: string) => Promise<void>
}
