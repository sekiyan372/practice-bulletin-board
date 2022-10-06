import { useToast } from '@chakra-ui/react'
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { auth } from '~/database/firebase'
import type {
  ResetPasswordFormValues,
  SignInFormValues,
} from '~/types/loginTypes'

auth.languageCode = 'ja'

export const useLogin = () => {
  const router = useRouter()
  const toast = useToast()
  const [error, setError] = useState<Error | undefined>()

  const signIn = useCallback(
    async (data: SignInFormValues) => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        await router.push('/')
        toast({
          title: 'ログインしました。',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to sing in.'))
      }
    },
    [router, toast]
  )

  const signOut = useCallback(async () => {
    await fbSignOut(auth)
    await router.push('/login')
    toast({
      title: 'ログアウトしました。',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }, [router, toast])

  const resetPassword = useCallback(
    async (data: ResetPasswordFormValues) => {
      try {
        await sendPasswordResetEmail(auth, data.email)
        await router.push('/login')
        toast({
          title: 'メールを送信しました。',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to send reset password email')
        )
      }
    },
    [router, toast]
  )

  return { signIn, signOut, resetPassword, error }
}
