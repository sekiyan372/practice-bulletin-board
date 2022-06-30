import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import { Album } from '~/types'

export const albumConverter = (): FirestoreDataConverter<Album> => ({
  toFirestore(value: WithFieldValue<Album>) {
    return {
      imageUrl: value.imageUrl,
      name: value.name,
      comment: value.comment,
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>) {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      imageUrl: data.imageUrl,
      name: data.name,
      comment: data.comment,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})
