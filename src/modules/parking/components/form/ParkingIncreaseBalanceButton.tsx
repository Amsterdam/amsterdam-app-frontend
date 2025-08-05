import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  useAccountDetailsQuery,
  useIncreaseBalanceMutation,
} from '@/modules/parking/service'
import {setWalletBalanceIncreaseStartBalance} from '@/modules/parking/slice'

type FieldValues = {
  amount?: number
}

export const ParkingIncreaseBalanceButton = () => {
  const dispatch = useDispatch()
  const {handleSubmit, formState} = useFormContext()
  const [increaseBalance] = useIncreaseBalanceMutation()
  const {data} = useAccountDetailsQuery()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const onSubmit = useCallback(
    ({amount}: FieldValues) => {
      if (amount) {
        dispatch(setWalletBalanceIncreaseStartBalance(data?.wallet?.balance))

        return increaseBalance({
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
    [dispatch, data?.wallet?.balance, increaseBalance, goBack, openWebUrl],
  )

  return (
    <ExternalLinkButton
      disabled={formState.isSubmitting}
      label="Nu betalen"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingIncreaseBalanceExternalLinkButton"
    />
  )
}
