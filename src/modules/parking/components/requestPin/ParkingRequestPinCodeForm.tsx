import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'

export const ParkingRequestPinCodeForm = () => (
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
)
