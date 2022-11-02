import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { spotConverter } from '~/feature/backend/converter'
import type { Spot } from '~/types/photoRallyTypes'
import { isEnv, SPOT_DEV, SPOT_PROD } from '~/utils'

export const getSpots = async (): Promise<Spot[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const spotRef: CollectionReference<Spot> = firestore
    .collection(isEnv() ? SPOT_PROD : SPOT_DEV)
    .withConverter(spotConverter())

  //firestoreから取得したデータ
  const snapShot: QuerySnapshot<Spot> = await spotRef
    .orderBy('createdAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const spots: Spot[] = snapShot.docs.map((doc) => doc.data())

  return spots
}
