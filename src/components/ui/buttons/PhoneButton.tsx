import {Button, ButtonProps} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {openPhoneUrl} from '@/utils'

type Props = {
  phoneNumber: string
} & ButtonProps

export const PhoneButton = ({phoneNumber, ...buttonProps}: Props) => (
  <Row>
    <Button
      {...buttonProps}
      iconName="phone"
      onPress={() => {
        openPhoneUrl(phoneNumber)
      }}
    />
  </Row>
)
