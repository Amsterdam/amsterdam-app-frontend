import {useCallback} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {
  ParkingLicensePlate,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
}

export const ParkingSessionSelectLicensePlate = ({setLicensePlate}: Props) => {
  const {close} = useBottomSheet()
  const styles = createStyles()

  const {licensePlates, isLoading: isLoadingLicensePlates} =
    useGetLicensePlates()
  const {parkingSessions, isLoading: isLoadingSessions} = useGetParkingSessions(
    ParkingSessionStatus.active,
  )

  const onPress = useCallback(
    (licensePlate: ParkingLicensePlate) => {
      if (parkingSessions?.[0].vehicle_id === licensePlate.vehicle_id) {
        Alert.alert(
          'Dit kenteken is al actief',
          'Kies een ander kenteken uit de lijst.',
        )

        return
      }

      setLicensePlate(licensePlate)
      close()
    },
    [setLicensePlate, close, parkingSessions],
  )

  if (isLoadingLicensePlates || isLoadingSessions) {
    return <PleaseWait testID="ParkingSessionSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates || !parkingSessions?.length) {
    return (
      <SomethingWentWrong testID="ParkingSessionSelectLicensePlateSomethingWentWrong" />
    )
  }

  return (
    <View style={styles.container}>
      <Column gutter="sm">
        <Title
          level="h5"
          text="Mijn kentekens"
        />
        {licensePlates.length === 0 && (
          <Phrase>U heeft nog geen kentekens opgeslagen.</Phrase>
        )}
        {licensePlates?.map(licensePlate => {
          const title = `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`

          return (
            <TopTaskButton
              accessibilityLabel={`Kenteken ${title}`}
              iconName="parkingCar"
              key={licensePlate.vehicle_id}
              onPress={() => onPress(licensePlate)}
              testID="ParkingSessionSelectLicensePlateTopTaskButton"
              title={title}
            />
          )
        })}
      </Column>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  })
