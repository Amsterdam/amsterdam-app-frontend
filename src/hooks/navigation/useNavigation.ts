import {
  NavigationProp,
  // eslint-disable-next-line no-restricted-imports
  useNavigation as useNavigationOriginal,
} from '@react-navigation/native'
import {RootStackParams} from '@/app/navigation/types'

export const useNavigation = <RouteName extends keyof RootStackParams>() =>
  useNavigationOriginal<NavigationProp<RootStackParams, RouteName>>()
