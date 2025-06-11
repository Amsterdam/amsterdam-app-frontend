// eslint-disable-next-line no-restricted-imports
import {useDispatch as useDispatchOriginal} from 'react-redux'
import {type ReduxDispatch} from '@/hooks/redux/types'

export const useDispatch = () => useDispatchOriginal<ReduxDispatch>()
