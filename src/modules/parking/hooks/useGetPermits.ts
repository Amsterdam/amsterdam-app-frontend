import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {usePermitsQuery} from '@/modules/parking/service'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'
import {SecureParkingAccount} from '@/modules/parking/types'

export const useGetPermits = () => {
  const {currentPermitName, setCurrentPermitName} =
    useCurrentParkingPermitName()
  const {secureParkingAccount, isLoading: isGetSecureParkingAccountLoading} =
    useGetSecureParkingAccount()

  const {data, isLoading} = usePermitsQuery(
    secureParkingAccount
      ? (JSON.parse(secureParkingAccount) as SecureParkingAccount).accessToken
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
