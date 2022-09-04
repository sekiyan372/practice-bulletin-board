import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { Album } from '~/types/albumTypes'

export const albumConverter = (): FirestoreDataConverter<Album> => ({
  toFirestore(value: WithFieldValue<Album>): DocumentData {
    return {
      ja: value.ja,
      en: value.en,
      startAt: value.startAt,
      endAt: value.endAt,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Album {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      ja: data.ja,
      en: data.en,
      startAt: data.startAt.toDate(),
      endAt: data.endAt.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})
