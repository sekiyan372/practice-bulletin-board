import type { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { useCallback, useState } from 'react'

import { firestore } from '~/database/firebase'
import type { Photocon } from '~/types'
import { isEnv } from '~/utils'

export type UseFetchPhotoconsType = [
  Photocon[],
  () => Promise<void>,
  { loading: boolean; error: Error | undefined }
]

const useFetchPhotocons = (): UseFetchPhotoconsType => {
  const [photocons, setPhotocons] = useState<Photocon[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const getPhotocons = useCallback(async () => {
    if (!firestore) return

    setLoading(true)
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
        setError(e)
        throw e
      })
      .finally(() => setLoading(false))
  }, [])

  return [photocons, getPhotocons, { loading, error }]
}

export default useFetchPhotocons
