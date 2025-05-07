import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const useGetLicensePlates = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const currentPermit = useCurrentParkingPermit()

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
