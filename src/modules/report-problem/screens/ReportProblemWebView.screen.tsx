import {useNavigation} from '@react-navigation/native'
import {RouteProp} from '@react-navigation/native'
import {useCallback} from 'react'
import {useLayoutEffect} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {WebView} from '@/components/ui/containers'
import {Box} from '@/components/ui/containers'
import {EmptyMessage} from '@/components/ui/feedback'
import {Screen} from '@/components/ui/layout'
import {ReportProblemStackParams} from '@/modules/report-problem/routes'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {useEnvironment} from '@/store'

type Props = {
  route: RouteProp<
    Pick<ReportProblemStackParams, ReportProblemRouteName.reportProblemWebView>
  >
}

const injectedJavascript = `(function() {
  window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({route}: Props) => {
  const navigation = useNavigation()
  const environment = useEnvironment()
  const {city} = route.params
  const url = environment[`reportProblem${city}Url`]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Melding doen voor ${city}`,
    })
  }, [navigation, city])

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        navigation.goBack()
      }
    },
    [navigation],
  )

  if (!city) {
    return (
      <Screen>
        <Box>
          <EmptyMessage text="Plaats niet gevonden." />
        </Box>
      </Screen>
    )
  }

  return (
    <Screen scroll={false}>
      <WebView {...{injectedJavascript, onMessage, url}} />
    </Screen>
  )
}
