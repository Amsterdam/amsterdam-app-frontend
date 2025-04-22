import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useIncreaseBalanceMutation} from '@/modules/parking/service'

type FieldValues = {
  amount?: number
}

export const ParkingIncreaseBalanceButton = () => {
  const {handleSubmit} = useFormContext()
  const {currentPermit} = useGetCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [increaseBalance] = useIncreaseBalanceMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const onSubmit = useCallback(
    ({amount}: FieldValues) => {
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
            if (result.redirect_url) {
              openWebUrl(result.redirect_url)
            }

            goBack()
          })
      }
    },
    [currentPermit, secureParkingAccount, increaseBalance, goBack, openWebUrl],
  )

  return (
    <Button
      label="Nu betalen"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingIncreaseBalanceButton"
      variant="primary"
    />
  )
}
