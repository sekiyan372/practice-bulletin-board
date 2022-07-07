import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { memo, useCallback, useRef } from 'react'

import { Album } from '~/types'

type Props = {
  albumsMapData: Map<Album['id'], Album['imagePath']>
  isOpen: boolean
  onClose: () => void
  getAlbums: () => Promise<void>
  deleteAlbum: (id: string, imagePath: string) => Promise<void>
}

export const DeleteConfirmDialog: FC<Props> = memo(
  ({ albumsMapData, isOpen, onClose, getAlbums, deleteAlbum }) => {
    const cancelRef = useRef(null)

    const handleExecuteDelete = useCallback(async () => {
      await albumsMapData.forEach(
        (value: Album['imagePath'], key: Album['id']) => {
          deleteAlbum(key, value)
        }
      )
      await getAlbums()
      onClose()
    }, [albumsMapData, getAlbums, deleteAlbum, onClose])

    return (
      <>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          blockScrollOnMount={false}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader color="gray.800">実行確認</AlertDialogHeader>

            <AlertDialogBody color="gray.800">
              本当に選択した投稿を削除してもよろしいですか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} color="gray.800">
                キャンセル
              </Button>
              <Button
                onClick={handleExecuteDelete}
                ml={3}
                colorScheme="red"
                color="white"
              >
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
)
