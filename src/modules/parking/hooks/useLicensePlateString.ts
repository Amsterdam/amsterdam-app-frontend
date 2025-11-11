import {useMemo} from 'react'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'

export const useLicensePlateString = (
  vehicleId: string,
  visitorName?: string,
) => {
  const {licensePlates} = useGetLicensePlates()
  const possiblyVisitorName = useMemo(
    () =>
      licensePlates?.find(
        lp => lp.vehicle_id?.toUpperCase() === vehicleId?.toUpperCase(),
      )?.visitor_name,
    [licensePlates, vehicleId],
  )
  const visitorNameResult = visitorName ?? possiblyVisitorName

  return `${vehicleId}${visitorNameResult ? ' - ' + visitorNameResult : ''}`
}
