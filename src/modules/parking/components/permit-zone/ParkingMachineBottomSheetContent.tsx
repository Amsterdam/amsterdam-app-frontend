import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  useParkingMachinesQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {useSelectedParkingMachineId} from '@/modules/parking/slice'
import {getParkingMachineDetailsLabel} from '@/modules/parking/utils/paymentZone'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingMachineBottomSheetContent = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const navigation = useNavigation<ParkingRouteName>()
  const autoFocus = useAccessibilityFocus()
  const {name: previousRouteName} = usePreviousRoute() ?? {}

  const currentPermit = useCurrentParkingPermit()
  const parkingMachineId = useSelectedParkingMachineId()

  const {data} = useParkingMachinesQuery()
  const parkingMachine = data?.find(machine => machine.id === parkingMachineId)

  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: parkingMachine?.lat,
    lon: parkingMachine?.lon,
  })

  const {
    data: parkingMachineDetails,
    isLoading,
    isError,
  } = useZoneByMachineQuery(
    parkingMachineId
      ? {machineId: parkingMachineId, report_code: currentPermit.report_code}
      : skipToken,
  )

  const machineDetailsLabel = useMemo(
    () => getParkingMachineDetailsLabel(parkingMachineDetails, dayjs()),
    [parkingMachineDetails],
  )

  if (!parkingMachine) {
    return null
  }

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text={`Parkeerautomaat ${parkingMachine.id}`}
          />
          <IconButton
            accessibilityLabel="Sluit parkeerautomaat details venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="ParkingMachineDetailsCloseButton"
          />
        </Row>

        <Row
          gutter="smd"
          valign="start">
          <Icon
            name="location"
            size="lg"
          />
          <Column>
            {!!parkingMachine?.address && (
              <Title
                level="h5"
                text={parkingMachine.address}
              />
            )}
            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="ParkingMachineDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          </Column>
        </Row>
        <Row
          gutter="smd"
          valign="start">
          <Icon
            name="clock"
            size="lg"
          />
          <Column>
            <Title
              level="h5"
              text="Betaald parkeren"
            />
            {isLoading ? (
              <PleaseWait testID="ParkingMachineDetailsPleaseWait" />
            ) : (
              <Paragraph>{machineDetailsLabel}</Paragraph>
            )}
          </Column>
        </Row>

        {previousRouteName === ParkingRouteName.startSession && (
          <Button
            disabled={isLoading || isError}
            iconName={isError ? 'alert' : undefined}
            label={
              isError ? 'Automaat niet beschikbaar' : 'Selecteer deze automaat'
            }
            onPress={() => {
              navigation.popTo(ParkingRouteName.startSession, {
                parkingMachineId: parkingMachine.id,
              })
            }}
            testID="SelectParkingMachineButton"
          />
        )}
      </Column>
    </Box>
  )
}
