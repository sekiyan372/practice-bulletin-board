import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { ContestCard } from '~/components/Card'
import { contestAward, ContestPhoto } from '~/types/contestTypes'

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
  //湯涌ぼんぼり賞
  const [bonboriAwards, setBonboriAwards] = useState<ContestPhoto[]>([])

  //ゆわく隠れた魅力賞
  const [hiddenAwards, setHiddenAwards] = useState<ContestPhoto[]>([])

  useEffect(() => {
    if (data === undefined) return
    const hiddenPickPhoto = data.filter(
      (hiddenPick) => hiddenPick.award === contestAward.YUWAKU_HIDDEN_CHARM
    )
    setHiddenAwards(hiddenPickPhoto)
    const bonboriPickPhoto = data.filter(
      (awardPick) => awardPick.award === contestAward.YUWAKU_BONBORI
    )
    setBonboriAwards(bonboriPickPhoto)
  }, [data])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        受賞作品
      </Heading>
      <Box m="50px 50px 0 50px">
        <Text as="b" fontSize="xl">
          湯涌ぼんぼり賞
        </Text>

        {bonboriAwards.length === 0 ? (
          <Text p="50px">まだ受賞作品は選ばれていません</Text>
        ) : (
          <Flex flexWrap="wrap">
            {bonboriAwards.map((award, index) => {
              return (
                <ContestCard
                  key={award.id}
                  awardFocusPhoto={{
                    contestId: id,
                    photo: award,
                  }}
                  index={index + 1}
                />
              )
            })}
          </Flex>
        )}

        <Text as="b" fontSize="xl">
          ゆわく隠れた魅力賞
        </Text>
        {hiddenAwards.length === 0 ? (
          <Text p="50px">まだ受賞作品は選ばれていません</Text>
        ) : (
          <Flex flexWrap="wrap">
            {hiddenAwards.map((award, index) => {
              return (
                <ContestCard
                  key={award.id}
                  awardFocusPhoto={{
                    contestId: id,
                    photo: award,
                  }}
                  index={index + 1}
                />
              )
            })}
          </Flex>
        )}
      </Box>

      <Heading textAlign="center" m="50px" color="gray.800">
        応募作品一覧
      </Heading>

      <Box>
        <Skeleton isLoaded={!!data}>
          <Flex flexWrap="wrap" justifyContent="center">
            {data?.map((photo, index) => (
              <ContestCard
                key={photo.id}
                awardFocusPhoto={{
                  contestId: id,
                  photo: photo,
                }}
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
