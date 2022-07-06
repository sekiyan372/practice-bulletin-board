import {
  Box,
  Checkbox,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useCallback } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useSetRecoilState } from 'recoil'

import { AlbumModal } from '~/components/Modal'
import { atomFocusAlbum } from '~/recoil'
import type { FocusAlbum } from '~/types'
import { AlbumStatus } from '~/types'

type Props = {
  focusAlbum: FocusAlbum
}

export const AlbumCard: FC<Props> = ({ focusAlbum }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const setFocusAlbum = useSetRecoilState(atomFocusAlbum)

  const handleModalClick = useCallback(() => {
    onOpen()
    setFocusAlbum(focusAlbum)
  }, [onOpen, setFocusAlbum, focusAlbum])

  return (
    <Box m="2">
      {focusAlbum.album.status !== AlbumStatus.PUBLIC && (
        <Checkbox colorScheme="red" size="lg" />
      )}
      <Box
        onClick={handleModalClick}
        width="240px"
        p="2"
        backgroundColor="gray.100"
        color="gray.800"
        _hover={{
          cursor: 'pointer',
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.24)',
          transform: 'translate(0, -4px)',
        }}
      >
        <Image
          src={focusAlbum.album.imageUrl}
          alt="Picture of photo contest"
          height="160"
          mx="auto"
          fit="cover"
        />
        <Flex pt="3">
          <Icon as={BsFillPersonFill} my="auto" />
          <Text color="main.orange">{focusAlbum.album.name}</Text>
        </Flex>
        <Text>
          {dayjs(focusAlbum.album.createdAt).format('YYYY/MM/DD HH:mm:ss')}
        </Text>

        <AlbumModal modalState={isOpen} handleClose={onClose} />
      </Box>
    </Box>
  )
}
