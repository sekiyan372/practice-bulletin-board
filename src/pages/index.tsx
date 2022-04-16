import type { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { firestore } from '~/database/firebase'
import type { Photocon } from '~/types'
import { isEnv } from '~/utils'

const Home: NextPage = () => {
  const [photocons, setPhotocons] = useState<Photocon[]>([])
  useEffect(() => {
    const getData = async () => {
      if (!firestore) return
      await getDocs(
        collection(
          firestore,
          isEnv() ? 'photocon_production' : 'photocon_development'
        )
      ).then((res: QuerySnapshot) => {
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
    }
    getData()
  }, [])

  return (
    <>
      <h1>トップページ</h1>
      <div>
        {photocons.map((photocon) => (
          <div key={photocon.id}>{photocon.name}</div>
        ))}
      </div>
    </>
  )
}

export default Home
