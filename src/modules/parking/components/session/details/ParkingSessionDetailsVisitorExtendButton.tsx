import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingApiVersion, ParkingSession} from '@/modules/parking/types'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingSessionDetailsVisitorExtendButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()
  const apiVersion = useCurrentParkingApiVersion()

  const onPress = useCallback(() => {
    navigate(
      apiVersion === ParkingApiVersion.v2
        ? ParkingRouteName.visitorEditSession
        : ParkingRouteName.editSession,
      {
        parkingSession,
      },
    )
  }, [apiVersion, navigate, parkingSession])

  return (
    <Button
      label="Verleng parkeersessie"
      onPress={onPress}
      testID="ParkingSessionDetailsVisitorExtendButton"
      variant="secondary"
    />
  )
}
