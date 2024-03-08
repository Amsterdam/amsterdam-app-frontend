import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {
  AlertBase,
  AlertBaseProps,
} from '@/components/ui/feedback/alert/AlertBase'

export const AlertNegative = (props: AlertBaseProps) => (
  <AlertBase
    {...props}
    variant={AlertVariant.negative}
  />
)
