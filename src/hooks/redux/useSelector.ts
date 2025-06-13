import {
  type TypedUseSelectorHook,
  // eslint-disable-next-line no-restricted-imports
  useSelector as useSelectorOriginal,
} from 'react-redux'
import {type RootState} from '@/store/types/rootState'

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal
