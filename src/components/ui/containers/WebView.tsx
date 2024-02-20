import {Platform} from 'react-native'
import {
  WebView as WebViewRN,
  WebViewProps as WebViewRNProps,
} from 'react-native-webview'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  sliceFromTop?: {
    landscape: number
    portrait: number
  }
  url: string
  urlParams?: Record<string, string>
} & Omit<
  WebViewRNProps,
  'renderLoading' | 'source' | 'startInLoadingState' | 'style'
> &
  TestProps

const webViewInjection = (fontScale: number, injectedJavaScript?: string) => {
  const iosFontScaleScript = `
      document.getElementsByTagName("html")[0].style.fontSize = "${
        fontScale * 100
      }%";
    `
  const iosFontScale = Platform.OS === 'ios' ? iosFontScaleScript : ''

  return `(function() {
    ${injectedJavaScript ?? ''}
    ${iosFontScale}
  })()`
}

export const WebView = ({
  sliceFromTop,
  url,
  urlParams,
  injectedJavaScript,
  testID,
  ...webViewProps
}: Props) => {
  const {isPortrait, fontScale} = useDeviceContext()

  const params = new URLSearchParams(urlParams)
  const urlWithParams =
    urlParams && Object.keys(urlParams).length
      ? url + '?' + params.toString()
      : url

  return (
    <WebViewRN
      renderLoading={() => <PleaseWait testID={testID} />}
      source={{uri: urlWithParams}}
      startInLoadingState
      style={
        !!sliceFromTop && {
          marginTop: isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
      textZoom={fontScale * 100}
      {...webViewProps}
      injectedJavaScript={webViewInjection(fontScale, injectedJavaScript)}
    />
  )
}
