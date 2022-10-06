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
import type { SignInFormValues } from '~/types/loginTypes'

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInFormValues>()
  const { signIn, error } = useLogin()

  const onSubmit = useCallback<SubmitHandler<SignInFormValues>>(
    (data) => signIn(data),
    [signIn]
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
            ログイン
          </Heading>
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

              <Box py="20px">
                <FormLabel htmlFor="password" color="gray.800">
                  password
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...register('password')}
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
                ログイン
              </Button>
            </Center>

            <Center>
              <NextLink href="/login/reset">
                <Text
                  color="gray.800"
                  _hover={{ cursor: 'pointer', opacity: 0.5 }}
                >
                  パスワードを忘れた
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
