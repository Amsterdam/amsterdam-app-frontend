import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useParkingPinCodeMutation} from '@/modules/parking/service'
import {RequestPinCode} from '@/modules/parking/types'

export const ParkingRequestPinCodeForm = () => {
  const form = useForm<RequestPinCode>()
  const {goBack} = useNavigation()
  const {handleSubmit} = form
  const [pincode] = useParkingPinCodeMutation()

  const onSubmit = handleSubmit(async ({phoneLastFourDigits, reportCode}) => {
    await pincode({phoneLastFourDigits, reportCode})
      .unwrap()
      .then(() => {
        goBack()
      })
  })

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <Column gutter="md">
          <TextInputField
            autoFocus
            keyboardType="number-pad"
            label="Meldcode"
            name="reportCode"
            rules={{
              required: 'Vul een meldcode in',
            }}
            testID="ParkingRequestPinCodeFormReportCodeInputField"
          />
          <TextInputField
            keyboardType="number-pad"
            label="Laatste 4 cijfers van uw telefoonnummer"
            name="phoneLastFourDigits"
            rules={{
              required: 'Vul laatste 4 cijfers van uw telefoonnummer in',
            }}
            testID="ParkingRequestPinCodeFormPhoneLastFourDigitsInputField"
            textTransform={text => text.slice(0, 4)}
          />
        </Column>
        <Button
          label="Pincode opvragen"
          onPress={onSubmit}
          testID="ParkingRequestPinCodeFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
