import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'

import { firestore, storage } from '~/database/firebase'
import { Album, AlbumPhoto, albumStatusArray } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv, PHOTO } from '~/utils'

export const updateAlbumPhoto = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  status: AlbumPhoto['status']
) => {
  if (!firestore) throw new Error('データベースが存在しません。')

  //firestoreのdocumentの参照情報
  const albumPhotoRef: DocumentReference<DocumentData> = doc(
    firestore,
    isEnv() ? ALBUM_PROD : ALBUM_DEV,
    aid,
    PHOTO,
    id
  )

  //status変更
  await updateDoc(albumPhotoRef, {
    status: albumStatusArray.indexOf(status),
    updatedAt: serverTimestamp(),
  })
}

export const deleteAlbumPhoto = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  imagePath: AlbumPhoto['imagePath']
) => {
  if (!firestore || !storage)
    throw new Error('データベースまたはストレージが存在しません。')

  //firestoreのdocumentの参照情報
  const albumPhotoRef: DocumentReference<DocumentData> = doc(
    firestore,
    isEnv() ? ALBUM_PROD : ALBUM_DEV,
    aid,
    PHOTO,
    id
  )
  //firestoreから対象のdocumentを削除
  await deleteDoc(albumPhotoRef)

  //削除する画像があるstorageの参照情報
  const storageRef = ref(storage, imagePath)
  //storageから対象の画像を削除
  await deleteObject(storageRef)
}
