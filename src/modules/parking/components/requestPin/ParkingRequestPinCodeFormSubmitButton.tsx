import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {useParkingPinCodeMutation} from '@/modules/parking/service'
import {RequestPinCode} from '@/modules/parking/types'

export const ParkingRequestPincodeFormSubmitButton = () => {
  const {handleSubmit} = useFormContext<RequestPinCode>()
  const [pincode] = useParkingPinCodeMutation()

  const onSubmit = handleSubmit(async ({phoneLastFourDigits, reportCode}) => {
    await pincode({phoneLastFourDigits, reportCode})
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
