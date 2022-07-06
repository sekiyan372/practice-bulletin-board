import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'
import { FaAward, FaHome } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdPhotoAlbum } from 'react-icons/md'

export const Header: FC = memo(() => {
  return (
    <Flex
      bg="main.red"
      color="white"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p={{ base: 2, sm: 4 }}
    >
      <Heading fontSize={{ base: '15px', sm: '30px' }}>
        <NextLink href="/">撮っテク！管理者ページ</NextLink>
      </Heading>

      <Spacer />
      <Box gap="2" display={{ base: 'none', lg: 'block' }}>
        <Box display="inline-block" px="10">
          <Icon as={FaHome} />
          <NextLink href="/">ホーム</NextLink>
        </Box>
        <Box display="inline-block" px="10">
          <Icon as={MdPhotoAlbum} />
          <NextLink href="/album">アルバム</NextLink>
        </Box>
        <Box display="inline-block" px="10">
          <Icon as={FaAward} />
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
          <NextLink href="/" passHref>
            <MenuItem icon={<FaHome />}>ホーム</MenuItem>
          </NextLink>
          <NextLink href="/album" passHref>
            <MenuItem icon={<MdPhotoAlbum />}>アルバム</MenuItem>
          </NextLink>
          <NextLink href="/contest" passHref>
            <MenuItem icon={<FaAward />}>フォトコンテスト</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Flex>
  )
})
