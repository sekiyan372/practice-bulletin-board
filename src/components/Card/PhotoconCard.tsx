import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import type { FC } from 'react'

import { Photocon } from '~/types'

type Props = {
  photocon: Photocon
  index: number
}

export const PhotoconCard: FC<Props> = ({ photocon, index }) => {
  console.log(photocon.image)
  return (
    <Box textAlign="center" p="10px">
      <Text fontSize="30px" fontWeight="bold">
        {index}
      </Text>
      <Box border="2px" borderColor="main.red" p="5px">
        <Image
          src={photocon.image}
          alt="Picture of photo contest"
          height={200}
          width={350}
          // layout="fill"
          // objectFit="contain"
        />
        <Text fontSize="20px" color="gray.800">
          {photocon.name}
        </Text>
        <Text fontSize="16px" color="gray.600">
          {photocon.comment}
        </Text>
      </Box>
    </Box>
  )
}
