import {AlertProps, AlertVariant} from '@/components/ui/feedback/Alert.types'
import {AlertBase} from '@/components/ui/feedback/AlertBase'

export const AlertInformation = (props: AlertProps) => (
  <AlertBase
    {...props}
    variant={AlertVariant.information}
  />
)
