import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { contestPhotoConverter } from '~/feature/converter'
import type { Contest, ContestPhoto } from '~/types/contestTypes'
import { contestAwardArray } from '~/types/contestTypes'
import { CONTEST_DEV, CONTEST_PROD, isEnv, PHOTO } from '~/utils'

export const getContestPhotos = async (
  cid: Contest['id']
): Promise<ContestPhoto[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const contestPhotosRef: CollectionReference<ContestPhoto> = firestore
    .collection(isEnv() ? CONTEST_PROD : CONTEST_DEV)
    .doc(cid)
    .collection(PHOTO)
    .withConverter(contestPhotoConverter())

  //firestoreから応募データ取得
  const snapShot: QuerySnapshot<ContestPhoto> = await contestPhotosRef
    .orderBy('createdAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const contestPhotos: ContestPhoto[] = snapShot.docs.map((doc) => doc.data())

  return contestPhotos
}

export const updateContestPhoto = async (
  cid: Contest['id'],
  id: ContestPhoto['id'],
  status: ContestPhoto['award']
) => {
  if (!firestore) throw new Error()

  //firestoreのdocumentの参照情報
  const contestPhotoRef: DocumentReference<DocumentData> = firestore
    .collection(isEnv() ? CONTEST_PROD : CONTEST_DEV)
    .doc(cid)
    .collection(PHOTO)
    .doc(id)

  //status変更
  await contestPhotoRef.update({
    award: contestAwardArray.indexOf(status),
    updatedAt: FieldValue.serverTimestamp(),
  })
}
