import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore'

import { Contest } from '~/types'

export const contestConverter = (): FirestoreDataConverter<Contest> => ({
  toFirestore(value: WithFieldValue<Contest>) {
    return {
      image: value.image,
      comment: value.comment,
      name: value.name,
      mail: value.mail,
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>) {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      image: data.image,
      name: data.name,
      comment: data.comment,
      mail: data.mail,
    }
  },
})
