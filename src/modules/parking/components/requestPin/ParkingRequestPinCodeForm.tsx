import {FormProvider, useForm} from 'react-hook-form'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'

type FormData = {
  phoneLastFourDigits: string
  reportCode: string
}

export const ParkingRequestPinCodeForm = () => {
  const form = useForm<FormData>()

  return (
    <FormProvider {...form}>
      <Column gutter="md">
        <TextInputField
          autoFocus
          label="Meldcode"
          name="reportCode"
          rules={{
            required: 'Vul een meldcode in',
          }}
          testID="ParkingRequestPinCodeFormReportCodeInputField"
        />
        <TextInputField
          label="Laatste 4 cijfers van uw telefoonnummer"
          name="phoneLastFourDigits"
          rules={{
            required: 'Vul laatste 4 cijfers van uw telefoonnummer in',
          }}
          testID="ParkingRequestPinCodeFormPhoneLastFourDigitsInputField"
        />
      </Column>
    </FormProvider>
  )
}
