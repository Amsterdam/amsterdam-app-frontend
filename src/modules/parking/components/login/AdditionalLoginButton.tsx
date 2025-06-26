import {useCallback} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setIsLoggingIn} from '@/modules/parking/slice'

type Props = Omit<TopTaskButtonProps, 'onPress' | 'iconName' | 'iconSize'>

export const AdditionalLoginButton = (props: Props) => {
  const dispatch = useDispatch()

  const onPress = useCallback(() => {
    dispatch(setIsLoggingIn(true))
  }, [dispatch])

  return (
    <TopTaskButton
      iconName="login"
      iconSize="lg"
      onPress={onPress}
      {...props}
    />
  )
}
