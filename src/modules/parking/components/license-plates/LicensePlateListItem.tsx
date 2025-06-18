import {IconButton} from '@/components/ui/buttons/IconButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  isRemovable: boolean
  licensePlate: ParkingLicensePlate
  onPressDelete: (vehicleId: string, visitor_name?: string) => void
}

export const LicensePlateListItem = ({
  licensePlate: {vehicle_id, visitor_name},
  isRemovable,
  onPressDelete,
}: Props) => {
  const licensePlate = `${vehicle_id}${visitor_name ? ' - ' + visitor_name : ''}`

  return (
    <Row
      align="between"
      gutter="md"
      key={vehicle_id}>
      <SingleSelectable accessibilityLabel={`Kenteken ${licensePlate}`}>
        <Row gutter="md">
          <Icon
            name="parkingCar"
            size="lg"
            testID="ParkingLicensePlateIcon"
          />
          <Phrase emphasis="strong">{licensePlate}</Phrase>
        </Row>
      </SingleSelectable>
      {!!isRemovable && (
        <IconButton
          accessibilityLabel={`Verwijder kenteken ${vehicle_id}${visitor_name ? ', ' + visitor_name : ''}`}
          icon={
            <Icon
              color="link"
              name="trash-bin"
              size="lg"
              testID="ParkingRemoveLicensePlateIcon"
            />
          }
          onPress={() => onPressDelete(vehicle_id, visitor_name)}
          testID="ParkingRemoveLicensePlateButton"
        />
      )}
    </Row>
  )
}
