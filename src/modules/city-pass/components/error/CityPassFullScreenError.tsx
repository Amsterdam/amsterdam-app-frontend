import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ErrorType} from '@/components/ui/feedback/error/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {FullScreenErrorFigure} from '@/modules/city-pass/components/error/FullScreenErrorFigure'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'

type Props = {
  error: ErrorType
  retryFn: () => void
}

export const CityPassFullScreenError = ({error, retryFn}: Props) => {
  const isInternetReachable = useSelector(selectIsInternetReachable)

  if (isInternetReachable === false) {
    return <NoInternetErrorFullScreen />
  }

  return (
    <FullScreenError
      buttonLabel="Laad opnieuw"
      error={error}
      Image={FullScreenErrorFigure}
      onPress={retryFn}
      testID="CityPassBudgetErrorScreen"
      title="Helaas kunnen de Stadspas gegevens niet geladen worden"
    />
  )
}
