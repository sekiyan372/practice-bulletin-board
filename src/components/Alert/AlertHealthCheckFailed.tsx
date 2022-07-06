import {
  Alert,
  AlertIcon,
  Box,
  CloseButton,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { useEffect } from 'react'

type Props = {
  error: Error | undefined
}

export const AlertHealthCheckFailed: FC<Props> = ({ error }) => {
  const [flag, setFlag] = useBoolean(error !== undefined)

  useEffect(() => {
    if (error !== undefined) setFlag.on()
  }, [error, setFlag])

  return (
    <>
      {flag && (
        <Alert status="error" position="absolute" top="16" left="0" zIndex="10">
          <AlertIcon />
          <Box ml="4">
            <Text>
              データの疎通に失敗しました。サーバー管理元にお問い合わせください。
            </Text>
          </Box>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={setFlag.off}
            _focus={{ boxShadow: 'none' }}
          />
        </Alert>
      )}
    </>
  )
}
