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
import type { SetterOrUpdater } from 'recoil'
import { useSetRecoilState } from 'recoil'

import { AlbumModal } from '~/components/Modal'
import { atomFocusPhoto } from '~/recoil'
import type { FocusPhoto } from '~/types/albumTypes'
import type { AlbumPhoto } from '~/types/albumTypes'
import { albumStatus } from '~/types/albumTypes'

type Props = {
  focusPhoto: FocusPhoto
  handleCheck: (
    id: AlbumPhoto['id'],
    imagePath: AlbumPhoto['imagePath']
  ) => void
}

export const AlbumCard: FC<Props> = ({ focusPhoto, handleCheck }) => {
  const { isOpen, onOpen, onClose } = useDisclosure() //モーダルのいろいろ
  //扱う作品をRecoilのグローバルstateに保管する処理
  const setFocusPhoto: SetterOrUpdater<FocusPhoto | null> =
    useSetRecoilState(atomFocusPhoto)
  //扱う作品
  const photo: AlbumPhoto = focusPhoto.photo

  //カードクリック時の処理
  const handleModalClick = useCallback(() => {
    onOpen()
    setFocusPhoto(focusPhoto)
  }, [onOpen, setFocusPhoto, focusPhoto])

  return (
    <Box m="2">
      {photo.status !== albumStatus.PUBLIC && (
        <Checkbox
          onChange={() => handleCheck(photo.id, photo.imagePath)}
          colorScheme="red"
          size="lg"
        />
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
          src={photo.imageUrl}
          alt="Picture of photo contest"
          height="160"
          mx="auto"
          fit="cover"
        />
        <Flex pt="3">
          <Icon as={BsFillPersonFill} my="auto" />
          <Text color="main.orange">{photo.name}</Text>
        </Flex>
        <Text>{dayjs(photo.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>

        <AlbumModal modalState={isOpen} handleClose={onClose} />
      </Box>
    </Box>
  )
}
