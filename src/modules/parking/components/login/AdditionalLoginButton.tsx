import {useCallback} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {useShouldShowLoginScreen} from '@/modules/parking/hooks/useShouldShowLoginScreen'
import {useIsLoggingInAdditional} from '@/modules/parking/slice'

type Props = Omit<TopTaskButtonProps, 'onPress' | 'iconName' | 'iconSize'>

export const AdditionalLoginButton = (props: Props) => {
  const {setIsLoggingInAdditional} = useIsLoggingInAdditional()
  const {setShouldShowLoginScreen} = useShouldShowLoginScreen()

  const onPress = useCallback(() => {
    setIsLoggingInAdditional(true)
    setShouldShowLoginScreen(true)
  }, [setIsLoggingInAdditional, setShouldShowLoginScreen])

  return (
    <TopTaskButton
      iconName="login"
      iconSize="lg"
      onPress={onPress}
      {...props}
    />
  )
}
