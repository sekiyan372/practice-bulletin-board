import { atom } from 'recoil'

import type { FocusPhoto } from '~/types/albumTypes'
import type { AwardPhoto } from '~/types/contestTypes'
import { RecoilAtomKeys } from '~/utils'

export const atomFocusPhoto = atom<FocusPhoto | null>({
  key: RecoilAtomKeys.FOCUS_ALBUM_PHOTO,
  default: null,
})

export const atomAwardPhoto = atom<AwardPhoto | null>({
  key: RecoilAtomKeys.FOCUS_CONTEST_PHOTO,
  default: null,
})
