import {
  Box,
  Button,
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
import { memo } from 'react'
import { BsFillCameraFill } from 'react-icons/bs'
import { FaAward, FaHome } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdLocationPin, MdPhotoAlbum } from 'react-icons/md'

import { useAuthContext } from '~/components/Provider'
import { useLogin } from '~/hooks/useLogin'
import { UserType } from '~/types/loginTypes'

import { HeaderLink, HeaderMenuLink } from './HeaderLink'

const links = [
  { href: '/', icon: FaHome, text: 'ホーム' },
  { href: '/photo-rally', icon: BsFillCameraFill, text: 'フォトラリー' },
  { href: '/contest', icon: FaAward, text: 'コンテスト' },
  { href: '/album', icon: MdPhotoAlbum, text: 'アルバム' },
  { href: '/spot', icon: MdLocationPin, text: 'スポット' },
]

export const Header: FC = memo(() => {
  const { signOut } = useLogin()
  const user: UserType = useAuthContext()

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
      {user === null ? (
        <NextLink href="/login">
          <Button bgColor="main.red" border="1px" borderColor="white">
            ログイン
          </Button>
        </NextLink>
      ) : (
        <>
          <Box gap="2" display={{ base: 'none', lg: 'block' }}>
            {links.map((link) => (
              <HeaderLink {...link} key={link.text} />
            ))}
            <Button
              onClick={() => signOut()}
              bgColor="main.red"
              border="1px"
              borderColor="white"
            >
              ログアウト
            </Button>
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
              {links.map((link) => (
                <HeaderMenuLink {...link} key={link.text} />
              ))}
              <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  )
})
