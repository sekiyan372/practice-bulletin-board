import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { auth } from '~/database/firebase'

type FormValues = {
  email: string
  password: string
}

export const useLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<Error | undefined>()

  const signIn = useCallback(
    async (data: FormValues) => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password)
        await router.push('/')
      } catch (err) {
        setError(new Error('Failed to sing in.'))
      }
    },
    [router]
  )

  const signOut = useCallback(async () => {
    await fbSignOut(auth)
    await router.push('/login')
  }, [router])

  return { signIn, signOut, error }
}
