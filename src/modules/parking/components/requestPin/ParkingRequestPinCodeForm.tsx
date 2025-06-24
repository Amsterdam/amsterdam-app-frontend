import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useParkingPinCodeMutation} from '@/modules/parking/service'
import {RequestPinCode} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

export const ParkingRequestPinCodeForm = () => {
  const form = useForm<RequestPinCode>()
  const {goBack} = useNavigation()
  const {handleSubmit} = form
  const [pincode] = useParkingPinCodeMutation()
  const {setAlert} = useAlert()

  const onSubmit = handleSubmit(async ({phoneLastFourDigits, reportCode}) => {
    await pincode({phoneLastFourDigits, reportCode})
      .unwrap()
      .then(() => {
        goBack()
        setAlert(alerts.changePincodeSuccess)
      })
  })

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <Column gutter="md">
          <TextInputField
            hasClearButton={false}
            keyboardType="number-pad"
            label="Meldcode"
            name="reportCode"
            rules={{
              required: 'Vul een meldcode in',
            }}
            testID="ParkingRequestPinCodeFormReportCodeInputField"
          />
          <TextInputField
            hasClearButton={false}
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
