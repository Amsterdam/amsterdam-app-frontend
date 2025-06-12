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
import {useSetSecureParkingAccount} from '@/modules/parking/hooks/useSetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useLoginParkingMutation} from '@/modules/parking/service'
import {
  parkingSlice,
  useIsLoggingInAdditionalAccount,
} from '@/modules/parking/slice'
import {ParkingAccountLogin} from '@/modules/parking/types'

export const ParkingLoginForm = () => {
  const {params} = useRoute<ParkingRouteName.login>()
  const {navigate} = useNavigation()
  const form = useForm<ParkingAccountLogin>({defaultValues: params})
  const pincodeRef = useRef<TextInput | null>(null)
  const dispatch = useDispatch()

  const {handleSubmit} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const isForbiddenError = error && 'status' in error && error.status === 403
  const setSecureParkingAccount = useSetSecureParkingAccount()
  const {isLoggingInAdditionalAccount, setIsLoggingInAdditionalAccount} =
    useIsLoggingInAdditionalAccount()

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
        dispatch(parkingSlice.actions.setParkingAccount({reportCode, scope}))
        dispatch(parkingSlice.actions.setAccessToken(access_token))
        dispatch(
          parkingSlice.actions.setAccessTokenExpiration(
            access_token_expiration,
          ),
        )
        isLoggingInAdditionalAccount && setIsLoggingInAdditionalAccount(false)
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
          enterKeyHint="send"
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
