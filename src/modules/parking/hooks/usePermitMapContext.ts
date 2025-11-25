import {useContext} from 'react'
import {PermitMapContext} from '@/modules/parking/providers/PermitMap.context'

export const usePermitMapContext = () => {
  const context = useContext(PermitMapContext)

  if (!context) {
    throw new Error(
      'usePermitMapContext must be used within a PermitMapProvider',
    )
  }

  return context
}
