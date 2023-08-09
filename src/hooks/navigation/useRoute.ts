// eslint-disable-next-line no-restricted-imports
import {RouteProp, useRoute as useRouteOriginal} from '@react-navigation/native'
import {RootStackParams} from '@/app/navigation/types'

export const useRoute = <RouteName extends keyof RootStackParams>() =>
  useRouteOriginal<RouteProp<RootStackParams, RouteName>>()
