import type {
  CollectionReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore } from '~/database/firebaseAdmin'
import { albumPhotoConverter } from '~/feature/backend/converter'
import type { Album, AlbumPhoto } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv, PHOTO } from '~/utils'

export const getAlbumPhotos = async (
  aid: Album['id']
): Promise<AlbumPhoto[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const albumPhotosRef: CollectionReference<AlbumPhoto> = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .doc(aid)
    .collection(PHOTO)
    .withConverter(albumPhotoConverter())

  //firestoreから取得したデータ
  const snapShot: QuerySnapshot<AlbumPhoto> = await albumPhotosRef
    .orderBy('createdAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const albumPhotos: AlbumPhoto[] = snapShot.docs.map((doc) => doc.data())

  return albumPhotos
}
