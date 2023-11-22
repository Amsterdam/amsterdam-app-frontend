import {
  WebView as WebViewRN,
  WebViewProps as WebViewRNProps,
} from 'react-native-webview'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
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
>

const webViewInjection = (
  fontScale: number,
  injectedJavaScript?: string,
) => `(function() {
  ${injectedJavaScript ?? ''}
  document.getElementsByTagName("html")[0].style.fontSize = "${
    fontScale * 100
  }%";
})()`

export const WebView = ({
  sliceFromTop,
  url,
  urlParams,
  injectedJavaScript,
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
      renderLoading={() => <PleaseWait />}
      source={{uri: urlWithParams}}
      startInLoadingState
      style={
        !!sliceFromTop && {
          marginTop: isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
      {...webViewProps}
      injectedJavaScript={webViewInjection(fontScale, injectedJavaScript)}
    />
  )
}
