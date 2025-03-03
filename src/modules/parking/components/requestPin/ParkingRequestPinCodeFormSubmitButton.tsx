import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RequestPinCode} from '@/modules/parking/types'
import {devLog} from '@/processes/development'

export const ParkingRequestPincodeFormSubmitButton = () => {
  const {handleSubmit} = useFormContext<RequestPinCode>()

  const onSubmit = handleSubmit(({phoneLastFourDigits, reportCode}) => {
    devLog({phoneLastFourDigits, reportCode})
  })

  return (
    <Box>
      <Button
        label="Pincode opvragen"
        onPress={onSubmit}
        testID="ParkingRequestPinCodeFormSubmitButton"
      />
    </Box>
  )
}
