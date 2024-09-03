import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {
  ErrorType,
  FullScreenError,
} from '@/components/ui/layout/FullScreenError'
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
      testProps={{
        testID: 'CityPassBudgetErrorScreen',
      }}
      title="Helaas kunnen de Stadspas gegevens niet geladen worden"
    />
  )
}
