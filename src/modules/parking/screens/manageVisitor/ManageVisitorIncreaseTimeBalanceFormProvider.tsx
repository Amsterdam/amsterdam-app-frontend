import {ReactNode} from 'react'
import {FormProvider, useForm} from 'react-hook-form'

type Props = {
  children: ReactNode
}

export const ParkingSessionFormProvider = ({children}: Props) => {
  const form = useForm()

  return <FormProvider {...form}>{children}</FormProvider>
}
