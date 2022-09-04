import { atom } from 'recoil'

import type { FocusPhoto } from '~/types/albumTypes'
import { RecoilAtomKeys } from '~/utils'

export const atomFocusPhoto = atom<FocusPhoto | null>({
  key: RecoilAtomKeys.FOCUS_ALBUM_PHOTO,
  default: null,
})
