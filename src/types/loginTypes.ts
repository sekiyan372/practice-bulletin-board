import type { User } from 'firebase/auth'

export type SignInFormValues = {
  email: string
  password: string
}

export type ResetPasswordFormValues = {
  email: string
}

export type UserType = User | null
