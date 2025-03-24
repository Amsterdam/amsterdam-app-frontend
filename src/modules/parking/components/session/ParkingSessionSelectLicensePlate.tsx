import {useCallback, useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSessionSelectLicensePlate = () => {
  const {close} = useBottomSheet()
  const styles = createStyles()
  const {addLicensePlate} = useContext(ParkingSessionContext)
  const {licensePlates, isLoading} = useGetLicensePlates()

  const onPress = useCallback(
    (licensePlate: ParkingLicensePlate) => {
      addLicensePlate(licensePlate)
      close()
    },
    [addLicensePlate, close],
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates) {
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
          <Phrase>U heeft nog geen favoriete kentekens opgeslagen.</Phrase>
        )}
        {licensePlates?.map(licensePlate => (
          <TopTaskButton
            iconName="parkingCar"
            key={licensePlate.vehicle_id}
            onPress={() => onPress(licensePlate)}
            testID="ParkingSessionSelectLicensePlateTopTaskButton"
            title={`${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`}
          />
        ))}
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
