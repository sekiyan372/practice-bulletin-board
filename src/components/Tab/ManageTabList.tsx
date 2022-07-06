import { Tab, TabList, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import { memo } from 'react'

type Props = {
  privateLength: number
  publicLength: number
  blockedLength: number
}

export const ManageTabList: FC<Props> = memo(
  ({ privateLength, publicLength, blockedLength }) => {
    return (
      <TabList>
        <Tab color="gray.800">
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
        <Tab color="gray.800">
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
        <Tab color="gray.800">
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
