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
import { FC, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ConfirmDialog } from '~/components/Modal'
import { atomFocusAlbum } from '~/recoil'
import type { Album } from '~/types'

type Props = {
  modalState: boolean
  handleClose: () => void
}

export const PhotoModal: FC<Props> = ({ modalState, handleClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const focusAlbum = useRecoilValue(atomFocusAlbum)
  const [nextStatus, setNextStatus] = useState<Album['status']>(
    focusAlbum?.album.status ? focusAlbum.album.status : 'private'
  )

  const handleClick = useCallback(
    (state: Album['status']) => {
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
              src={focusAlbum?.album.imageUrl}
              alt="Picture of photo contest"
              height={600}
              mx="auto"
              my="10"
            />

            <Stack
              direction="column"
              px={{ base: 2, sm: 10, md: 20, lg: 40 }}
              spacing="2"
            >
              <Box py="2">
                <Heading fontSize="xl">投稿者</Heading>
                <Text color="gray.800">{focusAlbum?.album.name}</Text>
              </Box>
              <Box py="2">
                <Heading fontSize="xl">コメント</Heading>
                <Text color="gray.800">{focusAlbum?.album.comment}</Text>
              </Box>
              <Box py="2">
                <Heading fontSize="xl">投稿日時</Heading>
                <Text color="gray.600">
                  {dayjs(focusAlbum?.album.createdAt).format(
                    'YYYY/MM/DD HH:mm:ss'
                  )}
                </Text>
              </Box>
            </Stack>

            <Box textAlign="center" py="10">
              {focusAlbum?.album.status === 'private' && (
                <Stack
                  direction={['column', 'row']}
                  spacing="10"
                  justify="center"
                >
                  <Button
                    onClick={() => handleClick('public')}
                    colorScheme="green"
                    width={{ base: '240px', sm: '320px' }}
                  >
                    公開
                  </Button>
                  <Button
                    onClick={() => handleClick('block')}
                    colorScheme="red"
                    width={{ base: '240px', sm: '320px' }}
                  >
                    ブロック
                  </Button>
                </Stack>
              )}
              {(focusAlbum?.album.status === 'public' ||
                focusAlbum?.album.status === 'block') && (
                <Button
                  onClick={() => handleClick('private')}
                  colorScheme="blue"
                  width={{ base: '240px', sm: '320px' }}
                >
                  未公開
                </Button>
              )}
            </Box>

            <ConfirmDialog
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
}
