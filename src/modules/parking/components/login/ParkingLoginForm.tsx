import {useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform, TextInput} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAddSecureParkingAccount} from '@/modules/parking/hooks/useAddSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingApi, useLoginParkingMutation} from '@/modules/parking/service'
import {
  parkingSlice,
  useIsLoggingInAdditionalAccount,
  useParkingAccessToken,
} from '@/modules/parking/slice'
import {ParkingAccountLogin} from '@/modules/parking/types'

export const ParkingLoginForm = () => {
  const {params} = useRoute<ParkingRouteName.login>()
  const {navigate} = useNavigation()
  const form = useForm<ParkingAccountLogin>({defaultValues: params})
  const pincodeRef = useRef<TextInput | null>(null)
  const {setAccessToken} = useParkingAccessToken()

  const {handleSubmit} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const isForbiddenError = error && 'status' in error && error.status === 403
  const setSecureParkingAccount = useAddSecureParkingAccount()
  const {isLoggingInAdditionalAccount, setIsLoggingInAdditionalAccount} =
    useIsLoggingInAdditionalAccount()
  const dispatch = useDispatch()
  const errorSentence = isForbiddenError
    ? 'Controleer uw meldcode en pincode en probeer het opnieuw.'
    : 'Er is iets misgegaan. Probeer het opnieuw.'

  const onSubmit = handleSubmit(({pin, reportCode}) => {
    void loginParking({
      pin,
      report_code: reportCode,
    })
      .unwrap()
      .then(async ({access_token, access_token_expiration, scope}) => {
        await setSecureParkingAccount({pin, reportCode}, scope)
        setAccessToken(reportCode, access_token, access_token_expiration)
        dispatch(parkingSlice.actions.setCurrentAccount(reportCode))
        dispatch(parkingSlice.actions.setCurrentPermitReportCode(undefined))
        dispatch(parkingSlice.actions.setParkingAccount({reportCode, scope}))
        isLoggingInAdditionalAccount && setIsLoggingInAdditionalAccount(false)
        dispatch(parkingApi.util.resetApiState())
      })
  })

  return (
    <FormProvider {...form}>
      <Column gutter="md">
        <TextInputField
          autoFocus
          keyboardType="number-pad"
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

        {!!isError && !isLoading && (
          <>
            <SomethingWentWrong
              testID="ParkingLoginFormSomethingWentWrong"
              text={errorSentence}
              title="Inloggen mislukt"
            />
            <Gutter height="lg" />
          </>
        )}
        <Button
          label="Pincode vergeten"
          onPress={() => navigate(ParkingRouteName.requestPinCode)}
          testID="ParkingLoginForgotPinButton"
          variant="tertiary"
        />
        <Button
          label="Inloggen"
          onPress={onSubmit}
          testID="ParkingLoginFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
