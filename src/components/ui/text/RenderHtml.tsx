import {Platform, TextStyle, useWindowDimensions} from 'react-native'
import RenderHTML, {
  MixedStyleDeclaration,
  RenderersProps,
} from 'react-native-render-html'
import {TestProps} from '@/components/ui/types'
import {Theme, useThemable, useTheme} from '@/themes'
import {SizeTokens, TextTokens} from '@/themes/tokens'

type Props = {
  content: string | undefined
  isIntro?: boolean
  transformRules?: HtmlTransformRule[]
} & TestProps

export type HtmlTransformRule = {
  find: RegExp
  replace: string
}

const defaultTransformRules: HtmlTransformRule[] = [
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
const transformContent = (
  content: string,
  additionalTransformRules: HtmlTransformRule[] = [],
) =>
  [...defaultTransformRules, ...additionalTransformRules].reduce(
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
export const RenderHtml = ({content, isIntro, transformRules}: Props) => {
  const {width} = useWindowDimensions()
  const {size} = useTheme()
  const fonts = useThemable(createFontList)
  const baseStyle = useThemable(createBaseStyle)
  const styles = useThemable(createStyles(isIntro))
  const renderersProps = useThemable(createRenderersProps)

  if (!content) {
    return null
  }

  const html = transformContent(content, transformRules)

  const tagsStyles: Record<string, MixedStyleDeclaration> = {
    b: styles.boldText,
    h1: {...styles.boldText, ...styles.titleLevel1, ...styles.titleMargins},
    h2: {...styles.boldText, ...styles.titleLevel2, ...styles.titleMargins},
    h3: {...styles.boldText, ...styles.titleLevel3, ...styles.titleMargins},
    h4: {...styles.boldText, ...styles.titleLevel4, ...styles.titleMargins},
    h5: {...styles.boldText, ...styles.titleLevel5, ...styles.titleMargins},
    h6: {...styles.boldText, ...styles.titleLevel6, ...styles.titleMargins},
    img: styles.margins,
    li: {...styles.paragraph},
    ol: {...styles.paragraph, ...styles.margins},
    p: {...styles.paragraph, ...styles.margins},
    strong: styles.boldText,
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

const getFontSize = (text: TextTokens, isIntro = false) =>
  isIntro ? text.fontSize.intro : text.fontSize.body

const getLineHeight = (text: TextTokens, isIntro = false) =>
  isIntro
    ? text.lineHeight.intro * text.fontSize.intro
    : text.lineHeight.body * text.fontSize.body

const createBaseStyle = ({color, text}: Theme) => ({
  color: color.text.default,
  fontFamily: text.fontFamily.regular,
  fontSize: getFontSize(text),
  lineHeight: getLineHeight(text),
})

const createStyles: (
  isIntro: Props['isIntro'],
) => (theme: Theme) => Record<string, MixedStyleDeclaration> =
  isIntro =>
  ({text}: Theme) => {
    const lineHeight = getLineHeight(text, isIntro)

    // By default, Android sets this to `bold` – which breaks the font family.
    const platformDependentFontWeight: TextStyle['fontWeight'] =
      Platform.OS === 'android' ? 'normal' : undefined

    return {
      margins: {
        marginTop: 0,
        marginBottom: lineHeight,
      },
      paragraph: {
        fontSize: getFontSize(text, isIntro),
        lineHeight,
      },
      boldText: {
        fontFamily: text.fontFamily.bold,
        fontWeight: platformDependentFontWeight,
      },
      titleLevel1: {
        fontSize: text.fontSize.h1,
        lineHeight: text.lineHeight.h1 * text.fontSize.h1,
      },
      titleLevel2: {
        fontSize: text.fontSize.h2,
        lineHeight: text.lineHeight.h2 * text.fontSize.h2,
      },
      titleLevel3: {
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3 * text.fontSize.h3,
      },
      titleLevel4: {
        fontSize: text.fontSize.h4,
        lineHeight: text.lineHeight.h4 * text.fontSize.h4,
      },
      titleLevel5: {
        fontSize: text.fontSize.h5,
        lineHeight: text.lineHeight.h5 * text.fontSize.h5,
      },
      titleLevel6: {
        fontSize: text.fontSize.h6,
        lineHeight: text.lineHeight.h6 * text.fontSize.h6,
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
      paddingLeft: text.fontSize.body,
      paddingRight: text.fontSize.body - 6,
      paddingTop: (text.lineHeight.body * text.fontSize.body) / 5,
    },
  },
})
