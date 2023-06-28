import {useCallback} from 'react'
import {useLayoutEffect} from 'react'
import {WebViewMessageEvent} from 'react-native-webview'
import {NavigationProps} from '@/app/navigation'
import {Box} from '@/components/ui/containers/Box'
import {WebView} from '@/components/ui/containers/WebView'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Link} from '@/components/ui/text/Link'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {useEnvironment} from '@/store'

type Props = NavigationProps<ReportProblemRouteName.reportProblemWebView>

const injectedJavascript = `(function() {
  window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`

const signalsCloseMessage = 'signals/close'

export const ReportProblemWebViewScreen = ({navigation, route}: Props) => {
  const environment = useEnvironment()
  const {city} = route.params
  const url = environment[`reportProblem${city}Url`]

  useLayoutEffect(() => {
    if (city) {
      navigation.setOptions({
        headerTitle: `Melding doen voor ${city}`,
      })
    }
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
          <Column gutter="md">
            <EmptyMessage
              testID="ReportProblemWebViewCityNotFoundText"
              text="Plaats niet gevonden."
            />
            <Row align="start">
              <Link
                label="Terug"
                onPress={() =>
                  navigation.navigate(ReportProblemRouteName.reportProblem)
                }
                variant="backward"
              />
            </Row>
          </Column>
        </Box>
      </Screen>
    )
  }

  return (
    <Screen scroll={false}>
      <WebView
        testID="ReportProblemWebView"
        {...{injectedJavascript, onMessage, url}}
      />
    </Screen>
  )
}
