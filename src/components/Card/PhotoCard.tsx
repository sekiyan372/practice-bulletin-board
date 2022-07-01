import { Box, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'

import { PhotoModal } from '~/components/Modal'
import { Album } from '~/types'

type Props = {
  content: Album
}

export const PhotoCard: FC<Props> = ({ content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      onClick={onOpen}
      width="300px"
      p="10px"
      pb="50px"
      backgroundColor="gray.100"
    >
      <Image
        src={content.imageUrl}
        alt="Picture of photo contest"
        height={160}
        mx="auto"
      />
      <Flex pt="3">
        <Icon as={BsFillPersonFill} my="auto" />
        <Text color="main.orange">{content.name}</Text>
      </Flex>
      <Text>{content.createdAt.toString()}</Text>

      <PhotoModal content={content} modalState={isOpen} handleClose={onClose} />
    </Box>
  )
}
