import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import type { NextPage } from 'next'

const Album: NextPage = () => {
  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        アルバム管理
      </Heading>
      <Tabs variant="enclosed" px="50" pb="10">
        <TabList>
          <Tab>未公開</Tab>
          <Tab>公開</Tab>
          <Tab>ブロック</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>未公開画像</TabPanel>
          <TabPanel>公開画像</TabPanel>
          <TabPanel>ブロック画像</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Album
