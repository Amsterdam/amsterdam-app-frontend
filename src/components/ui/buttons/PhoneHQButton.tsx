import {ButtonVariant, PhoneButton} from '@/components/ui/buttons'

type Props = {
  variant?: ButtonVariant
}

export const PhoneHQButton = ({variant = 'primary'}: Props) => (
  <PhoneButton
    accessibilityLabel="Bel veertien nul twintig"
    label="Bel 14 020"
    phoneNumber="14020"
    variant={variant}
  />
)
