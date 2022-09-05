import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import useSWR from 'swr'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { ContestCard } from '~/components/Card'
import type { ContestPhoto } from '~/types/contestTypes'

const Contest: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const fetcher = useCallback(async (url: string): Promise<ContestPhoto[]> => {
    const res: AxiosResponse<{ photos: ContestPhoto[] }, Error> = await axios(
      url
    )
    return res.data.photos
  }, [])
  const { data, error } = useSWR<ContestPhoto[], Error>(
    `/api/contests/${id}`,
    fetcher
  )

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        応募作品一覧
      </Heading>

      <Box>
        <Skeleton isLoaded={!!data}>
          <Flex flexWrap="wrap" justifyContent="center">
            {data?.map((photo, index) => (
              <ContestCard key={photo.id} photo={photo} index={index + 1} />
            ))}
          </Flex>
        </Skeleton>
      </Box>
    </>
  )
}

export default Contest
