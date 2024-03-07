import {
  AlertProps,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'

export const AlertPositive = (props: AlertProps) => (
  <AlertBase
    {...props}
    variant={AlertVariant.positive}
  />
)
