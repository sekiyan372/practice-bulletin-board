import { Flex, TabPanel } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { memo } from 'react'

type Props = {
  children: ReactNode
}

export const ManageTabPanel: FC<Props> = memo(({ children }) => {
  return (
    <TabPanel as={Flex} wrap="wrap">
      {children}
    </TabPanel>
  )
})
