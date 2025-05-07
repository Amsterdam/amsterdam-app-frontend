import {useContext} from 'react'
import {CurrentPermitContext} from '@/modules/parking/provides/CurrentPermitProvider'

export const useCurrentParkingPermit = () => {
  const context = useContext(CurrentPermitContext)

  if (!context) {
    throw new Error(
      'useCurrentPermit must be used within a CurrentPermitProvider',
    )
  }

  return context
}
