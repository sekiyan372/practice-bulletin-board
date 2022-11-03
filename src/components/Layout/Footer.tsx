import { chakra } from '@chakra-ui/react'
import type { FC } from 'react'
import { memo } from 'react'

export const Footer: FC = memo(() => {
  return (
    <chakra.footer
      display="flex"
      justifyContent="center"
      bg="blue.50"
      color="gray.800"
      fontSize="15px"
      fontWeight="medium"
    >
      © 2022 Suiki Sekiya.
    </chakra.footer>
  )
})
