import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {store} from '@/store/store'
import {RootState} from '@/store/types/rootState'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
