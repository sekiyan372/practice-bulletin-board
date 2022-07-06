import { Button } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import { MdDelete } from 'react-icons/md'

type Props = {
  children: ReactNode
}

export const DeleteContentsButton: FC<Props> = memo(({ children }) => {
  return (
    <Button leftIcon={<MdDelete />} colorScheme="red" ml="auto">
      {children}
    </Button>
  )
})
