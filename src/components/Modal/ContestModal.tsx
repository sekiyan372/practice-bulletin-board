import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ContestConfirmDialog } from '~/components/Modal'
import { atomAwardFocusPhoto } from '~/recoil'
import type { ContestPhoto } from '~/types/contestTypes'
import { contestAward } from '~/types/contestTypes'

type Props = {
  modalState: boolean
  handleClose: () => void
}

export const ContestModal: FC<Props> = memo(({ modalState, handleClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const awardFocusPhoto = useRecoilValue(atomAwardFocusPhoto)
  const [nextStatus, setNextStatus] = useState<ContestPhoto['award']>(
    awardFocusPhoto?.photo.award
      ? awardFocusPhoto.photo.award
      : contestAward.NONE
  )

  //ボタンクリック時の処理
  const handleClick = useCallback(
    (state: ContestPhoto['award']) => {
      setNextStatus(state)
      onOpen()
    },
    [onOpen]
  )

  return (
    <Modal size="5xl" isOpen={modalState} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center" pt="50px">
            <Image
              src={awardFocusPhoto?.photo.imageUrl}
              alt="Picture of photo contest"
              height={480}
              mx="auto"
              my="20px"
            />
            <Box py="10px">
              <Text fontSize="20px" fontWeight="bold" color="gray.800">
                名前
              </Text>
              <Text fontSize="16px" color="gray.600" pb="10px">
                {awardFocusPhoto?.photo.name}
              </Text>
            </Box>
            <Box py="10px">
              <Text fontSize="20px" fontWeight="bold" color="gray.800">
                タイトル
              </Text>
              <Text fontSize="16px" color="gray.600" pb="10px">
                {awardFocusPhoto?.photo.title}
              </Text>
            </Box>
            <Box py="10px">
              <Text fontSize="20px" fontWeight="bold" color="gray.800">
                コメント
              </Text>
              <Text fontSize="16px" color="gray.600" pb="10px">
                {awardFocusPhoto?.photo.comment}
              </Text>
            </Box>

            <Box textAlign="center" py="10">
              {awardFocusPhoto?.photo.award === contestAward.NONE && (
                <Stack
                  direction={['column', 'row']}
                  spacing="10"
                  justify="center"
                >
                  <Button
                    onClick={() => handleClick(contestAward.YUWAKU_BONBORI)}
                    colorScheme="blue"
                    width={{ base: '160px', sm: '210px' }}
                  >
                    湯涌ぼんぼり賞に受賞
                  </Button>
                  <Button
                    onClick={() =>
                      handleClick(contestAward.YUWAKU_HIDDEN_CHARM)
                    }
                    colorScheme="green"
                    width={{ base: '160px', sm: '210px' }}
                  >
                    ゆわく隠れた魅力賞に受賞
                  </Button>
                </Stack>
              )}

              {(awardFocusPhoto?.photo.award === contestAward.YUWAKU_BONBORI ||
                awardFocusPhoto?.photo.award ===
                  contestAward.YUWAKU_HIDDEN_CHARM) && (
                <Button
                  onClick={() => handleClick(contestAward.NONE)}
                  colorScheme="red"
                  width={{ base: '160px', sm: '210px' }}
                >
                  未受賞
                </Button>
              )}
            </Box>
            <ContestConfirmDialog
              nextStatus={nextStatus}
              modalState={isOpen}
              closeModal={handleClose}
              closeDialog={onClose}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
