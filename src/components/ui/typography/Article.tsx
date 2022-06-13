import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html'
import {Theme, useThemable} from '../../../themes'

type Props = {
  content: string | undefined
}

const transformRules = [
  {
    find: /"\/publish/g,
    replace: '"https://www.amsterdam.nl/publish',
  },
  {
    find: /&quot;\/publish/g,
    replace: '&quot;https://www.amsterdam.nl/publish',
  },
]

const transformContent = (content: string) => {
  // Applies all transform rules to the content.
  return transformRules.reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )
}

/**
 * Renders HTML content, applying the typographic design.
 */
export const Article = ({content}: Props) => {
  const {width} = useWindowDimensions()
  const fonts = useThemable(createFontList)
  const baseStyles = useThemable(createBaseStyles)

  if (!content) {
    return null
  }

  const html = transformContent(content)

  const styles: Record<string, MixedStyleDeclaration> = {
    h3: baseStyles.titleLevel3,
    li: {...baseStyles.paragraph, ...baseStyles.listItem},
    p: baseStyles.paragraph,
    ul: baseStyles.list,
  }

  return (
    <RenderHTML
      contentWidth={width}
      source={{html}}
      systemFonts={fonts}
      tagsStyles={styles}
    />
  )
}

const createBaseStyles: (
  theme: Theme,
) => Record<string, MixedStyleDeclaration> = ({color, size, text}: Theme) => ({
  list: {
    margin: 0,
    marginLeft: -10,
  },
  listItem: {
    paddingLeft: 10,
  },
  paragraph: {
    color: color.text.default,
    fontFamily: text.fontWeight.regular,
    fontSize: text.fontSize.body,
    lineHeight: text.lineHeight.body * text.fontSize.body,
    marginTop: 0,
    marginBottom: size.spacing.xl, // TODO Token
  },
  titleLevel3: {
    color: color.text.default,
    fontWeight: '600', // TODO Check
    fontFamily: text.fontWeight.bold,
    fontSize: text.fontSize.h3,
    lineHeight: text.lineHeight.h3 * text.fontSize.h3,
    marginTop: 0,
    marginBottom: size.spacing.lg, // TODO Token
  },
})

const createFontList = ({text}: Theme) => [
  text.fontWeight.bold,
  text.fontWeight.demi,
  text.fontWeight.regular,
]
