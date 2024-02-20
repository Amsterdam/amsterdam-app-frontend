import {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {useSelector} from '@/hooks/redux/useSelector'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'
import {ArticlesItem} from '@/modules/construction-work/types/api'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {useTheme} from '@/themes/useTheme'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {getDateDiffInDays} from '@/utils/datetime/getDateDiffInDays'

type Props = {
  article: ArticlesItem
  isFirst: boolean
  isLast: boolean
  onPress: () => void
} & TestProps

export const ArticlePreview = ({
  article,
  isFirst,
  isLast,
  onPress,
  testID,
}: Props) => {
  const [isNewAndUnreadArticle, setIsNewAndUnreadArticle] =
    useState<boolean>(false)
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const {meta_id, publication_date} = article

  useEffect(() => {
    setIsNewAndUnreadArticle(
      getDateDiffInDays(publication_date) <= recentArticleMaxAge &&
        !readArticles.find(({id}) => id === getUniqueArticleId(meta_id)),
    )
  }, [meta_id, publication_date, readArticles])

  const {media} = useTheme()
  const imageWidth = media.figureHeight.lg
  const imageHeight = imageWidth / media.aspectRatio.extraWide
  const styles = useThemable(
    createStyles({isFirst, isLast}, imageWidth, isNewAndUnreadArticle),
  )

  const imageSources = article.images?.[0]?.sources

  return (
    <View
      style={styles.item}
      testID={testID}>
      <View style={styles.line} />
      <PressableBase
        accessibilityRole="button"
        onPress={onPress}
        style={styles.button}
        testID={`${testID}Button`}>
        <Column gutter="sm">
          <View style={styles.dateLine}>
            <Row
              gutter="sm"
              valign="center">
              <View style={styles.horizontalLine} />
              {!!isNewAndUnreadArticle && (
                <View style={styles.update}>
                  <Paragraph>Nieuw</Paragraph>
                </View>
              )}
              <Paragraph testID={`${testID}Date`}>
                {formatDateToDisplay(article.publication_date)}
              </Paragraph>
            </Row>
          </View>
          <Box insetHorizontal="md">
            <Column gutter="sm">
              <Title
                color="link"
                level="h5"
                testID={testID ? `${testID}Title` : undefined}
                text={article.title}
              />
              <View style={styles.image}>
                {imageSources && imageSources.length > 0 ? (
                  <LazyImage
                    aspectRatio="extraWide"
                    source={imageSources}
                    testID={testID ? `${testID}Image` : undefined}
                  />
                ) : (
                  <FigureWithFacadesBackground
                    aspectRatio="extraWide"
                    height={imageHeight}
                    Image={<ProjectWarningFallbackImage />}
                    imageAspectRatio={media.aspectRatio.extraWide}
                    testID={`${testID}Image`}
                  />
                )}
              </View>
            </Column>
          </Box>
        </Column>
      </PressableBase>
    </View>
  )
}

const LINE_WIDTH = 2
const VERTICAL_LINE_TOP_WITH_ALERT = 18
const VERTICAL_LINE_TOP_WITHOUT_ALERT = 15
const DATE_LINE_OFFSET = 4

const createStyles =
  (
    {isFirst, isLast}: Partial<Props>,
    imageWidth: number,
    isNewAndUnreadArticle: boolean | undefined,
  ) =>
  ({color, size}: Theme) => {
    const itemBottomInset = isLast ? 0 : size.spacing.xl

    const dateLineOffset = isNewAndUnreadArticle ? 0 : DATE_LINE_OFFSET

    return StyleSheet.create({
      button: {
        paddingLeft: size.spacing.md,
      },
      dateLine: {
        paddingLeft: dateLineOffset,
      },
      horizontalLine: {
        position: 'absolute',
        left: -(size.spacing.md + dateLineOffset),
        height: LINE_WIDTH,
        width: size.spacing.md,
        backgroundColor: color.text.default,
      },
      image: {
        width: imageWidth,
      },
      item: {
        paddingBottom: itemBottomInset,
      },
      line: {
        bottom: -itemBottomInset,
        position: 'absolute',
        top: isFirst
          ? isNewAndUnreadArticle
            ? VERTICAL_LINE_TOP_WITH_ALERT
            : VERTICAL_LINE_TOP_WITHOUT_ALERT
          : 0,
        left: 0,
        zIndex: -1,
        width: LINE_WIDTH,
        backgroundColor: color.text.default,
      },
      update: {
        backgroundColor: color.box.background.alert,
        paddingHorizontal: size.spacing.sm,
        paddingVertical: size.spacing.xs,
      },
    })
  }
