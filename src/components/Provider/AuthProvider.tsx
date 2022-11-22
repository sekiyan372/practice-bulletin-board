import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, FC, useContext, useEffect, useState } from 'react'

import { auth } from '~/db/firebase'
import type { UserType } from '~/types/auth'

type Props = {
  children: React.ReactNode
}

const AuthContext = createContext<UserType>(null)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user)
      user && router.pathname === '/login' && router.push('/')
    })
    return () => unsubscribed()
  }, [router])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
