import {ButtonVariant} from '@/components/ui/buttons/Button'
import {PhoneButton} from '@/components/ui/buttons/PhoneButton'
import {TestProps} from '@/components/ui/types'

type Props = {
  variant?: ButtonVariant
} & TestProps

export const PhoneHQButton = ({testID, variant = 'primary'}: Props) => (
  <PhoneButton
    accessibilityLabel="Bel veertien nul twintig"
    phoneNumber="14020"
    testID={testID}
    variant={variant}
  />
)
