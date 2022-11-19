import { Button, FormControl, Input, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { ErrorMessage } from '~/components/Text'
import { signIn } from '~/feature/frontend/auth'

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const toast = useToast()
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { email, password } = values

    try {
      if (typeof email !== 'string' || typeof password !== 'string')
        throw new Error('型が違います')

      const user = await signIn(email, password)

      router.push('/')

      toast({
        title: `${user.email}でログインしました`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      const errMassage =
        err instanceof Error ? err.message : 'ログインに失敗しました'

      toast({
        title: errMassage,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
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
          {errors.email && (
            <ErrorMessage>{errors.email.message?.toString()}</ErrorMessage>
          )}

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
            <ErrorMessage>{errors.password.message?.toString()}</ErrorMessage>
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
