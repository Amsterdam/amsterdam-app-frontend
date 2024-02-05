import {useFocusEffect} from '@react-navigation/native'
import {usePiwik} from '@/hooks/piwik/usePiwik'

export const useTrackScreenOnFocus = () => {
  const {trackScreen} = usePiwik()

  useFocusEffect(() => {
    trackScreen()
  })
}
