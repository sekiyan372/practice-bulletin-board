import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { contestConverter, contestPhotoConverter } from '~/feature/converter'
import type { Contest, ContestPhoto } from '~/types/contestTypes'
import { CONTEST_DEV, CONTEST_PROD, isEnv, PHOTO } from '~/utils'

export const getContests = async (): Promise<Contest[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const contestRef: CollectionReference<Contest> = firestore
    .collection(isEnv() ? CONTEST_PROD : CONTEST_DEV)
    .withConverter(contestConverter())

  //firestoreから取得したデータ
  const snapShot: QuerySnapshot<Contest> = await contestRef
    .orderBy('endAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const contests: Contest[] = snapShot.docs.map((doc) => doc.data())

  //データ取得成功時の返り値
  return contests
}

export const getPhotosByContestId = async (
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
  console.log(contestPhotos)

  //データ取得成功時のレスポンス
  return contestPhotos
}
