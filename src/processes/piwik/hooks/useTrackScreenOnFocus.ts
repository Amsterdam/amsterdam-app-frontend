import {useFocusEffect} from '@react-navigation/native'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'

export const useTrackScreenOnFocus = () => {
  const {trackScreen} = useTrackEvents()

  useFocusEffect(trackScreen)
}
