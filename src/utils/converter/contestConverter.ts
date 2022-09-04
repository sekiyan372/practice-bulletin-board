import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { Contest } from '~/types/contestTypes'

export const contestConverter = (): FirestoreDataConverter<Contest> => ({
  toFirestore(value: WithFieldValue<Contest>): DocumentData {
    return {
      ja: value.ja,
      en: value.en,
      startAt: value.startAt,
      endAt: value.endAt,
      publishAt: value.publishAt,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Contest {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      ja: data.ja,
      en: data.en,
      startAt: data.startAt.toDate(),
      endAt: data.endAt.toDate(),
      publishAt: data.publishAt.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    }
  },
})
