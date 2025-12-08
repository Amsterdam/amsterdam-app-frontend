import {useContext} from 'react'
import {MapContext} from '@/components/features/map/MapContext'

export const useMap = () => {
  const map = useContext(MapContext)

  if (!map) {
    throw new Error('useMap must be used within a MapProvider')
  }

  return map.current
}
