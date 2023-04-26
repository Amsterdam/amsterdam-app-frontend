import {Button, ButtonProps} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {accessibleText, formatPhoneNumber, openPhoneUrl} from '@/utils'

type Props = {
  phoneNumber: string
} & Omit<ButtonProps, 'accessibilityLabel' | 'iconName' | 'label' | 'onPress'>

export const PhoneButton = ({phoneNumber, ...buttonProps}: Props) => (
  <Row>
    <Button
      {...buttonProps}
      accessibilityLabel={accessibleText(
        'Bel',
        ...(formatPhoneNumber(phoneNumber) ?? '').split(' '),
      )}
      iconName="phone"
      label={formatPhoneNumber(phoneNumber)}
      onPress={() => {
        openPhoneUrl(phoneNumber)
      }}
    />
  </Row>
)
