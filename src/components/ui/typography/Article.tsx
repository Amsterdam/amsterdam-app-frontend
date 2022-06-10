import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTML, {RenderHTMLProps} from 'react-native-render-html'
import {tagsStyles} from '../../../styles/html'
import {font} from '../../../tokens'

type Props = Pick<RenderHTMLProps, 'source'>

export const Article = ({source}: Props) => {
  const {width} = useWindowDimensions()

  return (
    <RenderHTML
      contentWidth={width}
      source={source}
      systemFonts={[font.weight.demi, font.weight.regular]}
      tagsStyles={tagsStyles}
    />
  )
}
