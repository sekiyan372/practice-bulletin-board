import type { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { useCallback, useState } from 'react'

import { firestore } from '~/database/firebase'
import type { Photocon } from '~/types'
import { isEnv } from '~/utils'

export type UseFetchPhotoconsType = [Photocon[], () => Promise<void>]

const useFetchPhotocons = (): UseFetchPhotoconsType => {
  const [photocons, setPhotocons] = useState<Photocon[]>([])

  const getPhotocons = useCallback(async () => {
    if (!firestore) return
    await getDocs(
      collection(
        firestore,
        isEnv() ? 'photocon_production' : 'photocon_development'
      )
    )
      .then((res: QuerySnapshot) => {
        const distList: Photocon[] = []
        res.forEach((doc: QueryDocumentSnapshot) => {
          const distData: Photocon = {
            id: doc.id,
            comment: doc.data().comment,
            image: doc.data().image,
            mail: doc.data().mail,
            name: doc.data().name,
          }
          distList.push(distData)
        })
        setPhotocons(distList)
      })
      .catch((e) => {
        throw e
      })
  }, [])

  return [photocons, getPhotocons]
}

export default useFetchPhotocons
