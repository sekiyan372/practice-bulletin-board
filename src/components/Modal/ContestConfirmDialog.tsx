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
import { FC, memo, useCallback, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { updateContestPhoto } from '~/feature/frontend/contestPhoto'
import { atomAwardFocusPhoto } from '~/recoil'
import { contestAward, ContestPhoto } from '~/types/contestTypes'

type Props = {
  nextStatus: ContestPhoto['award']
  modalState: boolean
  closeModal: () => void
  closeDialog: () => void
}

export const ContestConfirmDialog: FC<Props> = memo(
  ({ nextStatus, modalState, closeModal, closeDialog }) => {
    const cancelRef = useRef(null) //キャンセルボタンの参照先
    //現在扱っている作品とそのsetter
    const [awardFocusPhoto, setAwardFocusPhoto] =
      useRecoilState(atomAwardFocusPhoto)
    const [error, setError] = useState<Error | undefined>(undefined)

    //status更新実行時の処理
    const handleClose = useCallback(async () => {
      try {
        if (
          !awardFocusPhoto ||
          !awardFocusPhoto.contestId ||
          Array.isArray(awardFocusPhoto.contestId)
        )
          throw new Error('渡されたパラメータが正しくありません。')

        await updateContestPhoto(
          awardFocusPhoto.contestId,
          awardFocusPhoto.photo.id,
          nextStatus
        )

        closeModal()
        closeDialog()
        setAwardFocusPhoto(null)
        awardFocusPhoto.mutate()
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('エラーが発生しました。')
        )
      }
    }, [
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
