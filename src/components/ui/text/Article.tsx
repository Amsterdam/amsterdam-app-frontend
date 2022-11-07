import React from 'react'
import {Platform, TextStyle, useWindowDimensions} from 'react-native'
import RenderHTML, {
  MixedStyleDeclaration,
  RenderersProps,
} from 'react-native-render-html'
import {Theme, useThemable, useTheme} from '@/themes'
import {SizeTokens} from '@/themes/tokens'

type Props = {
  content: string | undefined
  isIntro?: boolean
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

/**
 * Applies all transform rules to the content.
 */
const transformContent = (content: string) =>
  transformRules.reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )

const computeEmbeddedMaxWidth =
  (size: SizeTokens) => (contentWidth: number, tagName: string) => {
    if (tagName === 'img') {
      return contentWidth - 2 * size.spacing.md
    }

    return contentWidth
  }

/**
 * Renders HTML content, applying the typographic design.
 */
export const Article = ({content, isIntro}: Props) => {
  const {width} = useWindowDimensions()
  const {size} = useTheme()
  const fonts = useThemable(createFontList)
  const baseStyle = useThemable(createBaseStyle)
  const styles = useThemable(createStyles(isIntro))
  const renderersProps = useThemable(createRenderersProps)

  if (!content) {
    return null
  }

  const html = transformContent(content)

  const tagsStyles: Record<string, MixedStyleDeclaration> = {
    h3: {...styles.titleLevel3, ...styles.titleMargins},
    h4: {...styles.titleLevel4, ...styles.titleMargins},
    img: styles.margins,
    li: {...styles.paragraph},
    ol: {...styles.paragraph, ...styles.margins},
    p: {...styles.paragraph, ...styles.margins},
    ul: styles.margins,
  }

  return (
    <RenderHTML
      baseStyle={baseStyle}
      computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(size)}
      contentWidth={width}
      renderersProps={renderersProps}
      source={{html}}
      systemFonts={fonts}
      tagsStyles={tagsStyles}
    />
  )
}

const createBaseStyle = ({color, text}: Theme) => ({
  color: color.text.default,
  fontFamily: text.fontFamily.regular,
})

const createStyles: (
  isIntro: Props['isIntro'],
) => (theme: Theme) => Record<string, MixedStyleDeclaration> =
  isIntro =>
  ({text}: Theme) => {
    const lineHeight = isIntro
      ? text.lineHeight.intro * text.fontSize.intro
      : text.lineHeight.body * text.fontSize.body

    // By default, Android sets this to `bold` – which breaks the font family.
    const platformDependentFontWeight: TextStyle['fontWeight'] =
      Platform.OS === 'android' ? 'normal' : undefined

    return {
      margins: {
        marginTop: 0,
        marginBottom: lineHeight,
      },
      paragraph: {
        fontSize: isIntro ? text.fontSize.intro : text.fontSize.body,
        lineHeight,
      },
      titleLevel3: {
        fontFamily: text.fontFamily.bold,
        fontWeight: platformDependentFontWeight,
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3 * text.fontSize.h3,
      },
      titleLevel4: {
        fontFamily: text.fontFamily.bold,
        fontWeight: platformDependentFontWeight,
        fontSize: text.fontSize.h4,
        lineHeight: text.lineHeight.h4 * text.fontSize.h4,
      },
      titleMargins: {
        marginTop: 0,
        marginBottom: lineHeight / 2,
      },
    }
  }

const createFontList = ({text}: Theme): string[] => [
  text.fontFamily.bold,
  text.fontFamily.regular,
]

const createRenderersProps = ({text}: Theme): Partial<RenderersProps> => ({
  ul: {
    markerBoxStyle: {
      paddingRight: text.fontSize.body / 3,
      paddingTop: (text.lineHeight.body * text.fontSize.body) / 5,
    },
  },
})
