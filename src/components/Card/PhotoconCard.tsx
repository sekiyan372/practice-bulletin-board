import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'

import { PhotoconModal } from '~/components/Modal'
import { Photocon } from '~/types'

type Props = {
  photocon: Photocon
  index: number
}

export const PhotoconCard: FC<Props> = ({ photocon, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box textAlign="center" p="10px" pb="50px">
      <Image
        src={photocon.image}
        alt="Picture of photo contest"
        height={200}
        onClick={onOpen}
      />
      <Text fontSize="30px" fontWeight="bold">
        {index}
      </Text>

      <PhotoconModal photocon={photocon} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
