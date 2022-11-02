import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { Spot } from '~/types/photoRallyTypes'

export const spotConverter = (): FirestoreDataConverter<Spot> => ({
  toFirestore(value: WithFieldValue<Spot>): DocumentData {
    return {
      image: value.image,
      ja: value.ja,
      en: value.en,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Spot {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      image: data.image,
      ja: data.ja,
      en: data.en,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})
