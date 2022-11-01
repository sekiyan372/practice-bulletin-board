import {
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { firestore } from '~/database/firebase'
import { Album, AlbumPhoto, albumStatusArray } from '~/types/albumTypes'
import { ALBUM_DEV, ALBUM_PROD, isEnv, PHOTO } from '~/utils'

export const updateAlbumPhoto = async (
  aid: Album['id'],
  id: AlbumPhoto['id'],
  status: AlbumPhoto['status']
) => {
  if (!firestore) throw new Error()

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
