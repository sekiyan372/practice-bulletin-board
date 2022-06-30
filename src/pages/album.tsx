import {
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { useFetchAlbum } from '~/hooks/useFetchAlbum'

const Album: NextPage = () => {
  const [data, getData, { loading, error }] = useFetchAlbum()

  useEffect(() => {
    getData()
  }, [getData])

  console.log(data)

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        アルバム管理
      </Heading>
      <Skeleton isLoaded={!loading}>
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
      </Skeleton>
    </>
  )
}

export default Album
