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

export const WebView = ({
  sliceFromTop,
  url,
  urlParams,
  ...webViewProps
}: Props) => {
  const {isPortrait} = useDeviceContext()

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
    />
  )
}
