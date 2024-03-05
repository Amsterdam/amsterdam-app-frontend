import {AlertProps, AlertVariant} from '@/components/ui/feedback/Alert.types'
import {AlertUI} from '@/components/ui/feedback/AlertUI'

export const AlertPositive = (props: AlertProps) => (
  <AlertUI
    {...props}
    variant={AlertVariant.positive}
  />
)
