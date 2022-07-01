import { Box, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import dayjs from 'dayjs'
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
      width="240px"
      p="10px"
      backgroundColor="gray.100"
      color="gray.800"
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
      <Text>{dayjs(content.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>

      <PhotoModal content={content} modalState={isOpen} handleClose={onClose} />
    </Box>
  )
}
