import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useSetSecureParkingAccount} from '@/modules/parking/hooks/useSetSecureParkingAccount'
import {useLoginParkingMutation} from '@/modules/parking/service'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {
  ParkingFormLoginFormData,
  ParkingLoginEndpointRequest,
} from '@/modules/parking/types'

export const ParkingLoginFormSubmitButton = () => {
  const {setCurrentAccountType} = useCurrentParkingAccount()
  const {handleSubmit} = useFormContext<ParkingFormLoginFormData>()
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
        void setSecureParkingAccount({accessToken: access_token, scope})
      })
  })

  return (
    <Box>
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
        label="Inloggen"
        onPress={onSubmit}
        testID="ParkingLoginFormSubmitButton"
      />
    </Box>
  )
}
