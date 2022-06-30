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
import { FC } from 'react'

import type { Contest } from '~/types'

type Props = {
  contest: Contest
  isOpen: boolean
  onClose: () => void
}

export const PhotoconModal: FC<Props> = ({ contest, isOpen, onClose }) => {
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center" pt="50px">
            <Image
              src={contest.image}
              alt="Picture of photo contest"
              height={480}
              mx="auto"
            />
            <Text fontSize="20px" fontWeight="bold" color="gray.800" py="10px">
              {contest.name}
            </Text>
            <Text fontSize="16px" color="gray.600" pb="10px">
              {contest.comment}
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
