import {
  Button,
  Flex,
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
import { useEffect, useMemo } from 'react'
import { MdDelete } from 'react-icons/md'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { PhotoCard } from '~/components/Card'
import { useAlbum } from '~/hooks/useAlbum'
import type { Album } from '~/types'

const Album: NextPage = () => {
  const [data, getData, updateData, { loading, error }] = useAlbum()

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
        <Tabs variant="enclosed" px={{ base: 4, sm: 50 }} pb="10">
          <TabList>
            <Tab color="gray.800">
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
            <Tab color="gray.800">
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
            <Tab color="gray.800">
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
            <TabPanel as={Flex} wrap="wrap">
              {privateData.map((album) => (
                <PhotoCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                  }}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {publicData.map((album) => (
                <PhotoCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                  }}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {blockedData.map((album) => (
                <PhotoCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                  }}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Skeleton>
    </>
  )
}

export default Album
