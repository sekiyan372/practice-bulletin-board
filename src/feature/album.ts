import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import type { Album } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv } from '~/utils'
import { albumConverter } from '~/utils/converter/albumConverter'

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

  //データ取得成功時の返り値
  return albums
}
