import {useFocusEffect} from '@react-navigation/native'
import {usePiwik} from '@/processes/logging/hooks/usePiwik'

export const useTrackScreenOnFocus = () => {
  const {trackScreen} = usePiwik()

  useFocusEffect(() => {
    trackScreen()
  })
}
