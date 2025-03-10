import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {ParkingLicensePlateListItem} from '@/modules/parking/components/license-plates/ParkingLicensePlateListItem'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {
  useLicensePlatesQuery,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'

export const ParkingMyLicensePlatesScreen = () => {
  const openPhoneUrl = useOpenPhoneUrl()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentPermit()
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  const [removeLicensePlate] = useRemoveLicensePlateMutation()

  const onPressDelete = useCallback(
    (vehicle_id: string) => {
      if (!secureParkingAccount) {
        return
      }

      Alert.alert(
        'Weet u zeker dat u het kenteken wilt verwijderen?',
        undefined,
        [
          {text: 'Annuleren', style: 'cancel', onPress: () => null},
          {
            text: 'Verwijderen',
            style: 'default',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              void removeLicensePlate({
                accessToken: secureParkingAccount.accessToken,
                report_code: secureParkingAccount.reportCode,
                vehicle_id,
              })
            },
          },
        ],
        {cancelable: true},
      )
    },
    [removeLicensePlate, secureParkingAccount],
  )

  if (isLoadingSecureParkingAccount || isLoadingCurrentPermit || isLoading) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!currentPermit || !licensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSelectLicensePlateSomethingWentWrong" />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return (
    <Screen testID="ParkingMyLicensePlatesScreen">
      <Box>
        <Column gutter="xl">
          {licensePlates.length >= MAX_LICENSE_PLATES && (
            <AlertBase
              hasIcon
              testID="ParkingMaxLicensePlatesAlert"
              text="Er kunnen niet meer dan 9 kentekens worden opgeslagen."
              title="Maximum aantal kentekens"
            />
          )}
          {licensePlates?.map(licensePlate => (
            <ParkingLicensePlateListItem
              isRemovable={!forced_license_plate_list}
              key={licensePlate.vehicle_id}
              licensePlate={licensePlate}
              onPressDelete={onPressDelete}
            />
          ))}
          {!!forced_license_plate_list && (
            <Column gutter="lg">
              <Column gutter="sm">
                <Title
                  level="h2"
                  testID="ParkingMyLicensePlatesForceLicensePlatesTitle"
                  text="Kenteken toevoegen"
                />
                <Paragraph>
                  Wilt u een ander kenteken toevoegen of vervangen? Neem dan
                  contact met ons op. Bel het telefoonnummer 14 020 maandag tot
                  en met vrijdag van 08.00 tot 18.00 uur
                </Paragraph>
              </Column>
              <Button
                accessibilityLabel="Bel veertien nul twintig"
                label="Bel 14 020"
                onPress={() => {
                  openPhoneUrl('14020')
                }}
                testID="ParkingMyLicensePlatesForceLicensePlatesPhoneButton"
                variant="secondary"
              />
            </Column>
          )}
        </Column>
      </Box>
    </Screen>
  )
}
