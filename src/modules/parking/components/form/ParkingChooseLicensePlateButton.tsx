import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {type ParkingLicensePlate} from '@/modules/parking/types'

export const ParkingChooseLicensePlateButton = () => (
  <SelectButtonControlled<{licensePlate?: ParkingLicensePlate}, 'licensePlate'>
    accessibilityLabel={licensePlate =>
      licensePlate
        ? `Kenteken ${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
        : 'Kies kenteken'
    }
    bottomSheetVariant={ParkingSessionBottomSheetVariant.licensePlate}
    iconName="parkingCar"
    name="licensePlate"
    rules={{required: 'Kies een kenteken'}}
    testID="ParkingChooseLicensePlateButton"
    text={licensePlate =>
      licensePlate
        ? `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`
        : undefined
    }
    title={licensePlate => (licensePlate ? 'Kenteken' : 'Kies kenteken')}
  />
)
