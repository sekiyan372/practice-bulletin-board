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
import { FC, useCallback } from 'react'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ContestConfirmDialog } from '~/components/Modal'
import { atomAwardPhoto } from '~/recoil'
import type { ContestPhoto } from '~/types/contestTypes'
import { contestAward } from '~/types/contestTypes'

type Props = {
  photo: ContestPhoto
  isOpen: boolean
  onClose: () => void
}

export const ContestModal: FC<Props> = ({ photo, isOpen, onClose }) => {
  const { onOpen } = useDisclosure()
  const awardPhoto = useRecoilValue(atomAwardPhoto)
  const [nextStatus, setNextStatus] = useState<ContestPhoto['award']>(
    awardPhoto?.photo.award ? awardPhoto.photo.award : contestAward.NONE
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
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center" pt="50px">
            <Image
              src={photo.imageUrl}
              alt="Picture of photo contest"
              height={480}
              mx="auto"
            />
            <Text fontSize="20px" fontWeight="bold" color="gray.800" py="10px">
              {photo.name}
            </Text>
            <Text fontSize="16px" color="gray.600" pb="10px">
              {photo.comment}
            </Text>
          </Box>
          <Box textAlign="center" py="10">
            {awardPhoto?.photo.award === contestAward.NONE && (
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
                  onClick={() => handleClick(contestAward.YUWAKU_HIDDEN_CHARM)}
                  colorScheme="green"
                  width={{ base: '160px', sm: '210px' }}
                >
                  ゆわく隠れた魅力賞に受賞
                </Button>
              </Stack>
            )}
            {(awardPhoto?.photo.award === contestAward.YUWAKU_BONBORI ||
              awardPhoto?.photo.award === contestAward.YUWAKU_HIDDEN_CHARM) && (
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
            closeModal={onClose}
            closeDialog={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
