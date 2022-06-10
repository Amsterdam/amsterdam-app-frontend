import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTML, {RenderHTMLProps} from 'react-native-render-html'

export const Article = (props: RenderHTMLProps) => {
  const {width} = useWindowDimensions()
  return <RenderHTML {...props} contentWidth={width} />
}
