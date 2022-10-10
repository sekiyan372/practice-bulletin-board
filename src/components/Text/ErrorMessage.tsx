import { Text } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ErrorMessage: FC<Props> = ({ children }) => {
  return <Text color="red">{children}</Text>
}
