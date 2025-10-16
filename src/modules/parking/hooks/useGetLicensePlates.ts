import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlatesQuery} from '@/modules/parking/service'

export const useGetLicensePlates = (active = true) => {
  const currentPermit = useCurrentParkingPermit()

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    currentPermit && active
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  return {licensePlates, isLoading}
}
