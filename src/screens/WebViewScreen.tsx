import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {RootStackParamList} from '../../App'
import {WebView} from '../components/ui'

type Props = {
  route: RouteProp<RootStackParamList, 'WebView'>
}

type RouteParamsProps = {title: string; uri: string}

export const WebViewScreen = ({route}: Props) => {
  const navigation = useNavigation()
  const {title, uri}: RouteParamsProps = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    })
  }, [title, navigation])

  return <WebView uri={uri} />
}
