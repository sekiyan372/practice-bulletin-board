import {
  Button,
  Heading,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { memo, useEffect, useMemo } from 'react'
import { MdDelete } from 'react-icons/md'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { PhotoCard } from '~/components/Card'
import { useFetchAlbum } from '~/hooks/useFetchAlbum'
import type { Album } from '~/types'

const Album: NextPage = () => {
  const [data, getData, { loading, error }] = useFetchAlbum()

  const privateData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'private')
  }, [data])

  const publicData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'public')
  }, [data])

  const blockedData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'block')
  }, [data])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        アルバム管理
      </Heading>
      <Skeleton isLoaded={!loading}>
        <Tabs variant="enclosed" px="50" pb="10">
          <TabList>
            <Tab>
              未公開
              <Text
                display="inline"
                backgroundColor="blue.500"
                color="white"
                px="2"
                ml="1"
                borderRadius="50"
              >
                {privateData.length}
              </Text>
            </Tab>
            <Tab>
              公開
              <Text
                display="inline"
                backgroundColor="green.500"
                color="white"
                px="2"
                ml="1"
                borderRadius="50"
              >
                {publicData.length}
              </Text>
            </Tab>
            <Tab>
              ブロック
              <Text
                display="inline"
                backgroundColor="red.500"
                color="white"
                px="2"
                ml="1"
                borderRadius="50"
              >
                {blockedData.length}
              </Text>
            </Tab>
          </TabList>

          <Stack direction="row" pt="3">
            <Button leftIcon={<MdDelete />} colorScheme="red" ml="auto">
              選択した項目を削除
            </Button>
          </Stack>

          <TabPanels>
            <TabPanel>
              {privateData.map((album) => (
                <PhotoCard content={album} key={album.id} />
              ))}
            </TabPanel>
            <TabPanel>
              {publicData.map((album) => (
                <PhotoCard content={album} key={album.id} />
              ))}
            </TabPanel>
            <TabPanel>
              {blockedData.map((album) => (
                <PhotoCard content={album} key={album.id} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Skeleton>
    </>
  )
}

export default memo(Album)
