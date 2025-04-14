import {skipToken} from '@reduxjs/toolkit/query'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingSessionsQuery} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = (status: ParkingSessionStatus) => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()
  const {data, isLoading, isError} = useParkingSessionsQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          report_code: currentPermit.report_code.toString(),
          status,
          page_size: 100,
        }
      : skipToken,
  )

  return {
    isLoading:
      isLoadingSecureParkingAccount || isLoading || isLoadingCurrentPermit,
    isError,
    parkingSessions: data?.result,
  }
}
