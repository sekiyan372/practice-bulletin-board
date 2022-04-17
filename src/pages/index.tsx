import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { PhotoconCard } from '~/components/Card'
import useFetchPhotocons from '~/hooks/useFetchPhotocons'

const Home: NextPage = () => {
  const [photocons, getPhotocons, { loading, error }] = useFetchPhotocons()

  useEffect(() => {
    getPhotocons()
  }, [getPhotocons])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        応募作品一覧
      </Heading>
      <Box>
        <Skeleton isLoaded={!loading}>
          <Flex flexWrap="wrap" justifyContent="center">
            {photocons.map((photocon, index) => (
              <PhotoconCard
                key={photocon.id}
                photocon={photocon}
                index={index + 1}
              />
            ))}
          </Flex>
        </Skeleton>
      </Box>
    </>
  )
}

export default Home
