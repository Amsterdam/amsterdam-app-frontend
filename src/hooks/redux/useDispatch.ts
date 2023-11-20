// eslint-disable-next-line no-restricted-imports
import {useDispatch as useDispatchOriginal} from 'react-redux'
import {store} from '@/store/store'

export const useDispatch = () => useDispatchOriginal<typeof store.dispatch>()
