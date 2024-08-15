import {forwardRef} from 'react'
import {Platform, StyleSheet} from 'react-native'
import {
  WebView as WebViewRN,
  WebViewProps as WebViewRNProps,
} from 'react-native-webview'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  grow?: boolean
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

export type WebViewRef = WebViewRN

export const WebView = forwardRef<WebViewRN, Props>(
  (
    {
      grow,
      sliceFromTop,
      url,
      urlParams,
      injectedJavaScript,
      testID,
      ...webViewProps
    }: Props,
    ref,
  ) => {
    const {isPortrait, fontScale} = useDeviceContext()

    const params = new URLSearchParams(urlParams)
    const urlWithParams =
      urlParams && Object.keys(urlParams).length
        ? url + '?' + params.toString()
        : url

    return (
      <WebViewRN
        containerStyle={!!grow && styles.grow}
        ref={ref}
        renderLoading={() => (
          <Column grow={1}>
            <PleaseWait testID={testID} />
          </Column>
        )}
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
  },
)

const styles = StyleSheet.create({
  grow: {
    flexGrow: 1,
  },
})
