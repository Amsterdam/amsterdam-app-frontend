import {skipToken} from '@reduxjs/toolkit/query'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const AddLicensePlateHeaderButton = () => {
  const {navigate} = useNavigation()
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    secureParkingAccount
      ? {
          accessToken: secureParkingAccount.accessToken,
          reportCode: secureParkingAccount.reportCode,
        }
      : skipToken,
  )
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()

  if (
    isLoadingSecureParkingAccount ||
    isLoading ||
    isLoadingCurrentPermit ||
    currentPermit?.forced_license_plate_list ||
    !licensePlates ||
    licensePlates?.length >= MAX_LICENSE_PLATES
  ) {
    return null
  }

  return (
    <IconButton
      accessibilityLabel="Voeg een kenteken toe"
      icon={
        <Icon
          color="link"
          name="add"
          size="lgx"
        />
      }
      onPress={() => navigate(ParkingRouteName.addLicensePlate)}
      testID="ParkingAddLicensePlateHeaderButton"
    />
  )
}
