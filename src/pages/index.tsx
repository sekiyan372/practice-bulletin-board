import { Box, Heading, Skeleton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import useFetchPhotocons from '~/hooks/useFetchPhotocons'

const Home: NextPage = () => {
  const [photocons, getPhotocons, { loading, error }] = useFetchPhotocons()

  useEffect(() => {
    getPhotocons()
  }, [getPhotocons])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading>トップページ</Heading>
      <Box>
        <Skeleton isLoaded={!loading}>
          {photocons.map((photocon) => (
            <Box key={photocon.id}>{photocon.name}</Box>
          ))}
        </Skeleton>
      </Box>
    </>
  )
}

export default Home
