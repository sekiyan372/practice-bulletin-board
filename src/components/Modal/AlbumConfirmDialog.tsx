import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, memo, useCallback, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { updateAlbumPhoto } from '~/feature/frontend/albumPhoto'
import { atomFocusPhoto } from '~/recoil'
import type { AlbumPhoto } from '~/types/albumTypes'
import { albumStatus } from '~/types/albumTypes'

type Props = {
  nextStatus: AlbumPhoto['status']
  modalState: boolean
  closeModal: () => void
  closeDialog: () => void
}

export const AlbumConfirmDialog: FC<Props> = memo(
  ({ nextStatus, modalState, closeModal, closeDialog }) => {
    const cancelRef = useRef(null) //キャンセルボタンの参照先
    const router = useRouter() //ルーター
    //現在扱っている作品とそのsetter
    const [focusPhoto, setFocusPhoto] = useRecoilState(atomFocusPhoto)
    const [error, setError] = useState<Error | undefined>(undefined)

    //status更新実行時の処理
    const handleClose = useCallback(async () => {
      try {
        if (
          !focusPhoto ||
          !focusPhoto.albumId ||
          Array.isArray(focusPhoto.albumId)
        )
          throw new Error('渡されたパラメータが正しくありません。')

        await updateAlbumPhoto(
          focusPhoto.albumId,
          focusPhoto.photo.id,
          nextStatus
        )

        closeModal()
        closeDialog()
        setFocusPhoto(null)
        router.reload()
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('エラーが発生しました。')
        )
      }
    }, [router, focusPhoto, setFocusPhoto, nextStatus, closeModal, closeDialog])

    return (
      <>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={closeDialog}
          isOpen={modalState}
          isCentered
          blockScrollOnMount={false}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertHealthCheckFailed error={error} />
            <AlertDialogHeader color="gray.800">実行確認</AlertDialogHeader>

            <AlertDialogBody color="gray.800">
              本当に作品を
              <Text
                color={`${statusToColor(nextStatus)}.500`}
                display="inline"
                px="1"
                fontWeight="bold"
              >
                {nextStatus}
              </Text>
              にしてもよろしいですか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog} color="gray.800">
                キャンセル
              </Button>
              <Button
                onClick={() => handleClose()}
                ml={3}
                colorScheme={statusToColor(nextStatus)}
                color="white"
              >
                {nextStatus}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
)

const statusToColor = (status: AlbumPhoto['status']): string => {
  switch (status) {
    case albumStatus.PUBLIC:
      return 'green'
    case albumStatus.PRIVATE:
      return 'blue'
    case albumStatus.BLOCK:
      return 'red'
    default:
      return ''
  }
}
