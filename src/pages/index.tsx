import 'github-markdown-css/github-markdown.css'

import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { FaAward } from 'react-icons/fa'
import { MdPhotoAlbum } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'

type Props = {
  topMd: string
}

const Home: NextPage<Props> = ({ topMd }) => {
  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        撮っテク！管理者ページ
      </Heading>
      <Box textAlign="center" mx="auto" color="white">
        <List
          spacing="6"
          display="inline-block"
          p="6"
          borderRadius="6"
          backgroundColor="main.red"
        >
          <ListItem fontSize="20" _hover={{ opacity: 0.5 }}>
            <ListIcon as={MdPhotoAlbum} />
            <NextLink href="/album">アルバム管理</NextLink>
          </ListItem>
          <ListItem fontSize="20" _hover={{ opacity: 0.5 }}>
            <ListIcon as={FaAward} />
            <NextLink href="/contest">フォトコンテスト管理</NextLink>
          </ListItem>
        </List>
      </Box>
      <Box p="12">
        <ReactMarkdown className="markdown-body">{topMd}</ReactMarkdown>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const topMd: string = fs.readFileSync(
    `${process.cwd()}/public/top.md`,
    'utf8'
  )
  return {
    props: {
      topMd: topMd,
    },
  }
}

export default Home
