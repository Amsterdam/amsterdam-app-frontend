import {type AnyAction, type Store} from '@reduxjs/toolkit'
// eslint-disable-next-line no-restricted-imports
import {useStore as useStoreOriginal} from 'react-redux'
import {type RootState} from '@/store/types/rootState'

export const useStore: () => Store<RootState, AnyAction> = useStoreOriginal
