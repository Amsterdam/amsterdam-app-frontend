import {ReactNode} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  children: ReactNode
  parkingSession?: ParkingSession
}

export const ParkingSessionFormProvider = ({
  children,
  parkingSession,
}: Props) => {
  const form = useForm({
    defaultValues: parkingSession
      ? {
          licensePlate: {
            vehicle_id: parkingSession.vehicle_id,
            visitor_name: parkingSession.visitor_name,
          },
          startTime: dayjs(parkingSession.start_date_time),
          endTime: dayjs(parkingSession.end_date_time),
          paymentZoneId: parkingSession.payment_zone_id,
          ps_right_id: parkingSession.ps_right_id,
          report_code: parkingSession.report_code,
        }
      : {
          startTime: dayjs(),
        },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
