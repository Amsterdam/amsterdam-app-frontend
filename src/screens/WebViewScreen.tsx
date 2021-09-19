import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {RootStackParamList} from '../../App'
import {WebView, WebViewProps} from '../components/ui'

type Props = {
  route: RouteProp<RootStackParamList, 'WebView'>
}

export type WebViewRouteParams = WebViewProps & {
  title: string
}

export const WebViewScreen = ({route}: Props) => {
  const navigation = useNavigation()
  const {sliceFromTop, title, uri}: WebViewRouteParams = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    })
  }, [title, navigation])

  return <WebView sliceFromTop={sliceFromTop} uri={uri} />
}
