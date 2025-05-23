import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {usePermitsQuery} from '@/modules/parking/service'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'

export const useGetPermits = () => {
  const {currentPermitName, setCurrentPermitName} =
    useCurrentParkingPermitName()
  const {secureParkingAccount, isLoading: isGetSecureParkingAccountLoading} =
    useGetSecureParkingAccount()

  const {data, isLoading} = usePermitsQuery(
    secureParkingAccount
      ? {accessToken: secureParkingAccount.accessToken, status: 'ACTIVE'}
      : skipToken,
  )

  useEffect(() => {
    if (data && !currentPermitName) {
      setCurrentPermitName(data[0].permit_name)
    }
  }, [currentPermitName, data, setCurrentPermitName])

  return {
    permits: data,
    isLoading: isGetSecureParkingAccountLoading || isLoading,
  }
}
