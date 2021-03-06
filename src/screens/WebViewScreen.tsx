import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {StackParams} from '../app/navigation'
import {NonScalingHeaderTitle, WebView, WebViewProps} from '../components/ui'

type Props = {
  route: RouteProp<StackParams, 'WebView'>
}

export type WebViewRouteParams = WebViewProps & {
  title: string
}

export const WebViewScreen = ({route}: Props) => {
  const navigation = useNavigation()
  const {sliceFromTop, title, url, urlParams}: WebViewRouteParams = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={title} />,
    })
  }, [title, navigation])

  return <WebView sliceFromTop={sliceFromTop} url={url} urlParams={urlParams} />
}
