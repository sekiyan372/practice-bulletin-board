import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, FC, useContext, useEffect, useState } from 'react'

import { auth } from '~/db/firebase'

type Props = {
  children: React.ReactNode
}

const AuthContext = createContext<User | null>(null)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      user && router.pathname === '/login' && (await router.push('/'))
    })
    return () => unsubscribed()
  }, [router])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
