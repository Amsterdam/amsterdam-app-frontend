import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTMLRN, {RenderHTMLProps} from 'react-native-render-html'

export const RenderHTML = (props: RenderHTMLProps) => {
  const {width} = useWindowDimensions()
  return <RenderHTMLRN {...props} contentWidth={width} />
}
