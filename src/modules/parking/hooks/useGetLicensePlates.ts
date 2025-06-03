import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const useGetLicensePlates = () => {
  const currentPermit = useCurrentParkingPermit()

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    currentPermit
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  return {licensePlates, isLoading}
}
