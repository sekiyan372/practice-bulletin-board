import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { PhotoRally } from '~/types/photoRallyTypes'

export const photoRallyConverter = (): FirestoreDataConverter<PhotoRally> => ({
  toFirestore(value: WithFieldValue<PhotoRally>): DocumentData {
    return {
      ja: value.ja,
      en: value.en,
      date: value.date,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): PhotoRally {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      ja: data.ja,
      en: data.en,
      date: data.date.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})
