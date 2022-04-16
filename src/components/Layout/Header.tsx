import { chakra } from '@chakra-ui/react'
import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <chakra.header bg="main.red" color="white" fontSize="30px" p="10px">
      撮っテク！管理者ページ
    </chakra.header>
  )
}
