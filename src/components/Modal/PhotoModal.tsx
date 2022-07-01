import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FC, useState } from 'react'

import { ConfirmDialog } from '~/components/Modal'
import type { Album } from '~/types'

type Props = {
  content: Album
  modalState: boolean
  handleClose: () => void
}

export const PhotoModal: FC<Props> = ({ content, modalState, handleClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nextStatus, setNextStatus] = useState<Album['status']>(content.status)

  const handleClick = (state: Album['status']) => {
    setNextStatus(state)
    onOpen()
  }

  return (
    <Modal size="5xl" isOpen={modalState} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center" pt="50px">
            <Image
              src={content.imageUrl}
              alt="Picture of photo contest"
              height={480}
              mx="auto"
            />
            <Text fontSize="20px" fontWeight="bold" color="gray.800" py="10px">
              {content.name}
            </Text>
            <Text fontSize="20px" fontWeight="bold" color="gray.800" py="10px">
              {content.comment}
            </Text>
            <Text fontSize="16px" color="gray.600" pb="10px">
              {content.createdAt.toString()}
            </Text>
            {content.status === 'private' && (
              <ButtonGroup>
                <Button
                  colorScheme="green"
                  onClick={() => handleClick('public')}
                >
                  公開
                </Button>
                <Button colorScheme="red" onClick={() => handleClick('block')}>
                  ブロック
                </Button>
              </ButtonGroup>
            )}
            {(content.status === 'public' || content.status === 'block') && (
              <Button colorScheme="blue" onClick={() => handleClick('private')}>
                非公開
              </Button>
            )}

            <ConfirmDialog
              nextStatus={nextStatus}
              modalState={isOpen}
              handleClose={onClose}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
