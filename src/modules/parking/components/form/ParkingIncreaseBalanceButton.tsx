import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useIncreaseBalanceMutation} from '@/modules/parking/service'

type FieldValues = {
  amount?: number
}

export const ParkingIncreaseBalanceButton = () => {
  const {handleSubmit} = useFormContext()
  const [increaseBalance] = useIncreaseBalanceMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const onSubmit = useCallback(
    ({amount}: FieldValues) => {
      if (amount) {
        void increaseBalance({
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
    [increaseBalance, goBack, openWebUrl],
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
