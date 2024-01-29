import {useCallback} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation/types'
import {WebView} from '@/components/ui/containers/WebView'
import {Screen} from '@/components/ui/layout/Screen'
import {useUrlForEnv} from '@/hooks/useMap'
import {reportProblemExternalLinks} from '@/modules/report-problem/external-links'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavaScript = `
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation}: Props) => {
  const reportProblemUrl = useUrlForEnv(reportProblemExternalLinks)

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        navigation.getParent()?.goBack()
      }
    },
    [navigation],
  )

  return (
    <Screen scroll={false}>
      <WebView
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        testID="ReportProblemWebView"
        url={reportProblemUrl}
      />
    </Screen>
  )
}
