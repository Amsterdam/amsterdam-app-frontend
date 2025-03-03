import {ReactNode} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {ParkingAccountLogin} from '@/modules/parking/types'

type Props = {
  children: ReactNode
}

export const ParkingLoginFormProvider = ({children}: Props) => {
  const form = useForm<ParkingAccountLogin>()

  return <FormProvider {...form}>{children}</FormProvider>
}
