import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ErrorType} from '@/components/ui/feedback/error/types'
import {FullScreenErrorFigure} from '@/modules/city-pass/components/error/FullScreenErrorFigure'

type Props = {
  error: ErrorType
  retryFn: () => void
}

export const CityPassFullScreenError = ({error, retryFn}: Props) => (
  <FullScreenError
    buttonLabel="Laad opnieuw"
    error={error}
    Image={FullScreenErrorFigure}
    onPress={retryFn}
    testID="CityPassBudgetErrorScreen"
    title="Helaas kunnen de Stadspas gegevens niet geladen worden"
  />
)
