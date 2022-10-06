import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { AlertHealthCheckFailed } from '~/components/Alert'
import { useLogin } from '~/hooks/useLogin'

type FormValues = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormValues>()
  const { signIn, error } = useLogin()

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    (data) => signIn(data),
    [signIn]
  )

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Center m="50px">
        <Box
          border="4px"
          borderColor="main.red"
          borderRadius="10px"
          p="20px"
          w={{ base: '240px', sm: '400px' }}
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
          </form>
        </Box>
      </Center>
    </>
  )
}

export default LoginPage
