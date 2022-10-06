import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { useLogin } from '~/hooks/useLogin'
import { ResetPasswordFormValues } from '~/types/loginTypes'

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormValues>()
  const { resetPassword, error } = useLogin()

  const onSubmit = useCallback<SubmitHandler<ResetPasswordFormValues>>(
    (data) => resetPassword(data),
    [resetPassword]
  )

  return (
    <>
      <AlertHealthCheckFailed error={error} />

      <Center m={{ base: '20px', sm: '50px' }}>
        <Box
          border="4px"
          borderColor="main.red"
          borderRadius="10px"
          p="20px"
          w={{ base: '240px', sm: '500px' }}
        >
          <Heading textAlign="center" m="20px" color="gray.800">
            パスワードのリセット
          </Heading>
          <Text>
            メールアドレスを入力して送信すると、入力したアドレスにパスワード再設定用のメールが届きます。
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Box py="20px">
                <FormLabel htmlFor="email" color="gray.800">
                  email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register('email')}
                />
              </Box>
            </FormControl>

            <Center py="20px">
              <Button
                type="submit"
                isLoading={isSubmitting}
                backgroundColor="main.red"
                color="white"
              >
                送信
              </Button>
            </Center>

            <Center>
              <NextLink href="/login">
                <Text
                  color="gray.800"
                  _hover={{ cursor: 'pointer', opacity: 0.5 }}
                >
                  ログイン画面へ
                </Text>
              </NextLink>
            </Center>
          </form>
        </Box>
      </Center>
    </>
  )
}

export default LoginPage
