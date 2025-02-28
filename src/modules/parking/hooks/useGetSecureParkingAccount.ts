import {useState, useEffect} from 'react'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {SecureParkingAccount} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'

export const useGetSecureParkingAccount = () => {
  const [isLoading, setIsLoading] = useState(true)
  const {currentAccountType} = useCurrentParkingAccount()

  const [secureParkingAccount, setSecureParkingAccount] =
    useState<SecureParkingAccount>()

  useEffect(() => {
    setIsLoading(true)

    if (currentAccountType) {
      void getSecureParkingAccount(currentAccountType).then(account => {
        setSecureParkingAccount(account)
      })
    }

    setIsLoading(false)
  }, [currentAccountType])

  return {secureParkingAccount, isLoading}
}
