import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'

import { PhotoconModal } from '~/components/Modal'
import { Contest } from '~/types'

type Props = {
  contest: Contest
  index: number
}

export const PhotoconCard: FC<Props> = ({ contest, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box textAlign="center" p="10px" pb="50px">
      <Image
        src={contest.image}
        alt="Picture of photo contest"
        height={160}
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

      <PhotoconModal contest={contest} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
