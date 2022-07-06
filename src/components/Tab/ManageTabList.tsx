import { Tab, TabList, Text } from '@chakra-ui/react'
import type { Dispatch, FC, SetStateAction } from 'react'
import { memo } from 'react'

import { AlbumStatus } from '~/types'

type Props = {
  privateLength: number
  publicLength: number
  blockedLength: number
  handleSelected: Dispatch<SetStateAction<AlbumStatus>>
}

export const ManageTabList: FC<Props> = memo(
  ({ privateLength, publicLength, blockedLength, handleSelected }) => {
    return (
      <TabList>
        <Tab
          color="gray.800"
          onClick={() => handleSelected(AlbumStatus.PRIVATE)}
        >
          未公開
          <Text
            display="inline"
            backgroundColor="blue.500"
            color="white"
            px="2"
            ml="1"
            borderRadius="50"
          >
            {privateLength}
          </Text>
        </Tab>
        <Tab
          color="gray.800"
          onClick={() => handleSelected(AlbumStatus.PUBLIC)}
        >
          公開
          <Text
            display="inline"
            backgroundColor="green.500"
            color="white"
            px="2"
            ml="1"
            borderRadius="50"
          >
            {publicLength}
          </Text>
        </Tab>
        <Tab color="gray.800" onClick={() => handleSelected(AlbumStatus.BLOCK)}>
          ブロック
          <Text
            display="inline"
            backgroundColor="red.500"
            color="white"
            px="2"
            ml="1"
            borderRadius="50"
          >
            {blockedLength}
          </Text>
        </Tab>
      </TabList>
    )
  }
)
