import {useCallback, useEffect} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  setIsLoggingIn,
  useParkingAccountIsLoggingIn,
} from '@/modules/parking/slice'

type Props = Omit<TopTaskButtonProps, 'onPress' | 'iconName' | 'iconSize'>

export const AdditionalLoginButton = (props: Props) => {
  const dispatch = useDispatch()
  const {navigate} = useNavigation()
  const isLoggingIn = useParkingAccountIsLoggingIn()

  const onPress = useCallback(() => {
    dispatch(setIsLoggingIn(true))
  }, [dispatch])

  useEffect(() => {
    if (isLoggingIn) {
      navigate(ParkingRouteName.login)
    }
  }, [isLoggingIn, navigate])

  return (
    <TopTaskButton
      iconName="login"
      iconSize="lg"
      onPress={onPress}
      {...props}
    />
  )
}
