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
import { FC, useCallback, useRef } from 'react'
import { useRecoilState } from 'recoil'

import { atomFocusAlbum } from '~/recoil'
import type { Album } from '~/types'

type Props = {
  nextStatus: Album['status']
  modalState: boolean
  closeModal: () => void
  closeDialog: () => void
}

export const ConfirmDialog: FC<Props> = ({
  nextStatus,
  modalState,
  closeModal,
  closeDialog,
}) => {
  const cancelRef = useRef(null)
  const [focusAlbum, setFocusAlbum] = useRecoilState(atomFocusAlbum)

  const handleClose = useCallback(async () => {
    if (!focusAlbum) return

    await focusAlbum.updateAlbum(focusAlbum.album.id, nextStatus)
    await focusAlbum.getAlbum()
    closeModal()
    closeDialog()
    setFocusAlbum(null)
  }, [focusAlbum, setFocusAlbum, nextStatus, closeModal, closeDialog])

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
              {statusToText(nextStatus)}
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
              {statusToText(nextStatus)}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

const statusToText = (status: Album['status']): string => {
  switch (status) {
    case 'public':
      return '公開'
    case 'private':
      return '未公開'
    case 'block':
      return 'ブロック'
    default:
      return ''
  }
}

const statusToColor = (status: Album['status']): string => {
  switch (status) {
    case 'public':
      return 'green'
    case 'private':
      return 'blue'
    case 'block':
      return 'red'
    default:
      return ''
  }
}
