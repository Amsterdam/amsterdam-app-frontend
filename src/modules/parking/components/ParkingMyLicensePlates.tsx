import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {Alert} from 'react-native'
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
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useLicensePlatesQuery,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'

export const ParkingMyLicensePlates = () => {
  const openPhoneUrl = useOpenPhoneUrl()
  const currentPermit = useCurrentParkingPermit()
  const {data: licensePlates, isFetching} = useLicensePlatesQuery(
    currentPermit
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  const [removeLicensePlate, {isLoading: isLoadingRemoveLicensePlate}] =
    useRemoveLicensePlateMutation()

  const onPressDelete = useCallback(
    (vehicle_id: string, visitor_name?: string) => {
      Alert.alert(
        'Weet u zeker dat u het kenteken wilt verwijderen?',
        `Kenteken: ${vehicle_id}${visitor_name ? '\nNaam: ' + visitor_name : ''}`,
        [
          {
            text: 'Annuleren',
            style: 'cancel',
            onPress: () => null,
          },
          {
            text: 'Verwijderen',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              void removeLicensePlate({
                report_code: currentPermit.report_code.toString(),
                vehicle_id,
              })
            },
          },
        ],
        {cancelable: true},
      )
    },
    [currentPermit.report_code, removeLicensePlate],
  )

  if (isFetching || isLoadingRemoveLicensePlate) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSelectLicensePlateSomethingWentWrong" />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return (
    <Box>
      <Column gutter="xl">
        {licensePlates.length === 0 && (
          <Phrase>U heeft nog geen kentekens opgeslagen.</Phrase>
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
                contact met ons op. Bel het telefoonnummer 14 020 maandag tot en
                met vrijdag van 08.00 tot 18.00 uur
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
  )
}
