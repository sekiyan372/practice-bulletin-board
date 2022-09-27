import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'

import { ContestModal } from '~/components/Modal'
import { ContestPhoto } from '~/types/contestTypes'

type Props = {
  photo: ContestPhoto
  index: number
}

export const ContestCard: FC<Props> = ({ photo, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box textAlign="center" p="10px" pb="50px">
      <Image
        src={photo.imageUrl}
        alt="Picture of photo contest"
        height="160"
        onClick={onOpen}
        _hover={{
          cursor: 'pointer',
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.24)',
          transform: 'translate(0, -4px)',
        }}
      />
      <Text fontSize="30px" fontWeight="bold" color="gray.600">
        {index}
      </Text>

      <ContestModal photo={photo} modalState={isOpen} handleClose={onClose} />
    </Box>
  )
}
