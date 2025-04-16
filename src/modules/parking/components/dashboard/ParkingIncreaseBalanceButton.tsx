import {useCallback, useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useIncreaseBalanceMutation} from '@/modules/parking/service'
import {devLog} from '@/processes/development'

export const ParkingIncreaseBalanceButton = () => {
  const {amount} = useContext(ParkingSessionContext)
  const {currentPermit} = useGetCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [increaseBalance] = useIncreaseBalanceMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const onSubmit = useCallback(() => {
    if (currentPermit && secureParkingAccount && amount) {
      void increaseBalance({
        accessToken: secureParkingAccount.accessToken,
        balance: {
          amount,
          currency: 'EUR',
        },
        redirect: {
          merchant_return_url: 'amsterdam://parking/increase-balance/return',
        },
        locale: 'nl',
      })
        .unwrap()
        .then(result => {
          devLog('Balance increased successfully:', result)

          if (result.redirect_url) {
            openWebUrl(result.redirect_url)
          }

          goBack()
        })
    }
  }, [
    currentPermit,
    secureParkingAccount,
    amount,
    increaseBalance,
    goBack,
    openWebUrl,
  ])

  return (
    <Button
      label="Nu betalen"
      onPress={onSubmit}
      testID="ParkingIncreaseBalanceButton"
      variant="primary"
    />
  )
}
