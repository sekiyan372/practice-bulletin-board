import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import type { FC } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export const Header: FC = () => {
  return (
    <Flex
      bg="main.red"
      color="white"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p="4"
    >
      <Heading fontSize="30px">
        <NextLink href="/">撮っテク！管理者ページ</NextLink>
      </Heading>

      <Spacer />
      <Box gap="2" display={{ base: 'none', lg: 'block' }}>
        <Box display="inline-block" px="10">
          <NextLink href="/">ホーム</NextLink>
        </Box>
        <Box display="inline-block" px="10">
          <NextLink href="/album">アルバム</NextLink>
        </Box>
        <Box display="inline-block" px="10">
          <NextLink href="/contest">フォトコンテスト</NextLink>
        </Box>
      </Box>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<GiHamburgerMenu />}
          variant="outline"
          display={{ base: 'flex', lg: 'none' }}
        />
        <MenuList color="black">
          <MenuItem>
            <NextLink href="/">ホーム</NextLink>
          </MenuItem>
          <MenuItem>
            <NextLink href="/album">アルバム</NextLink>
          </MenuItem>
          <MenuItem>
            <NextLink href="/contest">フォトコンテスト</NextLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
