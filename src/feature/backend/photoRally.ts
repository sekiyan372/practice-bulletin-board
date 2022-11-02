import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { photoRallyConverter } from '~/feature/backend/converter'
import type { PhotoRally } from '~/types/photoRallyTypes'
import { isEnv, PHOTO_RALLY_DEV, PHOTO_RALLY_PROD } from '~/utils'

export const getPhotoRallies = async (): Promise<PhotoRally[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const photoRallyRef: CollectionReference<PhotoRally> = firestore
    .collection(isEnv() ? PHOTO_RALLY_PROD : PHOTO_RALLY_DEV)
    .withConverter(photoRallyConverter())

  //firestoreから取得したデータ
  const snapShot: QuerySnapshot<PhotoRally> = await photoRallyRef
    .orderBy('createdAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const photoRallies: PhotoRally[] = snapShot.docs.map((doc) => doc.data())

  return photoRallies
}
