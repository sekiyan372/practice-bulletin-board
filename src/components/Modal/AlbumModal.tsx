import {
  Box,
  Button,
  Heading,
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
import dayjs from 'dayjs'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { AlbumConfirmDialog } from '~/components/Modal'
import { atomFocusPhoto } from '~/recoil'
import type { AlbumPhoto } from '~/types/albumTypes'
import { albumStatus } from '~/types/albumTypes'

type Props = {
  modalState: boolean
  handleClose: () => void
}

export const AlbumModal: FC<Props> = memo(({ modalState, handleClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure() //モーダルのいろいろ
  const focusPhoto = useRecoilValue(atomFocusPhoto) //現在扱っている作品
  //更新するした場合の次のstatus
  const [nextStatus, setNextStatus] = useState<AlbumPhoto['status']>(
    focusPhoto?.photo.status ? focusPhoto.photo.status : albumStatus.PRIVATE
  )

  //ボタンクリック時の処理
  const handleClick = useCallback(
    (state: AlbumPhoto['status']) => {
      setNextStatus(state)
      onOpen()
    },
    [setNextStatus, onOpen]
  )

  return (
    <Modal size="5xl" isOpen={modalState} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box color="gray.800">
            <Image
              src={focusPhoto?.photo.imageUrl}
              alt="Picture of photo contest"
              height={{ base: '200', sm: '320', md: '600' }}
              mx="auto"
              my="10"
              fit="cover"
            />

            <Stack
              direction="column"
              px={{ base: 2, sm: 10, md: 20, lg: 40 }}
              spacing="2"
            >
              <Box py="2">
                <Heading fontSize="xl">投稿者</Heading>
                <Text color="gray.800">{focusPhoto?.photo.name}</Text>
              </Box>
              <Box py="2">
                <Heading fontSize="xl">コメント</Heading>
                <Text color="gray.800">{focusPhoto?.photo.comment}</Text>
              </Box>
              <Box py="2">
                <Heading fontSize="xl">投稿日時</Heading>
                <Text color="gray.600">
                  {dayjs(focusPhoto?.photo.createdAt).format(
                    'YYYY/MM/DD HH:mm:ss'
                  )}
                </Text>
              </Box>
            </Stack>

            <Box textAlign="center" py="10">
              {focusPhoto?.photo.status === albumStatus.PRIVATE && (
                <Stack
                  direction={['column', 'row']}
                  spacing="10"
                  justify="center"
                >
                  <Button
                    onClick={() => handleClick(albumStatus.PUBLIC)}
                    colorScheme="green"
                    width={{ base: '240px', sm: '320px' }}
                  >
                    公開
                  </Button>
                  <Button
                    onClick={() => handleClick(albumStatus.BLOCK)}
                    colorScheme="red"
                    width={{ base: '240px', sm: '320px' }}
                  >
                    ブロック
                  </Button>
                </Stack>
              )}
              {(focusPhoto?.photo.status === albumStatus.PUBLIC ||
                focusPhoto?.photo.status === albumStatus.BLOCK) && (
                <Button
                  onClick={() => handleClick(albumStatus.PRIVATE)}
                  colorScheme="blue"
                  width={{ base: '240px', sm: '320px' }}
                >
                  未公開
                </Button>
              )}
            </Box>

            <AlbumConfirmDialog
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
