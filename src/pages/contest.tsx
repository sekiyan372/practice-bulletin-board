import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { PhotoconCard } from '~/components/Card'
import { useFetchContest } from '~/hooks/useFetchContest'

const Contest: NextPage = () => {
  const [data, getData, { loading, error }] = useFetchContest()

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        フォトコンテスト管理
      </Heading>
      <Box>
        <Skeleton isLoaded={!loading}>
          <Flex flexWrap="wrap" justifyContent="center">
            {data.map((contest, index) => (
              <PhotoconCard
                key={contest.id}
                contest={contest}
                index={index + 1}
              />
            ))}
          </Flex>
        </Skeleton>
      </Box>
    </>
  )
}

export default Contest
