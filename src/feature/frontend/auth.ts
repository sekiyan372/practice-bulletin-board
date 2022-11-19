import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

import { auth } from '~/db/firebase'

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  const signInResponse = await signInWithEmailAndPassword(auth, email, password)
  return signInResponse.user
}

export const logOut = async () => {
  signOut(auth)
}
