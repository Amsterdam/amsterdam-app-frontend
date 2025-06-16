import {useCallback} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {useShouldShowLoginScreen} from '@/modules/parking/hooks/useShouldShowLoginScreen'
import {useIsLoggingInAdditionalAccount} from '@/modules/parking/slice'

type Props = Omit<TopTaskButtonProps, 'onPress' | 'iconName' | 'iconSize'>

export const AdditionalLoginButton = (props: Props) => {
  const {setIsLoggingInAdditionalAccount} = useIsLoggingInAdditionalAccount()
  const {setShouldShowLoginScreen} = useShouldShowLoginScreen()

  const onPress = useCallback(() => {
    setIsLoggingInAdditionalAccount(true)
    setShouldShowLoginScreen(true)
  }, [setIsLoggingInAdditionalAccount, setShouldShowLoginScreen])

  return (
    <TopTaskButton
      iconName="login"
      iconSize="lg"
      onPress={onPress}
      {...props}
    />
  )
}
