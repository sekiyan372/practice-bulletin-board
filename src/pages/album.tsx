import { Heading, Skeleton, Stack, TabPanels, Tabs } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useMemo } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { DeleteContentsButton } from '~/components/Button'
import { PhotoCard } from '~/components/Card'
import { ManageTabList, ManageTabPanel } from '~/components/Tab'
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
          <ManageTabList
            privateLength={privateData.length}
            publicLength={publicData.length}
            blockedLength={blockedData.length}
          />

          <Stack direction="row" pt="3">
            <DeleteContentsButton>選択した項目を削除</DeleteContentsButton>
          </Stack>

          <TabPanels>
            <ManageTabPanel>
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
            </ManageTabPanel>
            <ManageTabPanel>
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
            </ManageTabPanel>
            <ManageTabPanel>
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
            </ManageTabPanel>
          </TabPanels>
        </Tabs>
      </Skeleton>
    </>
  )
}

export default Album
