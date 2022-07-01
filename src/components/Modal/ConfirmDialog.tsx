import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'
import { FC, useRef } from 'react'

import type { Album } from '~/types'

type Props = {
  nextStatus: Album['status']
  modalState: boolean
  handleClose: () => void
}

export const ConfirmDialog: FC<Props> = ({
  nextStatus,
  modalState,
  handleClose,
}) => {
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isOpen={modalState}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>実行確認</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
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
            <Button ref={cancelRef} onClick={handleClose}>
              キャンセル
            </Button>
            <Button
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
