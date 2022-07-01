import type { CollectionReference, QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs, query } from 'firebase/firestore'
import { useCallback, useState } from 'react'

import { firestore } from '~/database/firebase'
import type { Contest } from '~/types'
import { contestConverter, isEnv } from '~/utils'

export type UseFetchDataType = [
  Contest[],
  () => Promise<void>,
  { loading: boolean; error: Error | undefined }
]

export const useFetchContest = (): UseFetchDataType => {
  const [data, setData] = useState<Contest[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const getData = useCallback(async () => {
    if (!firestore) return

    setLoading(true)
    try {
      const contestRef: CollectionReference<Contest> = collection(
        firestore,
        isEnv() ? 'photocon_production' : 'photocon_development'
      ).withConverter(contestConverter())
      const response: QuerySnapshot<Contest> = await getDocs(query(contestRef))
      const contest: Contest[] = response.docs.map((doc) => doc.data())
      setData(contest)
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return [data, getData, { loading, error }]
}
