export type Contest = {
  id: string
  comment: string
  image: string
  mail: string
  name: string
}

export type Album = {
  id: string
  imageUrl: string
  name: string
  comment: string
  status: 'public' | 'private' | 'block'
  createdAt: Date
  updatedAt: Date
}

export type FocusAlbum = {
  album: Album
  getAlbum: () => Promise<void>
  updateAlbum: (
    id: string,
    status: 'public' | 'private' | 'block'
  ) => Promise<void>
}
