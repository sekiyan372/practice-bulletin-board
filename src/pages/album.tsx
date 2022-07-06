import {
  Flex,
  Heading,
  Skeleton,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { DeleteContentsButton } from '~/components/Button'
import { AlbumCard } from '~/components/Card'
import { ManageTabList } from '~/components/Tab'
import { useAlbum } from '~/hooks/useAlbum'
import type { Album } from '~/types'
import { AlbumStatus } from '~/types'

const Album: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<AlbumStatus>(
    AlbumStatus.PRIVATE
  )
  const [data, getData, updateData, deleteData, { loading, error }] = useAlbum()

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
          <ManageTabList
            privateLength={privateData.length}
            publicLength={publicData.length}
            blockedLength={blockedData.length}
            handleSelected={setSelectedTab}
          />

          {selectedTab !== AlbumStatus.PUBLIC && (
            <Stack direction="row" pt="3">
              <DeleteContentsButton>選択した項目を削除</DeleteContentsButton>
            </Stack>
          )}

          <TabPanels>
            <TabPanel as={Flex} wrap="wrap">
              {privateData.map((album) => (
                <AlbumCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                    deleteAlbum: deleteData,
                  }}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {publicData.map((album) => (
                <AlbumCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                    deleteAlbum: deleteData,
                  }}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {blockedData.map((album) => (
                <AlbumCard
                  key={album.id}
                  focusAlbum={{
                    album: album,
                    getAlbum: getData,
                    updateAlbum: updateData,
                    deleteAlbum: deleteData,
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
