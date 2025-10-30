import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlatesQuery} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const useGetLicensePlates = () => {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const isPermitHolder =
    parkingAccount?.scope === ParkingPermitScope.permitHolder

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    currentPermit && isPermitHolder
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  return {licensePlates, isLoading}
}
