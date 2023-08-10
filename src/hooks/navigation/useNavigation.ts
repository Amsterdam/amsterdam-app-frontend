// eslint-disable-next-line no-restricted-imports
import {useNavigation as useNavigationOriginal} from '@react-navigation/native'
import {NavigationProp, RootStackParams} from '@/app/navigation/types'

export const useNavigation = <RouteName extends keyof RootStackParams>() =>
  useNavigationOriginal<NavigationProp<RouteName>>()
