import { Button, FormControl, Input } from '@chakra-ui/react'
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            type="email"
            placeholder="メールアドレス"
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: '何も入力されていません',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            type="password"
            placeholder="パスワード"
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: '何も入力されていません',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormControl>
        <Button colorScheme="teal" type="submit">
          ログイン
        </Button>
      </form>
    </>
  )
}

export default LoginPage
