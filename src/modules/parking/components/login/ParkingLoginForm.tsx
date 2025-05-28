import {useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform, TextInput} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetSecureParkingAccount} from '@/modules/parking/hooks/useSetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useLoginParkingMutation} from '@/modules/parking/service'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {
  ParkingAccountLogin,
  ParkingLoginEndpointRequest,
} from '@/modules/parking/types'

export const ParkingLoginForm = () => {
  const pincodeRef = useRef<TextInput | null>(null)
  const {navigate} = useNavigation()
  const {setCurrentAccountType} = useCurrentParkingAccount()
  const form = useForm<ParkingAccountLogin>()

  const {handleSubmit} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const isForbiddenError = error && 'status' in error && error.status === 403
  const setSecureParkingAccount = useSetSecureParkingAccount()

  const errorSentence = isForbiddenError
    ? 'Controleer uw meldcode en pincode en probeer het opnieuw.'
    : 'Er is iets misgegaan. Probeer het opnieuw.'

  const onSubmit = handleSubmit(({pin, reportCode}) => {
    void loginParking({
      pin,
      report_code: reportCode,
    } as ParkingLoginEndpointRequest)
      .unwrap()
      .then(({access_token, scope}) => {
        setCurrentAccountType(scope)
        void setSecureParkingAccount({
          accessToken: access_token,
          pin,
          reportCode,
          scope,
        })
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
