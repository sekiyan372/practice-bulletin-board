import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ErrorMessage } from '~/components/Text'
import { useLogin } from '~/hooks/useLogin'

type FormValues = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })

  const { signIn } = useLogin()

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { email, password } = values
    signIn(email, password)
  }

  return (
    <>
      <Box border="1px" m="10" p="10">
        <Heading textAlign="center" pb="8">
          ログイン
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Input
              type="email"
              placeholder="メールアドレス"
              id="email"
              m="2"
              {...register('email', {
                required: {
                  value: true,
                  message: '何も入力されていません',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>
            )}

            <Input
              type="password"
              placeholder="パスワード"
              id="password"
              m="2"
              {...register('password', {
                required: {
                  value: true,
                  message: '何も入力されていません',
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message?.toString()}</ErrorMessage>
            )}
          </FormControl>
          <Box textAlign="center">
            <Button colorScheme="teal" type="submit">
              ログイン
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default LoginPage
