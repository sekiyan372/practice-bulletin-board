import type { Unsubscribe, User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { auth } from '~/database/firebase'

type UserType = User | null

type Props = {
  children: ReactNode
}

const AuthContext = createContext<UserType>(null)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType>(auth.currentUser)

  const isAvailableForViewing = useMemo(
    () => router.pathname === '/login',
    [router]
  )

  useEffect(() => {
    const authStateChanged: Unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user)
        !user && !isAvailableForViewing && (await router.push('/login'))
        user && isAvailableForViewing && (await router.push('/'))
      }
    )
    return () => {
      authStateChanged()
    }
  }, [router, isAvailableForViewing])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
