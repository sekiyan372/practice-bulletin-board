import type { CollectionReference, QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useCallback, useState } from 'react'

import { firestore } from '~/database/firebase'
import { PhotoRally } from '~/types'
import {
  isEnv,
  PHOTO_RALLY_DEV,
  PHOTO_RALLY_PROD,
  photoRallyConverter,
} from '~/utils'

export const usePhotoRally = () => {
  const [data, setData] = useState<PhotoRally[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const getPhotoRallies = useCallback(async () => {
    if (!firestore) return

    setLoading(true)
    try {
      const photoRallyRef: CollectionReference<PhotoRally> = collection(
        firestore,
        isEnv() ? PHOTO_RALLY_PROD : PHOTO_RALLY_DEV
      ).withConverter(photoRallyConverter())
      const response: QuerySnapshot<PhotoRally> = await getDocs(
        query(photoRallyRef, orderBy('createdAt', 'desc'))
      )
      const photoRallies: PhotoRally[] = response.docs.map((doc) => doc.data())
      setData(photoRallies)
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, getPhotoRallies }
}
