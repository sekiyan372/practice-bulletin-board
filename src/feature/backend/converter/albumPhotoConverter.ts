import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import type { AlbumPhoto, AlbumStatus } from '~/types/albumTypes'
import { albumStatus, albumStatusArray } from '~/types/albumTypes'

export const albumPhotoConverter = (): FirestoreDataConverter<AlbumPhoto> => ({
  toFirestore(value: WithFieldValue<AlbumPhoto>): DocumentData {
    return {
      imagePath: value.imagePath,
      imageUrl: value.imageUrl,
      comment: value.comment,
      name: value.name,
      status: albumStatusArray.indexOf(albumStatus.PRIVATE),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): AlbumPhoto {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      imagePath: data.imagePath,
      imageUrl: data.imageUrl,
      comment: data.comment,
      name: data.name,
      status: iToAlbumStatus(data.status),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})

const iToAlbumStatus = (i: number): AlbumStatus => {
  switch (i) {
    case albumStatusArray.indexOf(albumStatus.PUBLIC):
      return albumStatus.PUBLIC
    case albumStatusArray.indexOf(albumStatus.BLOCK):
      return albumStatus.BLOCK
    default:
      return albumStatus.PRIVATE
  }
}
