import 'github-markdown-css/github-markdown.css'

import { Box, Heading } from '@chakra-ui/react'
import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
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
