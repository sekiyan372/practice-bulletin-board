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
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { DeleteContentsButton } from '~/components/Button'
import { AlbumCard } from '~/components/Card'
import { DeleteConfirmDialog } from '~/components/Modal'
import { ManageTabList } from '~/components/Tab'
import type { AlbumPhoto, AlbumStatus } from '~/types/albumTypes'
import { albumStatus } from '~/types/albumTypes'

const AlbumPhotoPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const fetcher = useCallback(async (url: string): Promise<AlbumPhoto[]> => {
    const res: AxiosResponse<{ photos: AlbumPhoto[] }, Error> = await axios(url)
    return res.data.photos
  }, [])
  const { data, error } = useSWR<AlbumPhoto[]>(`/api/albums/${id}`, fetcher)

  //表示しているタブの種類
  const [selectedTab, setSelectedTab] = useState<AlbumStatus>(
    albumStatus.PRIVATE
  )

  //チェックボックスにチェックされた投稿
  const [checkedPhotos, setCheckedPhotos] = useState<
    Map<AlbumPhoto['id'], AlbumPhoto['imagePath']>
  >(new Map())

  const { isOpen, onOpen, onClose } = useDisclosure()

  //非公開状態の投稿
  const privateData = useMemo<AlbumPhoto[]>(() => {
    if (!data) return []
    return data.filter(
      (photo: AlbumPhoto) => photo.status === albumStatus.PRIVATE
    )
  }, [data])

  //公開状態の投稿
  const publicData = useMemo<AlbumPhoto[]>(() => {
    if (!data) return []
    return data.filter(
      (photo: AlbumPhoto) => photo.status === albumStatus.PUBLIC
    )
  }, [data])

  //ブロック状態の投稿
  const blockedData = useMemo<AlbumPhoto[]>(() => {
    if (!data) return []
    return data.filter(
      (photo: AlbumPhoto) => photo.status === albumStatus.BLOCK
    )
  }, [data])

  //チェックボックスにチェックをつけた時の挙動
  const handleCheck = useCallback(
    (id: AlbumPhoto['id'], imagePath: AlbumPhoto['imagePath']) => {
      const changedPhotos: Map<AlbumPhoto['id'], AlbumPhoto['imagePath']> =
        checkedPhotos
      if (checkedPhotos.has(id)) {
        changedPhotos.delete(id)
        setCheckedPhotos(changedPhotos)
      } else {
        setCheckedPhotos(changedPhotos.set(id, imagePath))
      }
    },
    [checkedPhotos]
  )

  //削除実行時の挙動
  const handleClickDelete = useCallback(() => {
    if (checkedPhotos.size === 0 || selectedTab === albumStatus.PUBLIC) return
    onOpen()
  }, [onOpen, checkedPhotos, selectedTab])

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        投稿作品一覧
      </Heading>

      <Skeleton isLoaded={!!data}>
        <Tabs variant="enclosed" px={{ base: 4, sm: 50 }} pb="10">
          <ManageTabList
            privateLength={privateData.length}
            publicLength={publicData.length}
            blockedLength={blockedData.length}
            handleSelected={setSelectedTab}
          />

          {selectedTab !== albumStatus.PUBLIC && (
            <Stack direction="row" pt="3">
              <DeleteContentsButton handleClick={handleClickDelete}>
                選択した項目を削除
              </DeleteContentsButton>

              <DeleteConfirmDialog
                albumId={id}
                photosMapData={checkedPhotos}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Stack>
          )}

          <TabPanels>
            <TabPanel as={Flex} wrap="wrap">
              {privateData.map((photo) => (
                <AlbumCard
                  key={photo.id}
                  focusPhoto={{
                    albumId: id,
                    photo: photo,
                  }}
                  handleCheck={handleCheck}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {publicData.map((photo) => (
                <AlbumCard
                  key={photo.id}
                  focusPhoto={{
                    albumId: id,
                    photo: photo,
                  }}
                  handleCheck={handleCheck}
                />
              ))}
            </TabPanel>
            <TabPanel as={Flex} wrap="wrap">
              {blockedData.map((photo) => (
                <AlbumCard
                  key={photo.id}
                  focusPhoto={{
                    albumId: id,
                    photo: photo,
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

export default AlbumPhotoPage
