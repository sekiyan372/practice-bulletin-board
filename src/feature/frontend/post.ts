import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '~/db/firebase'
import { isEnv, POST_DEV, POST_PROD } from '~/utils'

export const createPost = async (name: string, text: string) => {
  const collectionRef = collection(db, isEnv() ? POST_PROD : POST_DEV)
  await addDoc(collectionRef, {
    name: name,
    text: text,
    createdAt: serverTimestamp(),
  })
}

export const deletePost = async (id: string) => {
  const docRef = doc(db, isEnv() ? POST_PROD : POST_DEV, id)
  await deleteDoc(docRef)
}
