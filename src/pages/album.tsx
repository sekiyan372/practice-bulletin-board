import {
  Flex,
  Heading,
  Skeleton,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { DeleteContentsButton } from '~/components/Button'
import { AlbumCard } from '~/components/Card'
import { DeleteConfirmDialog } from '~/components/Modal'
import { ManageTabList } from '~/components/Tab'
import { useAlbum } from '~/hooks/useAlbum'
import type { Album } from '~/types'
import { AlbumStatus } from '~/types'

const Album: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<AlbumStatus>(
    AlbumStatus.PRIVATE
  )
  const [checkedAlbums, setCheckedAlbums] = useState<
    Map<Album['id'], Album['imagePath']>
  >(new Map())
  const { data, getData, updateData, deleteData, loading, error } = useAlbum()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const privateData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'private')
  }, [data])

  const publicData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'public')
  }, [data])

  const blockedData = useMemo<Album[]>(() => {
    return data.filter((album) => album.status === 'block')
  }, [data])

  const handleCheck = useCallback(
    (id: Album['id'], imagePath: Album['imagePath']) => {
      const changedAlbums = checkedAlbums
      if (checkedAlbums.has(id)) {
        changedAlbums.delete(id)
        setCheckedAlbums(changedAlbums)
      } else {
        setCheckedAlbums(changedAlbums.set(id, imagePath))
      }
    },
    [checkedAlbums]
  )

  const handleClickDelete = useCallback(() => {
    if (checkedAlbums.size === 0 || selectedTab === AlbumStatus.PUBLIC) return
    onOpen()
  }, [onOpen, checkedAlbums, selectedTab])

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
              <DeleteContentsButton handleClick={handleClickDelete}>
                選択した項目を削除
              </DeleteContentsButton>

              <DeleteConfirmDialog
                albumsMapData={checkedAlbums}
                isOpen={isOpen}
                onClose={onClose}
                getAlbums={getData}
                deleteAlbum={deleteData}
              />
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
                  handleCheck={handleCheck}
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
                  handleCheck={handleCheck}
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
                  handleCheck={handleCheck}
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
