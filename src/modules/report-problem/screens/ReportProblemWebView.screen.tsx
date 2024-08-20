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

const ReportProblemEndUrlPath = '/incident/bedankt'

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

  const closeButtonUsed = useRef(false)

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      if (event.nativeEvent.data === signalsCloseMessage) {
        trackCustomEvent('ReportProblemCloseButton', PiwikAction.buttonPress)
        closeButtonUsed.current = true
        navigation.getParent()?.goBack()
      }
    },
    [navigation, trackCustomEvent],
  )

  const canGoBack = useRef<boolean>(false)
  const onNavigationStateChange = useCallback(
    ({url, canGoBack: newCanGoBack}: WebViewNavigation) => {
      if (url === reportProblemUrl || url.includes(ReportProblemEndUrlPath)) {
        canGoBack.current = false
      } else {
        canGoBack.current = newCanGoBack
      }

      if (url.includes(ReportProblemEndUrlPath)) {
        setHasFinishedAtLeastOnce(true)
        trackCustomEvent(
          'ReportProblemFinishedReport',
          PiwikAction.finishedReport,
        )
      }

      navigation.setOptions({
        gestureEnabled: !canGoBack.current,
      })
    },
    [navigation, reportProblemUrl, trackCustomEvent],
  )

  const webViewRef = useRef<WebViewRef>(null)
  const onHandleBackPress = useCallback(() => {
    if (webViewRef.current && canGoBack.current) {
      webViewRef.current.goBack()

      return true
    }

    return false
  }, [])

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

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!closeButtonUsed.current) {
          // Prevent default behavior of leaving the screen
          e.preventDefault()

          // Prompt the user before leaving the screen
          Alert.alert(
            'Weet u zeker dat u het formulier wilt verlaten?',
            'Als u deze pagina verlaat, dan worden uw ingevulde antwoorden verwijderd.',
            [
              {text: 'Annuleren', style: 'cancel', onPress: () => null},
              {
                text: 'Verlaat en verwijder antwoorden',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action),
              },
            ],
            {cancelable: true},
          )
        }
      }),
    [navigation],
  )

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
