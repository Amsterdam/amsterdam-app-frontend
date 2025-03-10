import {skipToken} from '@reduxjs/toolkit/query'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const ParkingAddLicensePlateHeaderButton = () => {
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
    useGetCurrentPermit()

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
      icon={
        <Icon
          color="link"
          name="add"
          size="lg"
        />
      }
      testID="ParkingAddLicensePlateHeaderButton"
    />
  )
}
