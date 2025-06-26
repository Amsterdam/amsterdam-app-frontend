import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {LicensePlateListItem} from '@/modules/parking/components/license-plates/LicensePlateListItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useLicensePlatesQuery,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'
import {PermitType} from '@/modules/parking/types'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const ParkingMyLicensePlates = () => {
  const openWebUrl = useOpenWebUrl()
  const trackException = useTrackException()

  const {data: redirectUrls} = useGetRedirectUrlsQuery()
  const currentPermit = useCurrentParkingPermit()
  const {data: licensePlates, isFetching} = useLicensePlatesQuery(
    currentPermit
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  const redirectUrl = useMemo(() => {
    if (currentPermit.permit_type.includes(PermitType.mantelzorgvergunning)) {
      return redirectUrls?.parking_request_license_plate_mantelzorgers
    }

    if (
      currentPermit.permit_type.includes(
        PermitType['GA-parkeervergunning voor bewoners (passagiers)'],
      )
    ) {
      return redirectUrls?.parking_request_license_plate_ga_bewoners
    }

    if (currentPermit.permit_type.includes(PermitType['GA-bezoekerskaart'])) {
      return redirectUrls?.parking_request_license_plate_ga_bezoekers
    }
  }, [currentPermit.permit_type, redirectUrls])

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
        {licensePlates?.map((licensePlate, index) => (
          <LicensePlateListItem
            isRemovable={!forced_license_plate_list}
            key={licensePlate.vehicle_id}
            licensePlate={licensePlate}
            number={String(index + 1)}
            onPressDelete={onPressDelete}
          />
        ))}
        {!!forced_license_plate_list && (
          <Column gutter="lg">
            <Column gutter="sm">
              <Title
                level="h2"
                testID="ParkingMyLicensePlatesForceLicensePlatesTitle"
                text="Kenteken toevoegen of wijzigen"
              />
              <Paragraph>
                U kunt online een kenteken toevoegen of wijzigen.
              </Paragraph>
            </Column>
            <Button
              accessibilityLabel="Kenteken wijzigen"
              iconName="external-link"
              iconSize="md"
              label="Kenteken wijzigen"
              onPress={() => {
                if (redirectUrl) {
                  openWebUrl(redirectUrl)
                } else {
                  Alert.alert(
                    'Sorry, deze functie is nu niet beschikbaar. Probeer het later nog eens.',
                  )

                  trackException(
                    ExceptionLogKey.getRedirectsUrl,
                    'ParkingMyLicensePlates.ts',
                    {redirectsKey: 'parking_request_license_plate'},
                  )
                }
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
