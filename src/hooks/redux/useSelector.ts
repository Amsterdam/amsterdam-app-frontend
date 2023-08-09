import {
  TypedUseSelectorHook,
  // eslint-disable-next-line no-restricted-imports
  useSelector as useSelectorOriginal,
} from 'react-redux'
import {RootState} from '@/store/types/rootState'

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal
