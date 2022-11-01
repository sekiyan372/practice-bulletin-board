import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore'
import { serverTimestamp } from 'firebase/firestore'

import type { ContestAward, ContestPhoto } from '~/types/contestTypes'
import { contestAward, contestAwardArray } from '~/types/contestTypes'

export const contestPhotoConverter =
  (): FirestoreDataConverter<ContestPhoto> => ({
    toFirestore(value: WithFieldValue<ContestPhoto>): DocumentData {
      return {
        imagePath: value.imagePath,
        imageUrl: value.imageUrl,
        title: value.title,
        comment: value.comment,
        name: value.name,
        email: value.email,
        award: contestAwardArray.indexOf(contestAward.NONE),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): ContestPhoto {
      const data = snapshot.data()
      return {
        id: snapshot.id,
        imagePath: data.imagePath,
        imageUrl: data.imageUrl,
        title: data.title,
        comment: data.comment,
        name: data.name,
        email: data.email,
        award: iToContestAward(data.award),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      }
    },
  })

const iToContestAward = (i: number): ContestAward => {
  switch (i) {
    case contestAwardArray.indexOf(contestAward.YUWAKU_BONBORI):
      return contestAward.YUWAKU_BONBORI
    case contestAwardArray.indexOf(contestAward.YUWAKU_HIDDEN_CHARM):
      return contestAward.YUWAKU_HIDDEN_CHARM
    default:
      return contestAward.NONE
  }
}
