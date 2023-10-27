import {Platform} from 'react-native'
import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {replaceDots} from '@/utils/accessibility/replaceDots'

type Props = {
  email: string
  subject?: string
} & Omit<ButtonProps, 'iconName' | 'label' | 'onPress'>

export const EmailButton = ({email, subject, ...buttonProps}: Props) => {
  const openMailUrl = useOpenMailUrl()

  return (
    <Row>
      <Button
        {...buttonProps}
        accessibilityLabel={accessibleText(
          'Stuur een e-mail naar',
          Platform.OS === 'ios' ? replaceDots(email) : email,
        )}
        ellipsizeMode="tail"
        iconName="email"
        label={email}
        onPress={() => {
          openMailUrl(email, subject)
        }}
      />
    </Row>
  )
}
