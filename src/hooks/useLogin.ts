import { useToast } from '@chakra-ui/react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { auth } from '~/db/firebase'

type UseLoginReturn = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useLogin = (): UseLoginReturn => {
  const toast = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => setUser(userData))
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const signInResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(signInResponse.user)
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

  const signOut = async () => {
    try {
      await fbSignOut(auth)
      setUser(null)
      router.push('/login')

      toast({
        title: 'ログアウトしました。',
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

  return { user, signIn, signOut }
}
