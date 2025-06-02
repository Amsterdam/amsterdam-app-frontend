import {skipToken} from '@reduxjs/toolkit/query'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useLicensePlatesQuery} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'

export const AddLicensePlateHeaderButton = () => {
  const {setAlert} = useAlert()
  const {navigate} = useNavigation()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()
  const {data: licensePlates, isLoading: isLoadingLicensePlates} =
    useLicensePlatesQuery(
      currentPermit
        ? {
            reportCode: currentPermit?.report_code.toString(),
          }
        : skipToken,
    )

  const isLoading = isLoadingLicensePlates || isLoadingCurrentPermit

  if (isLoading || currentPermit?.forced_license_plate_list) {
    return null
  }

  return (
    <IconButton
      accessibilityLabel="Voeg een kenteken toe"
      disabled={isLoading}
      icon={
        <Icon
          color="link"
          name="add"
          size="lgx"
          testID="ParkingAddLicensePlateHeaderButtonIcon"
        />
      }
      onPress={() => {
        if ((licensePlates?.length ?? 0) >= MAX_LICENSE_PLATES) {
          setAlert(alerts.maxLicensePlatesWarning)
        } else {
          navigate(ParkingRouteName.addLicensePlate)
        }
      }}
      testID="ParkingAddLicensePlateHeaderButton"
    />
  )
}
