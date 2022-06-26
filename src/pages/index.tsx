import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FaAward } from 'react-icons/fa'
import { MdPhotoAlbum } from 'react-icons/md'

const Home: NextPage = () => {
  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        撮っテク！管理ページ
      </Heading>
      <Box textAlign="center">
        <List spacing={3}>
          <ListItem>
            <ListIcon as={MdPhotoAlbum} />
            <Link href="/album">アルバム管理</Link>
          </ListItem>
          <ListItem>
            <ListIcon as={FaAward} />
            <Link href="/contest">フォトコンテスト管理</Link>
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Home
