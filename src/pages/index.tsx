import type { NextPage } from 'next'
import { useEffect } from 'react'

import useFetchPhotocons from '~/hooks/useFetchPhotocons'

const Home: NextPage = () => {
  const [photocons, getPhotocons] = useFetchPhotocons()

  useEffect(() => {
    getPhotocons()
  }, [getPhotocons])

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
