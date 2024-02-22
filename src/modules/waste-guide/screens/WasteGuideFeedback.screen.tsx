import {WebView} from '@/components/ui/containers/WebView'
import {Screen} from '@/components/ui/layout/Screen'

export const WasteGuideFeedbackScreen = () => (
  <Screen
    scroll={false}
    testID="WasteGuideFeedbackScreen">
    <WebView
      sliceFromTop={{portrait: 161, landscape: 207}}
      testID="WasteGuideFeedbackWebview"
      url="https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/"
    />
  </Screen>
)
