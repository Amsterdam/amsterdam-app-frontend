import {skipToken} from '@reduxjs/toolkit/query'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const useGetLicensePlates = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit} = useGetCurrentParkingPermit()

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  return {licensePlates, isLoading: isLoading || isLoadingSecureParkingAccount}
}
