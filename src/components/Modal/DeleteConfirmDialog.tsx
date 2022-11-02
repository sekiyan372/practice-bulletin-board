import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { memo, useCallback, useRef, useState } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { deleteAlbumPhoto } from '~/feature/frontend/albumPhoto'
import { AlbumPhoto } from '~/types/albumTypes'

type Props = {
  albumId: string | string[] | undefined
  photosMapData: Map<AlbumPhoto['id'], AlbumPhoto['imagePath']>
  isOpen: boolean
  onClose: () => void
}

export const DeleteConfirmDialog: FC<Props> = memo(
  ({ albumId, photosMapData, isOpen, onClose }) => {
    const router = useRouter() //ルーター
    const cancelRef = useRef(null) //キャンセルボタンの参照先
    const [error, setError] = useState<Error | undefined>(undefined)

    //削除実行時の処理
    const handleExecuteDelete = useCallback(() => {
      try {
        if (!albumId || Array.isArray(albumId))
          throw new Error('渡されたパラメータが正しくありません。')

        photosMapData.forEach(
          async (value: AlbumPhoto['imagePath'], key: AlbumPhoto['id']) => {
            await deleteAlbumPhoto(albumId, key, value)
          }
        )

        onClose()
        router.reload()
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('エラーが発生しました。')
        )
      }
    }, [router, albumId, photosMapData, onClose])

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
            <AlertHealthCheckFailed error={error} />
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
