import {
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { firestore } from '~/database/firebase'
import type { Contest, ContestPhoto } from '~/types/contestTypes'
import { contestAwardArray } from '~/types/contestTypes'
import { CONTEST_DEV, CONTEST_PROD, isEnv, PHOTO } from '~/utils'

export const updateContestPhoto = async (
  cid: Contest['id'],
  id: ContestPhoto['id'],
  status: ContestPhoto['award']
) => {
  if (!firestore) throw new Error('データベースが存在しません。')

  //firestoreのdocumentの参照情報
  const contestPhotoRef: DocumentReference<DocumentData> = doc(
    firestore,
    isEnv() ? CONTEST_PROD : CONTEST_DEV,
    cid,
    PHOTO,
    id
  )

  //status変更
  await updateDoc(contestPhotoRef, {
    award: contestAwardArray.indexOf(status),
    updatedAt: serverTimestamp(),
  })
}
