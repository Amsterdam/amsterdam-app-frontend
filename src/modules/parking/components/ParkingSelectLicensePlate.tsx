import {skipToken} from '@reduxjs/toolkit/query'
import {View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const ParkingSelectLicensePlate = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    secureParkingAccount
      ? {
          accessToken: secureParkingAccount.accessToken,
          reportCode: secureParkingAccount.reportCode,
        }
      : skipToken,
  )

  if (isLoadingSecureParkingAccount || isLoading) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSelectLicensePlateSomethingWentWrong" />
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {licensePlates?.map(licensePlate => (
          <View key={licensePlate.vehicle_id}>
            <Row gutter="md">
              <Icon name="parkingCar" />
              <Phrase>{licensePlate.vehicle_id}</Phrase>
              <Phrase>{licensePlate.visitor_name}</Phrase>
            </Row>
            <IconButton
              accessibilityLabel="Verwijder kenteken"
              icon={<Icon name="trash-bin" />}
              testID="ParkingRemoveLicensePlateButton"
            />
          </View>
        ))}
      </Column>
    </Box>
  )
}
