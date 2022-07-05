import React, {useMemo} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Hero} from '@/components/ui/Hero'
import {Column, Row} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Link, Paragraph} from '@/components/ui/text'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/construction-work.slice'
import {useEnvironment} from '@/store'
import {Theme, useThemable} from '@/themes'
import {ArticleSummary} from '@/types'
import {
  formatDateToDisplay,
  getDateDiffInDays,
  mapImageSources,
  mapWarningImageSources,
} from '@/utils'

type Props = {
  article: ArticleSummary
  isFirst: boolean
  isLast: boolean
  onPress: () => void
}

export const ArticlePreview = ({article, isFirst, isLast, onPress}: Props) => {
  const environment = useEnvironment()
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const getImageSources = () => {
    if (article.type === 'news') {
      return mapImageSources(article.image?.sources, environment)
    }
    const mainImageFromProjectWarning = article?.images?.find(
      image => image.main,
    )
    return mapWarningImageSources(
      mainImageFromProjectWarning?.sources,
      environment,
    )
  }

  const imageSources = getImageSources()

  const isNewAndUnreadArticle = useMemo(() => {
    return (
      getDateDiffInDays(article.publication_date) <= 3 &&
      !readArticles.find(readArticle => readArticle.id === article.identifier)
    )
  }, [article.identifier, article.publication_date, readArticles])

  const styles = useThemable(
    createStyles({isFirst, isLast}, isNewAndUnreadArticle),
  )

  return (
    <View style={styles.item}>
      <View style={styles.line} />
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.button}>
        <Column gutter="sm">
          <Row gutter="md" valign="center">
            <View style={styles.horizontalLine} />
            {isNewAndUnreadArticle && (
              <View style={styles.update}>
                <Paragraph>Nieuw</Paragraph>
              </View>
            )}
            <Paragraph>
              {formatDateToDisplay(article.publication_date)}
            </Paragraph>
          </Row>
          <Box insetHorizontal="md">
            <Column gutter="sm">
              <Link label={article.title} level="h4" />
              <View style={styles.image}>
                {imageSources && Object.keys(imageSources[0]).length ? (
                  <Image aspectRatio="wide" source={imageSources} />
                ) : (
                  <Hero />
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
    isNewAndUnreadArticle: boolean | undefined,
  ) =>
  ({color, size}: Theme) => {
    const itemBottomInset = isLast ? 0 : -size.spacing.xl
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
        paddingRight: size.spacing.xxl,
      },
      item: {
        paddingBottom: isLast ? 0 : size.spacing.xl,
      },
      line: {
        bottom: itemBottomInset,
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
