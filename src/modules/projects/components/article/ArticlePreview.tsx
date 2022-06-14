import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {Column, Row} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {useEnvironment} from '../../../../store'
import {ArticleSummary} from '../../../../types'
import {
  cutAmountOfCharsFromString,
  formatDate,
  mapImageSources,
  mapWarningImageSources,
} from '../../../../utils'
import {selectNotificationSettings} from '@/components/features/notifications'
import {Hero} from '@/components/ui/Hero'
import {Link, Paragraph} from '@/components/ui/typography'
import {Theme, useThemable} from '@/themes'

type Props = {
  article: ArticleSummary
  isFirst: boolean
  isLast: boolean
  onPress: () => void
}

const getDateDiffInDays = (date: string) => {
  return dayjs().diff(dayjs(date), 'day')
}

const formatDateToDisplay = (date: string) => {
  const dateToDisplay = formatDate(date)
  const dateToDisplayWithoutYear = cutAmountOfCharsFromString({
    text: dateToDisplay,
    amount: 5,
    position: 'end',
  })
  return dateToDisplayWithoutYear
}

export const ArticlePreview = ({article, isFirst, isLast, onPress}: Props) => {
  const environment = useEnvironment()
  const [isNew, setNew] = useState<boolean>()
  const styles = useThemable(createStyles({isFirst, isLast}, isNew))
  const {readIds} = useSelector(selectNotificationSettings)

  useEffect(() => {
    getDateDiffInDays(article.publication_date) <= 3 ? setNew(true) : false
  }, [article])

  const getImageSources = () => {
    if (article.type === 'news') {
      const imageSources = article.image?.sources
      return mapImageSources(imageSources, environment)
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
            {isNew && !readIds.includes(article.identifier) && (
              <View style={styles.update}>
                <Paragraph>Nieuw</Paragraph>
              </View>
            )}
            <Paragraph>
              {formatDateToDisplay(article.publication_date)}
            </Paragraph>
          </Row>
          <Link label={article.title} level="h4" />
          <View style={styles.image}>
            {imageSources && Object.keys(imageSources[0]).length ? (
              <Image aspectRatio="wide" source={imageSources} />
            ) : (
              <Hero />
            )}
          </View>
        </Column>
      </Pressable>
    </View>
  )
}

const lineThickness = 2
const verticalLineTopWithAlert = 18
const verticalLineTopWithoutAlert = 15

const createStyles =
  ({isFirst, isLast}: Partial<Props>, isNew: boolean | undefined) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
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
        position: 'absolute',
        top: isFirst
          ? isNew
            ? verticalLineTopWithAlert
            : verticalLineTopWithoutAlert
          : 0,
        left: 0,
        zIndex: -1,
        width: lineThickness,
        height: isLast ? '100%' : '120%',
        backgroundColor: color.text.default,
      },
      update: {
        backgroundColor: color.box.background.alert,
        paddingHorizontal: size.spacing.sm,
        paddingVertical: size.spacing.xs,
      },
    })
