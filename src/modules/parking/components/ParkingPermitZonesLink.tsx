import {InlineLink} from '@/components/ui/text/InlineLink'
import {TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = {
  text: string
} & TestProps

export const ParkingPermitZonesLink = ({testID, text}: Props) => {
  const {navigate} = useNavigation()

  return (
    <InlineLink
      accessibilityRole="button"
      onPress={() => navigate(ParkingRouteName.parkingPermitZones)}
      testID={testID}>
      {text}
    </InlineLink>
  )
}
