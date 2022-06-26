import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { FaAward } from 'react-icons/fa'
import { MdPhotoAlbum } from 'react-icons/md'

const Home: NextPage = () => {
  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        撮っテク！管理ページ
      </Heading>
      <Box textAlign="center" pb="12">
        <List spacing="3">
          <ListItem>
            <ListIcon as={MdPhotoAlbum} />
            <NextLink href="/album">アルバム管理</NextLink>
          </ListItem>
          <ListItem>
            <ListIcon as={FaAward} />
            <NextLink href="/contest">フォトコンテスト管理</NextLink>
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Home
