import {useEffect} from 'react'
import {usePermitsQuery} from '@/modules/parking/service'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'

export const useGetPermits = () => {
  const {currentPermitName, setCurrentPermitName} =
    useCurrentParkingPermitName()

  const {data, isLoading, refetch} = usePermitsQuery({status: 'ACTIVE'})

  useEffect(() => {
    if (data?.length && !currentPermitName) {
      setCurrentPermitName(data[0].permit_name)
    }
  }, [currentPermitName, data, setCurrentPermitName])

  return {
    permits: data,
    isLoading,
    refetch,
  }
}
