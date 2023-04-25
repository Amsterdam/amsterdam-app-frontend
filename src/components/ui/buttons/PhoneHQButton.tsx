import {ButtonVariant, PhoneButton} from '@/components/ui/buttons'

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
