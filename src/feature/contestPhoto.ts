import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { contestPhotoConverter } from '~/feature/converter'
import type { Contest, ContestPhoto } from '~/types/contestTypes'
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
