import type { QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { useCallback, useState } from 'react'

import { firestore } from '~/database/firebase'
import type { Album } from '~/types'
import { albumConverter, isEnv } from '~/utils'

export type UseFetchDataType = [
  Album[],
  () => Promise<void>,
  { loading: boolean; error: Error | undefined }
]

export const useFetchAlbum = (): UseFetchDataType => {
  const [data, setData] = useState<Album[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const getData = useCallback(async () => {
    if (!firestore) return

    setLoading(true)
    try {
      const response: QuerySnapshot<Album> = await getDocs(
        collection(
          firestore,
          isEnv() ? 'album_production' : 'album_development'
        ).withConverter(albumConverter())
      )
      const album: Album[] = response.docs.map((doc) => doc.data())
      setData(album)
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return [data, getData, { loading, error }]
}
