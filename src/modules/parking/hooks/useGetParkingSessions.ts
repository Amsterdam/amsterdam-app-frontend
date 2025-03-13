import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingSessionsQuery} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()
  const {data, isLoading} = useParkingSessionsQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          report_code: currentPermit.report_code.toString(),
        }
      : skipToken,
  )
  const parkingSessions = data?.result

  const activeParkingSessions = useMemo(() => {
    if (!parkingSessions) {
      return
    }

    return parkingSessions.filter(p => p.status === ParkingSessionStatus.active)
  }, [parkingSessions])

  const plannedParkingSessions = useMemo(() => {
    if (!parkingSessions) {
      return
    }

    return parkingSessions.filter(
      p => p.status === ParkingSessionStatus.planned,
    )
  }, [parkingSessions])

  return {
    isLoading:
      isLoadingSecureParkingAccount || isLoading || isLoadingCurrentPermit,
    activeParkingSessions,
    plannedParkingSessions,
  }
}
