import {Button, ButtonProps} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {useOpenPhoneUrl} from '@/hooks'
import {accessibleText, formatPhoneNumber} from '@/utils'

type Props = {
  phoneNumber: string
} & Omit<ButtonProps, 'iconName' | 'label' | 'onPress'>

export const PhoneButton = ({
  accessibilityLabel,
  phoneNumber,
  ...buttonProps
}: Props) => {
  const openPhoneUrl = useOpenPhoneUrl()
  return (
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
}
