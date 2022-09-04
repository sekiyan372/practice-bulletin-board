import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  QuerySnapshot,
} from 'firebase-admin/firestore'
import { FieldValue } from 'firebase-admin/firestore'

import { firestore, storage } from '~/database/firebaseAdmin'
import { albumConverter, albumPhotoConverter } from '~/feature/converter'
import type { Album, AlbumPhoto } from '~/types/albumTypes'
import { albumStatusArray } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv, PHOTO } from '~/utils'

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

export const getPhotosByAlbumId = async (
  aid: Album['id']
): Promise<AlbumPhoto[]> => {
  if (!firestore) throw new Error()

  //firestoreのcollectionの参照情報
  const albumPhotosRef: CollectionReference<AlbumPhoto> = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .doc(aid)
    .collection(PHOTO)
    .withConverter(albumPhotoConverter())

  //firestoreから投稿の中で公開状態になっているものだけを取得
  const snapShot: QuerySnapshot<AlbumPhoto> = await albumPhotosRef
    .orderBy('createdAt', 'desc')
    .get()

  //扱いやすいようにデータ加工
  const albumPhotos: AlbumPhoto[] = snapShot.docs.map((doc) => doc.data())

  //データ取得成功時のレスポンス
  return albumPhotos
}

export const updatePhotoById = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  status: AlbumPhoto['status']
) => {
  if (!firestore) throw new Error()

  const albumPhotoRef: DocumentReference<DocumentData> = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .doc(aid)
    .collection(PHOTO)
    .doc(id)

  await albumPhotoRef.update({
    status: albumStatusArray.indexOf(status),
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export const deletePhotoById = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  imagePath: AlbumPhoto['imagePath']
) => {
  if (!firestore || !storage) throw new Error()

  const albumPhotoRef: DocumentReference = firestore
    .collection(isEnv() ? ALBUM_PROD : ALBUM_DEV)
    .doc(aid)
    .collection(PHOTO)
    .doc(id)
  await albumPhotoRef.delete()

  const imageFile = storage.bucket().file(imagePath)
  await imageFile.delete()
}
