import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ErrorType} from '@/components/ui/feedback/error/types'
import {WasteGuideFigure} from '@/components/ui/media/errors/WasteGuideFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = {
  error: ErrorType
}

export const WasteGuideFullScreenError = ({error}: Props) => {
  const navigation = useNavigation<WasteGuideRouteName>()

  return (
    <FullScreenError
      buttonLabel="Ga terug"
      error={error}
      Image={WasteGuideFigure}
      onPress={() => navigation.goBack()}
      testID="WasteGuideErrorScreen"
      text="Probeer het later nog een keer."
      title="Helaas is de afvalwijzer nu niet beschikbaar"
      TopComponent={
        <ShareLocationTopTaskButton
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
          }
          testID="WasteGuideRequestLocationButton"
        />
      }
    />
  )
}
