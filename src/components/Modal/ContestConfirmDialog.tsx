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

import { atomAwardFocusPhoto } from '~/recoil'
import type { ContestPhoto } from '~/types/contestTypes'
import { contestAward } from '~/types/contestTypes'

type Props = {
  nextStatus: ContestPhoto['award']
  modalState: boolean
  closeModal: () => void
  closeDialog: () => void
}

export const ContestConfirmDialog: FC<Props> = memo(
  ({ nextStatus, modalState, closeModal, closeDialog }) => {
    const cancelRef = useRef(null) //キャンセルボタンの参照先
    const router = useRouter() //ルーター
    //現在扱っている作品とそのsetter
    const [awardFocusPhoto, setAwardFocusPhoto] =
      useRecoilState(atomAwardFocusPhoto)

    //status更新実行時の処理
    const handleClose = useCallback(async () => {
      if (!awardFocusPhoto) return

      await axios.patch(`/api/contests/${awardFocusPhoto.contestId}`, {
        id: awardFocusPhoto.photo.id,
        status: nextStatus,
      })

      closeModal()
      closeDialog()
      setAwardFocusPhoto(null)
      router.reload()
    }, [
      router,
      awardFocusPhoto,
      setAwardFocusPhoto,
      nextStatus,
      closeModal,
      closeDialog,
    ])

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

const statusToColor = (status: ContestPhoto['award']): string => {
  switch (status) {
    case contestAward.YUWAKU_BONBORI:
      return 'blue'
    case contestAward.YUWAKU_HIDDEN_CHARM:
      return 'green'
    case contestAward.NONE:
      return 'red'
    default:
      return ''
  }
}
