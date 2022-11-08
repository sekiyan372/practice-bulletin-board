import { Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const ErrorMessage: FC<Props> = ({ children }) => {
  return <Text color="red">{children}</Text>
}
