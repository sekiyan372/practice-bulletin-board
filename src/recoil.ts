import { atom } from 'recoil'

import type { FocusAlbum } from '~/types'
import { RecoilAtomKeys } from '~/utils'

export const atomFocusAlbum = atom<FocusAlbum | null>({
  key: RecoilAtomKeys.FOCUS_ALBUM,
  default: null,
})
