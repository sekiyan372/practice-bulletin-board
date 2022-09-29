import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'
import { FC, useCallback } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'

import { ContestModal } from '~/components/Modal'
import { atomAwardFocusPhoto } from '~/recoil'
import { AwardFocusPhoto, ContestPhoto } from '~/types/contestTypes'

type Props = {
  awardFocusPhoto: AwardFocusPhoto
  index: number
}

export const ContestCard: FC<Props> = ({ awardFocusPhoto, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const setAwardPhoto: SetterOrUpdater<AwardFocusPhoto | null> =
    useSetRecoilState(atomAwardFocusPhoto)
  const photo: ContestPhoto = awardFocusPhoto.photo

  const handleModalClick = useCallback(() => {
    onOpen()
    setAwardPhoto(awardFocusPhoto)
  }, [onOpen, setAwardPhoto, awardFocusPhoto])

  return (
    <Box>
      <Box textAlign="center" p="10px" pb="50px" onClick={handleModalClick}>
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

        <ContestModal modalState={isOpen} handleClose={onClose} />
      </Box>
    </Box>
  )
}
