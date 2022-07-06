import { chakra } from '@chakra-ui/react'
import type { FC } from 'react'
import { memo } from 'react'

export const Footer: FC = memo(() => {
  return (
    <chakra.footer
      display="flex"
      justifyContent="center"
      bg="main.red"
      color="white"
      fontSize="15px"
      fontWeight="medium"
    >
      © 2022 Tourism Project.
    </chakra.footer>
  )
})
