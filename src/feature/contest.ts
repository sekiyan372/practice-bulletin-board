import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { contestConverter } from '~/feature/converter'
import type { Contest } from '~/types/contestTypes'
import { CONTEST_DEV, CONTEST_PROD, isEnv } from '~/utils'

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

  return contests
}
