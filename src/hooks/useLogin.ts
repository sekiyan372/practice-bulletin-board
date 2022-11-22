import { useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from '~/db/firebase'

export const useLogin = () => {
  const toast = useToast()
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      const signInResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      router.push('/')

      toast({
        title: `${signInResponse.user.email}でログインしました`,
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

  const signOut = () => {
    try {
      fbSignOut(auth)
      router.push('/')

      toast({
        title: 'ログアウトしました',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      const errMassage =
        err instanceof Error ? err.message : 'ログアウトに失敗しました'

      toast({
        title: errMassage,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return { signIn, signOut }
}
