import {Button, ButtonProps} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {accessibleText, formatPhoneNumber, openPhoneUrl} from '@/utils'

type Props = {
  phoneNumber: string
} & Omit<ButtonProps, 'iconName' | 'label' | 'onPress'>

export const PhoneButton = ({
  accessibilityLabel,
  phoneNumber,
  ...buttonProps
}: Props) => (
  <Row>
    <Button
      {...buttonProps}
      accessibilityLabel={
        accessibilityLabel ||
        accessibleText(
          'Bel',
          ...(formatPhoneNumber(phoneNumber) ?? '').split(' '),
        )
      }
      iconName="phone"
      label={formatPhoneNumber(phoneNumber)}
      onPress={() => {
        void openPhoneUrl(phoneNumber)
      }}
    />
  </Row>
)
