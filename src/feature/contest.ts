import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import type { Contest } from '~/types/contestTypes'
import { CONTEST_DEV, CONTEST_PROD, isEnv } from '~/utils'
import { contestConverter } from '~/utils/converter/contestConverter'

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
