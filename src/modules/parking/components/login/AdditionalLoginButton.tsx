import {useCallback} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = Omit<TopTaskButtonProps, 'onPress' | 'iconName' | 'iconSize'>

export const AdditionalLoginButton = (props: Props) => {
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    navigate(ParkingRouteName.login)
  }, [navigate])

  return (
    <TopTaskButton
      iconName="login"
      iconSize="lg"
      onPress={onPress}
      {...props}
    />
  )
}
