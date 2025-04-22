import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  isRemovable: boolean
  licensePlate: ParkingLicensePlate
  onPressDelete: (vehicleId: string) => void
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
      <Row gutter="md">
        <Icon
          name="parkingCar"
          size="lg"
          testID="ParkingLicensePlateIcon"
        />
        <Phrase emphasis="strong">{licensePlate}</Phrase>
      </Row>
      {!!isRemovable && (
        <IconButton
          icon={
            <Icon
              color="link"
              name="trash-bin"
              size="lg"
              testID="ParkingRemoveLicensePlateIcon"
            />
          }
          onPress={() => onPressDelete(vehicle_id)}
          testID="ParkingRemoveLicensePlateButton"
        />
      )}
    </Row>
  )
}
