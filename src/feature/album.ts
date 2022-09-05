import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { albumConverter } from '~/feature/converter'
import type { Album } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv } from '~/utils'

export const getAlbums = async (): Promise<Album[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const albumRef: CollectionReference<Album> = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .withConverter(albumConverter())

  //firestoreから取得したデータ
  const snapShot: QuerySnapshot<Album> = await albumRef
    .orderBy('endAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const albums: Album[] = snapShot.docs.map((doc) => doc.data())

  return albums
}
