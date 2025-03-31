import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {LicensePlateListItem} from '@/modules/parking/components/license-plates/LicensePlateListItem'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {
  useLicensePlatesQuery,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'

export const ParkingMyLicensePlatesScreen = () => {
  const openPhoneUrl = useOpenPhoneUrl()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {data: licensePlates, isFetching} = useLicensePlatesQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  const [removeLicensePlate, {isLoading: isLoadingRemoveLicensePlate}] =
    useRemoveLicensePlateMutation()

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

  if (
    isLoadingSecureParkingAccount ||
    isLoadingCurrentPermit ||
    isFetching ||
    isLoadingRemoveLicensePlate
  ) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!currentPermit || !licensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSelectLicensePlateSomethingWentWrong" />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return (
    <Screen
      hasStickyAlert
      testID="ParkingMyLicensePlatesScreen">
      <Box>
        <Column gutter="xl">
          {licensePlates.length === 0 && (
            <Phrase>U heeft nog geen favoriete kentekens opgeslagen.</Phrase>
          )}
          {licensePlates?.map(licensePlate => (
            <LicensePlateListItem
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
