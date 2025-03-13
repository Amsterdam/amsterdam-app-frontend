import {ReactNode} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  children: ReactNode
}

export const ParkingSessionLicensePlateFormProvider = ({children}: Props) => {
  const form = useForm<ParkingLicensePlate>()

  return <FormProvider {...form}>{children}</FormProvider>
}
