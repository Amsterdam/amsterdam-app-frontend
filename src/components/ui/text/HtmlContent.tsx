import {useCallback, useMemo, useState} from 'react'
import {
  LayoutChangeEvent,
  Platform,
  ScaledSize,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native'
import RenderHTML, {
  CustomBlockRenderer,
  CustomMixedRenderer,
  CustomTagRendererRecord,
  MixedStyleDeclaration,
} from 'react-native-render-html'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {ListItemMarker} from '@/components/ui/text/list/ListItemMarker'
import {type TestProps} from '@/components/ui/types'
import {promoteInlineLinks} from '@/components/ui/utils/promoteInlineLinks'
import {useIsScreenReaderEnabled} from '@/hooks/accessibility/useIsScreenReaderEnabled'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {TextTokens} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  content: string | undefined
  isIntro?: boolean
  transformRules?: HtmlTransformRule[]
} & TestProps

export type HtmlTransformRule = {
  find: RegExp
  replace: string
}

/**
 * Applies all transform rules to the content.
 */
const transformContent = (
  content: string,
  transformRules: HtmlTransformRule[] = [],
) =>
  transformRules.reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )

/**
 * Renders HTML content, applying the typographic design.
 */
export const HtmlContent = ({content, isIntro, transformRules}: Props) => {
  const [contentWidth, setContentWidth] = useState<number>(0)
  const baseStyle = useThemable(createBaseStyle)
  const styles = useThemable(createStyles(isIntro))
  const systemFonts = useThemable(createFontList)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width)
  }, [])

  const html = useMemo(() => {
    if (!content) {
      return
    }

    const transformedContent = transformContent(content, transformRules)

    return isScreenReaderEnabled
      ? promoteInlineLinks(transformedContent)
      : transformedContent
  }, [content, isScreenReaderEnabled, transformRules])

  const tagsStyles: Record<string, MixedStyleDeclaration> = useMemo(
    () => ({
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
    }),
    [styles],
  )

  if (!html) {
    return null
  }

  return (
    <View onLayout={onLayoutChange}>
      <RenderHTML
        baseStyle={baseStyle}
        contentWidth={contentWidth}
        renderers={renderers}
        source={{html}}
        systemFonts={systemFonts}
        tagsStyles={tagsStyles}
      />
    </View>
  )
}

const getFontSize = (text: TextTokens, isIntro = false) =>
  isIntro ? text.fontSize.intro : text.fontSize.body

const getLineHeight = (text: TextTokens, isIntro = false) =>
  isIntro ? text.lineHeight.intro : text.lineHeight.body

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
        lineHeight: text.lineHeight.h1,
      },
      titleLevel2: {
        fontSize: text.fontSize.h2,
        lineHeight: text.lineHeight.h2,
      },
      titleLevel3: {
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3,
      },
      titleLevel4: {
        fontSize: text.fontSize.h4,
        lineHeight: text.lineHeight.h4,
      },
      titleLevel5: {
        fontSize: text.fontSize.h5,
        lineHeight: text.lineHeight.h5,
      },
      titleLevel6: {
        fontSize: text.fontSize.h6,
        lineHeight: text.lineHeight.h6,
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

// An unordered list only renders its children, without the bullet point and any spacing.
const UlRenderer: CustomBlockRenderer = ({TNodeChildrenRenderer, ...props}) => (
  <TNodeChildrenRenderer {...props} />
)

const createLiMarkerStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      paddingTop: 2 * fontScale, // Adjusts for spacing in probably the library’s internal custom renderer.
    },
  })

const LiMarker = () => {
  const {fontScale} = useDeviceContext()
  const styles = createLiMarkerStyles(fontScale)

  return (
    <ListItemMarker
      additionalStyles={styles.marker}
      marker="square"
      testID="ListItemMarker"
    />
  )
}

// A list item in an unordered list renders the correct bullet point encoded in the font.
// The `Column` with the `flex` prop allows the list item children to shrink and fit the row.
const LiRenderer: CustomBlockRenderer = props => {
  const {TDefaultRenderer, TNodeChildrenRenderer} = props

  if (props.tnode.parent?.tagName === 'ul') {
    return (
      <Row>
        <LiMarker />
        <Column flex={1}>
          <TNodeChildrenRenderer {...props} />
        </Column>
      </Row>
    )
  }

  return <TDefaultRenderer {...props} />
}

const ARenderer: CustomMixedRenderer = props => {
  const {href} = props.tnode.attributes
  const openUrl = useOpenUrl()

  const {TNodeChildrenRenderer} = props

  return (
    <InlineLink
      onPress={() => openUrl(href)}
      testID="HtmlRendererAInlineLink">
      <TNodeChildrenRenderer {...props} />
    </InlineLink>
  )
}

const renderers: CustomTagRendererRecord = {
  ul: UlRenderer,
  li: LiRenderer,
  a: ARenderer,
}
