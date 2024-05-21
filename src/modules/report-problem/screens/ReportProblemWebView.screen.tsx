import {useCallback, useState} from 'react'
import {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {WebView} from '@/components/ui/containers/WebView'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {reportProblemExternalLinks} from '@/modules/report-problem/external-links'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {PiwikAction, usePiwik} from '@/processes/piwik/hooks/usePiwik'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavaScript = `
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation}: Props) => {
  const reportProblemUrl = useUrlForEnv(reportProblemExternalLinks)

  const [hasFinishedAtLeastOnce, setHasFinishedAtLeastOnce] = useState(false)

  const {trackCustomEvent} = usePiwik()

  const onBlur = useCallback(() => {
    trackCustomEvent(
      hasFinishedAtLeastOnce
        ? 'ReportProblemFinishedBlur'
        : 'ReportProblemNotFinishedBlur',
      PiwikAction.blur,
    )
  }, [hasFinishedAtLeastOnce, trackCustomEvent])

  useBlurEffect(onBlur)

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        trackCustomEvent('ReportProblemCloseButton', PiwikAction.buttonPress)
        navigation.getParent()?.goBack()
      }
    },
    [navigation, trackCustomEvent],
  )

  const onNavigationStateChange = useCallback(
    ({url}: WebViewNavigation) => {
      if (url.includes('/incident/bedankt')) {
        setHasFinishedAtLeastOnce(true)
        trackCustomEvent(
          'ReportProblemFinishedReport',
          PiwikAction.finishedReport,
        )
      }
    },
    [trackCustomEvent],
  )

  return (
    <Screen
      scroll={false}
      testID="ReportProblemWebViewScreen">
      <WebView
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        testID="ReportProblemWebView"
        url={reportProblemUrl}
      />
    </Screen>
  )
}
