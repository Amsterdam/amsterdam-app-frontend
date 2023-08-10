// eslint-disable-next-line no-restricted-imports
import {useRoute as useRouteOriginal} from '@react-navigation/native'
import {RootStackParams, RouteProp} from '@/app/navigation/types'

export const useRoute = <RouteName extends keyof RootStackParams>() =>
  useRouteOriginal<RouteProp<RouteName>>()
