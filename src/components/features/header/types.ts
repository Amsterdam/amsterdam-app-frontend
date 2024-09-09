import {StackHeaderProps} from '@react-navigation/stack'
import {ViewStyle} from 'react-native'
import {
  HeaderContentOptions,
  NavigationProp,
  RootStackParams,
} from '@/app/navigation/types'

export type HeaderProps = {
  back?: {onPress?: () => void} & Partial<StackHeaderProps['back']>
  backgroundColor?: ViewStyle['backgroundColor']
  navigation:
    | StackHeaderProps['navigation']
    | NavigationProp<keyof RootStackParams>
  options?: StackHeaderProps['options'] & HeaderContentOptions
  route: StackHeaderProps['route']
}
