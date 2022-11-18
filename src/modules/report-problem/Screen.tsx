import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {RootStackParams} from '@/app/navigation'
import {WebView} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {useEnvironment} from '@/store'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ReportProblemRouteName.reportProblem
  >
}

const injectedJavascript = `(function() {
  window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`

const signalsCloseMessage = 'signals/close'

export const ReportProblemScreen = ({navigation}: Props) => {
  const environment = useEnvironment()

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        navigation.goBack()
      }
    },
    [navigation],
  )

  return (
    <Screen scroll={false}>
      <WebView
        injectedJavaScript={injectedJavascript}
        onMessage={handleMessage}
        url={environment.signalsBaseUrl}
      />
    </Screen>
  )
}
