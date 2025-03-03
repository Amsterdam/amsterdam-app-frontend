import {ReactNode} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {RequestPinCode} from '@/modules/parking/types'

type Props = {
  children: ReactNode
}

export const ParkingRequestPinCodeFormProvider = ({children}: Props) => {
  const form = useForm<RequestPinCode>()

  return <FormProvider {...form}>{children}</FormProvider>
}
