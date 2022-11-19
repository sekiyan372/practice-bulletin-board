import { Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'

import { logOut } from '~/feature/frontend/auth'

export const Header: FC = memo(() => {
  return (
    <Flex
      bg="blue.50"
      color="gray.800"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p={{ base: 2, sm: 4 }}
    >
      <Heading fontSize={{ base: '15px', sm: '30px' }}>
        <NextLink href="/">ガバガバ掲示板</NextLink>
      </Heading>

      <Spacer />

      <NextLink href="/login">
        <Button>管理者ログイン</Button>
      </NextLink>
      <Button onClick={() => logOut()}>ログアウト</Button>
    </Flex>
  )
})
