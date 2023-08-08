import {useNavigation as useNavigationOriginal} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation/types'

export const useNavigation = <RouteName extends keyof RootStackParams>() =>
  useNavigationOriginal<StackNavigationProp<RootStackParams, RouteName>>()
