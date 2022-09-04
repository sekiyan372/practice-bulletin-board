import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import type { FC } from 'react'

import type { ContestPhoto } from '~/types/contestTypes'

type Props = {
  photo: ContestPhoto
  isOpen: boolean
  onClose: () => void
}

export const ContestModal: FC<Props> = ({ photo, isOpen, onClose }) => {
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
