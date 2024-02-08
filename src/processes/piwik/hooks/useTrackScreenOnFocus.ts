import {useFocusEffect} from '@react-navigation/native'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'

export const useTrackScreenOnFocus = () => {
  const {trackScreen} = usePiwik()

  useFocusEffect(() => {
    trackScreen()
  })
}
