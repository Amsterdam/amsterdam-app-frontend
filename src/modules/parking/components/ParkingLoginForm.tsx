import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'

export const ParkingLoginForm = () => (
  <Column gutter="md">
    <TextInputField
      autoFocus
      label="Meldcode"
      name="reportCode"
      rules={{
        required: 'Vul een meldcode in',
      }}
      testID="ParkingLoginFormReportCodeInputField"
    />
    <TextInputField
      label="Pincode"
      name="pin"
      rules={{
        required: 'Vul een pincode in',
      }}
      testID="ParkingLoginFormPinCodeInputField"
    />
  </Column>
)
