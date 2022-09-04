import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import { PhotoRally } from '~/types'

export const photoRallyConverter = (): FirestoreDataConverter<PhotoRally> => ({
  toFirestore(value: WithFieldValue<PhotoRally>) {
    return {
      ja: value.ja,
      en: value.en,
      date: value.date,
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>) {
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
