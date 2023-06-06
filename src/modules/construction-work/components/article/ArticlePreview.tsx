import {useEffect, useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {FigureWithFacadesBackground, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {TestProps} from '@/components/ui/types'
import {ProjectWarningFallbackImage} from '@/modules/construction-work/assets/images'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'
import {ArticleSummary} from '@/modules/construction-work/types'
import {getProjectWarningMainImageInfo} from '@/modules/construction-work/utils/getProjectWarningMainImageInfo'
import {Theme, useThemable, useTheme} from '@/themes'
import {formatDateToDisplay, getDateDiffInDays, mapImageSources} from '@/utils'

type Props = {
  article: ArticleSummary
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

  const imageSources =
    article.type === 'news'
      ? mapImageSources(article.image?.sources)
      : getProjectWarningMainImageInfo(article)?.sources

  useEffect(() => {
    setIsNewAndUnreadArticle(
      getDateDiffInDays(article.publication_date) <= recentArticleMaxAge &&
        !readArticles.find(
          readArticle => readArticle.id === article.identifier,
        ),
    )
  }, [article.identifier, article.publication_date, readArticles])

  const {media} = useTheme()
  const imageWidth = media.figureHeight.lg
  const imageHeight = imageWidth / media.aspectRatio.extraWide
  const styles = useThemable(
    createStyles({isFirst, isLast}, imageWidth, isNewAndUnreadArticle),
  )

  return (
    <View style={styles.item} testID={testID}>
      <View style={styles.line} />
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.button}>
        <Column gutter="sm">
          <Row gutter="md" valign="center">
            <View style={styles.horizontalLine} />
            {!!isNewAndUnreadArticle && (
              <View style={styles.update}>
                <Paragraph>Nieuw</Paragraph>
              </View>
            )}
            <Paragraph testID={testID ? `${testID}Date` : undefined}>
              {formatDateToDisplay(article.publication_date)}
            </Paragraph>
          </Row>
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
                  <Image
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
                    testID={testID ? `${testID}Image` : undefined}
                  />
                )}
              </View>
            </Column>
          </Box>
        </Column>
      </Pressable>
    </View>
  )
}

const lineThickness = 2
const verticalLineTopWithAlert = 18
const verticalLineTopWithoutAlert = 15

const createStyles =
  (
    {isFirst, isLast}: Partial<Props>,
    imageWidth: number,
    isNewAndUnreadArticle: boolean | undefined,
  ) =>
  ({color, size}: Theme) => {
    const itemBottomInset = isLast ? 0 : size.spacing.xl
    return StyleSheet.create({
      button: {
        paddingLeft: size.spacing.md,
      },
      horizontalLine: {
        position: 'absolute',
        left: -size.spacing.md,
        height: lineThickness,
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
            ? verticalLineTopWithAlert
            : verticalLineTopWithoutAlert
          : 0,
        left: 0,
        zIndex: -1,
        width: lineThickness,
        backgroundColor: color.text.default,
      },
      update: {
        backgroundColor: color.box.background.alert,
        paddingHorizontal: size.spacing.sm,
        paddingVertical: size.spacing.xs,
      },
    })
  }
