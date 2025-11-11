import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {useParkingMachinesQuery} from '@/modules/parking/service'
import {useSelectedParkingMachineId} from '@/modules/parking/slice'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingMachineDetails = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const parkingMachineId = useSelectedParkingMachineId()
  const {data} = useParkingMachinesQuery()
  const parkingMachine = data?.find(machine => machine.id === parkingMachineId)
  const {lat, lon} = parkingMachine || {}
  const directionsUrl = useGetGoogleMapsDirectionsUrl({lat, lon})

  const autoFocus = useAccessibilityFocus()

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
            <Title
              level="h5"
              text={String(parkingMachine.address)}
            />
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
            <Paragraph>{parkingMachine.name}</Paragraph>
          </Column>
        </Row>
      </Column>
    </Box>
  )
}
