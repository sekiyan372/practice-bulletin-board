import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase-admin/firestore'

import { Post } from '~/types/post'

export const postConverter = (): FirestoreDataConverter<Post> => ({
  toFirestore(value: WithFieldValue<Post>): DocumentData {
    return value
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Post {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
      text: data.text,
      createdAt: data.createdAt.toDate(),
    }
  },
})
