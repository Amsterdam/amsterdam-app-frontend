import {useContext} from 'react'
import {CurrentPermitContext} from '@/modules/parking/providers/CurrentPermit.context'

export const useCurrentParkingPermit = () => {
  const context = useContext(CurrentPermitContext)

  if (!context) {
    throw new Error(
      'useCurrentPermit must be used within a CurrentPermitProvider',
    )
  }

  return context
}
