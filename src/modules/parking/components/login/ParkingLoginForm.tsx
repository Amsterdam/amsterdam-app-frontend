import {useEffect, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform} from 'react-native'
import type {TextInput} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/parking/alerts'
import {useAddSecureParkingAccount} from '@/modules/parking/hooks/useAddSecureParkingAccount'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {parkingApi, useLoginParkingMutation} from '@/modules/parking/service'
import {
  parkingSlice,
  setIsLoggingIn,
  useParkingAccessToken,
  useParkingDeeplinkAccount,
} from '@/modules/parking/slice'
import {ParkingAccountLogin, ParkingApiVersion} from '@/modules/parking/types'
import {devError} from '@/processes/development'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {useAlert} from '@/store/slices/alert'

export const ParkingLoginForm = () => {
  const apiVersion = useCurrentParkingApiVersion()
  const deeplinkAccount = useParkingDeeplinkAccount()
  const form = useForm<ParkingAccountLogin>({defaultValues: deeplinkAccount})
  const pincodeRef = useRef<TextInput | null>(null)
  const {setAccessToken} = useParkingAccessToken()
  const {resetAlert, setAlert} = useAlert()
  const trackException = useTrackException()

  const {handleSubmit, setValue} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const isForbiddenError = error && 'status' in error && error.status === 403
  const setSecureParkingAccount = useAddSecureParkingAccount()
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async ({pin, reportCode}) => {
    try {
      const {access_token, access_token_expiration, scope} = await loginParking(
        {
          pin,
          report_code: reportCode,
        },
      ).unwrap()

      await setSecureParkingAccount({pin, reportCode}, scope)
      setAccessToken(reportCode, access_token, access_token_expiration)
      dispatch(parkingSlice.actions.setCurrentAccount(reportCode))
      dispatch(parkingSlice.actions.setCurrentPermitReportCode(undefined))
      dispatch(parkingSlice.actions.setParkingAccount({reportCode, scope}))
      dispatch(parkingApi.util.resetApiState())
      dispatch(setIsLoggingIn(false))
    } catch (err) {
      trackException(
        ExceptionLogKey.parkingLoginFailed,
        'ParkingLoginForm.tsx',
        {
          error: err,
        },
      )
      devError('ParkingLoginForm onSubmit error:', err)
    }
  })

  useEffect(() => {
    if (deeplinkAccount) {
      setValue('reportCode', deeplinkAccount.reportCode)
      setValue('pin', deeplinkAccount.pin)
    }
  }, [deeplinkAccount, setValue])

  useEffect(() => {
    if (!isError) {
      return
    }

    isForbiddenError
      ? setAlert(alerts.loginForbiddenFailed)
      : setAlert(alerts.loginFailed)
  }, [isError, isForbiddenError, setAlert])

  useEffect(() => {
    if (isLoading) {
      resetAlert()
    }
  }, [isLoading, resetAlert])

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="md">
          <TextInputField
            autoFocus
            hasClearButton={false}
            keyboardType={
              apiVersion === ParkingApiVersion.v1
                ? 'number-pad'
                : 'numbers-and-punctuation'
            }
            label="Meldcode"
            name="reportCode"
            onSubmitEditing={() => {
              pincodeRef.current?.focus()
            }}
            returnKeyType={Platform.OS !== 'ios' ? 'done' : undefined}
            rules={{
              required: 'Vul een meldcode in',
            }}
            submitBehavior="submit"
            testID="ParkingLoginFormReportCodeInputField"
          />
          <TextInputField
            hasClearButton={false}
            keyboardType="number-pad"
            label="Pincode"
            name="pin"
            onSubmitEditing={onSubmit}
            ref={pincodeRef}
            rules={{
              required: 'Vul een pincode in',
            }}
            testID="ParkingLoginFormPinCodeInputField"
          />
        </Column>

        <Button
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
          label="Inloggen"
          onPress={onSubmit}
          testID="ParkingLoginFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
