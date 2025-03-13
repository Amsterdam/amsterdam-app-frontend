import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'

type Props = {
  variant?: AlertVariant
}

export const ParkingMaxLicensePlatesAlert = ({variant}: Props) => (
  <AlertBase
    hasIcon
    testID="ParkingMaxLicensePlatesAlert"
    text={`Er kunnen niet meer dan ${MAX_LICENSE_PLATES} kentekens worden opgeslagen.`}
    title="Maximum aantal kentekens"
    variant={variant}
  />
)
