import {ButtonVariant} from '@/components/ui/buttons/Button'
import {PhoneButton} from '@/components/ui/buttons/PhoneButton'

type Props = {
  variant?: ButtonVariant
}

export const PhoneHQButton = ({variant = 'primary'}: Props) => (
  <PhoneButton
    accessibilityLabel="Bel veertien nul twintig"
    phoneNumber="14020"
    variant={variant}
  />
)
