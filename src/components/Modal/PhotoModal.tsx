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
} from '@chakra-ui/react'
import { FC } from 'react'

import type { Album } from '~/types'

type Props = {
  content: Album
  isOpen: boolean
  onClose: () => void
}

export const PhotoModal: FC<Props> = ({ content, isOpen, onClose }) => {
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
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
                <Button colorScheme="green">公開</Button>
                <Button colorScheme="red">ブロック</Button>
              </ButtonGroup>
            )}
            {(content.status === 'public' || content.status === 'block') && (
              <Button colorScheme="blue">非公開</Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
