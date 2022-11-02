import type { KeyedMutator } from 'swr'

export type Contest = {
  id: string
  ja: {
    name: string
    imagePath: string
    imageUrl: string
  }
  en: {
    name: string
    imagePath: string
    imageUrl: string
  }
  startAt: Date
  endAt: Date
  publishAt: Date
  createdAt: Date
  updatedAt: Date
}

export const contestAward = {
  NONE: '未受賞',
  YUWAKU_BONBORI: '湯涌ぼんぼり賞',
  YUWAKU_HIDDEN_CHARM: 'ゆわく隠れた魅力賞',
} as const
export type ContestAward = typeof contestAward[keyof typeof contestAward]
export const contestAwardArray = Object.values(contestAward)

export type ContestPhoto = {
  id: string
  imagePath: string
  imageUrl: string
  title: string
  comment: string
  name: string
  email: string
  award: ContestAward
  createdAt: Date
  updatedAt: Date
}

export type AwardFocusPhoto = {
  contestId: string | string[] | undefined
  photo: ContestPhoto
  mutate: KeyedMutator<ContestPhoto[]>
}
