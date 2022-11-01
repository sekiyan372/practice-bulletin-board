import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'

import { firestore, storage } from '~/database/firebaseAdmin'
import { albumPhotoConverter } from '~/feature/converter'
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

export const deleteAlbumPhoto = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  imagePath: AlbumPhoto['imagePath']
) => {
  if (!firestore || !storage) throw new Error()

  //firestoreのdocumentの参照情報
  const albumPhotoRef: DocumentReference<DocumentData> = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .doc(aid)
    .collection(PHOTO)
    .doc(id)

  //firestoreから対象のdocumentを削除
  await albumPhotoRef.delete()

  //storageから対象の画像を削除
  await storage.bucket().file(imagePath).delete()
}
