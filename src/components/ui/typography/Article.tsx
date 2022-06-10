import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html'
import {color, font} from '../../../tokens'

type Props = {
  content: string
}

export const Article = ({content}: Props) => {
  const {width} = useWindowDimensions()

  return (
    <RenderHTML
      contentWidth={width}
      source={{html: content}}
      systemFonts={[font.weight.demi, font.weight.regular]}
      tagsStyles={styles}
    />
  )
}

const baseStyles: Record<string, MixedStyleDeclaration> = {
  h3: {
    color: color.font.regular,
    fontWeight: '600', // Seems to work best visually – better than 500.
    fontFamily: font.weight.demi,
    fontSize: font.size.h3,
    lineHeight: font.height.h3,
    margin: 0,
  },
  list: {
    margin: 0,
    marginLeft: -10,
  },
  listItem: {
    paddingLeft: 10,
  },
  text: {
    color: color.font.regular,
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    marginBottom: font.leadingBottom.p1,
    marginTop: font.leadingTop.p1,
  },
  textIntro: {
    fontFamily: font.weight.demi,
  },
}

const styles: Record<string, MixedStyleDeclaration> = {
  h3: baseStyles.h3,
  li: {...baseStyles.text, ...baseStyles.listItem},
  p: baseStyles.text,
  ul: baseStyles.list,
}
