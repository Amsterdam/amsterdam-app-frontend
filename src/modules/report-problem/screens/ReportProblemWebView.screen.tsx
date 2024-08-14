import {ParamListBase} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform, BackHandler, Alert} from 'react-native'
import {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {WebView, type WebViewRef} from '@/components/ui/containers/WebView'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {Header} from '@/modules/home/components/Header'
import {reportProblemExternalLinks} from '@/modules/report-problem/external-links'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenOptions} from '@/modules/report-problem/screenOptions'
import {
  PiwikAction,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavaScript = `
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation, route}: Props) => {
  const reportProblemUrl = useUrlForEnv(reportProblemExternalLinks)

  const [hasFinishedAtLeastOnce, setHasFinishedAtLeastOnce] = useState(false)

  const {trackCustomEvent} = useTrackEvents()

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

  const canGoBack = useRef<boolean>(false)
  const onNavigationStateChange = useCallback(
    ({url, canGoBack: newCanGoBack}: WebViewNavigation) => {
      if (url === reportProblemUrl) {
        canGoBack.current = false
      } else {
        canGoBack.current = newCanGoBack
      }

      if (url.includes('/incident/bedankt')) {
        setHasFinishedAtLeastOnce(true)
        trackCustomEvent(
          'ReportProblemFinishedReport',
          PiwikAction.finishedReport,
        )
      }
    },
    [reportProblemUrl, trackCustomEvent],
  )

  const webViewRef = useRef<WebViewRef>(null)
  const onHandleBackPress = useCallback(() => {
    if (webViewRef.current) {
      if (canGoBack.current) {
        webViewRef.current.goBack()
      } else {
        Alert.alert(
          'Terug',
          'Als u deze pagina verlaat, dan verliest u alle ingevulde gegevens.',
          [
            {
              text: 'Annuleer',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Verlaat en wis antwoorden',
              onPress: () => navigation.goBack(),
              style: 'destructive',
            },
          ],
          {
            cancelable: true,
          },
        )
      }

      return true
    }

    return false
  }, [navigation])

  const onHeaderBackPress = useCallback(() => {
    if (!onHandleBackPress()) {
      navigation.goBack()
    }
  }, [navigation, onHandleBackPress])

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onHandleBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onHandleBackPress)
      }
    }
  }, [onHandleBackPress])

  return (
    <Screen
      scroll={false}
      stickyHeader={
        <Header
          back={{onPress: onHeaderBackPress}}
          navigation={
            navigation as unknown as StackNavigationProp<
              ParamListBase,
              string,
              undefined
            >
          }
          options={screenOptions}
          route={route}
        />
      }
      testID="ReportProblemWebViewScreen">
      <WebView
        allowsBackForwardNavigationGestures
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        ref={webViewRef}
        testID="ReportProblemWebView"
        url={reportProblemUrl}
      />
    </Screen>
  )
}
