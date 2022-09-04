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
import axios from 'axios'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { memo, useCallback, useRef } from 'react'
import { useRecoilState } from 'recoil'

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
    const cancelRef = useRef(null)
    const router = useRouter()
    const [focusPhoto, setFocusPhoto] = useRecoilState(atomFocusPhoto)

    const handleClose = useCallback(async () => {
      if (!focusPhoto) return

      await axios.patch(`/api/albums/${focusPhoto.albumId}`, {
        id: focusPhoto.photo.id,
        status: nextStatus,
      })

      closeModal()
      closeDialog()
      setFocusPhoto(null)
      router.reload()
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
