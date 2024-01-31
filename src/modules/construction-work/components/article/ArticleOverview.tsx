import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {type TitleParams} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ArticlePreview} from '@/modules/construction-work/components/article/ArticlePreview'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useArticlesQuery} from '@/modules/construction-work/service'
import {type ArticlesItem} from '@/modules/construction-work/types/api'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'
import {type Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {getYearOfPublicationDate} from '@/utils/datetime/getYearOfPublicationDate'

type Props = {
  projectId: number
  projectTitle: string
  title: string
}

type YearlyArticleSection = {
  data: ArticlesItem[]
  title: string
}

export const ArticleOverview = ({projectId, projectTitle, title}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const styles = useThemable(createStyles)
  const {data: articles, isLoading} = useArticlesQuery(
    projectId !== undefined
      ? {
          project_ids: projectId?.toString(),
        }
      : skipToken,
  )
  const {markMultipleAsRead} = useMarkArticleAsRead()

  const yearlyArticleSections = articles?.reduce(
    (result: YearlyArticleSection[], article) => {
      const year = getYearOfPublicationDate(article.publication_date)
      const section = result.find(s => s.title === year)

      if (section) {
        section.data.push(article)
      } else {
        result.push({title: year, data: [article]})
      }

      return result
    },
    [] as YearlyArticleSection[],
  )

  useEffect(
    () =>
      navigation.addListener('blur', () => {
        const {index, routes} = navigation.getState()

        if (
          routes[index].name === ConstructionWorkRouteName.constructionWork &&
          articles
        ) {
          markMultipleAsRead(articles)
        }
      }),
    [articles, markMultipleAsRead, navigation],
  )

  const navigateToArticle = ({
    meta_id: {id, type},
    title: articleTitle,
  }: ArticlesItem) => {
    const params: TitleParams & {id: number; projectId?: number | undefined} = {
      id,
      projectId,
      screenHeaderTitle: projectTitle,
      screenTitle: `${projectTitle} - ${articleTitle}`,
    }

    if (type === 'warning') {
      navigation.navigate(ConstructionWorkRouteName.projectWarning, params)

      return
    }

    navigation.navigate(ConstructionWorkRouteName.projectNews, params)
  }

  if (isLoading || yearlyArticleSections === undefined) {
    return <PleaseWait />
  }

  if (!yearlyArticleSections.length) {
    return null
  }

  return (
    <View style={styles.list}>
      <Column gutter="sm">
        <Title
          level="h2"
          testID="ConstructionWorkProjectArticlesTitle"
          text={title}
        />
        {yearlyArticleSections.map(({title: sectionTitle, data}, index) => (
          <View key={sectionTitle + index.toString()}>
            {index > 0 && (
              <View style={styles.year}>
                <Paragraph>{sectionTitle}</Paragraph>
                <View style={styles.line} />
              </View>
            )}
            {data.map((article, dataIndex) => (
              <ArticlePreview
                article={article}
                isFirst={index === 0 && dataIndex === 0}
                isLast={
                  index === yearlyArticleSections.length - 1 &&
                  dataIndex === data.length - 1
                }
                key={getUniqueArticleId(article.meta_id)}
                onPress={() => navigateToArticle(article)}
                testID={'ConstructionWorkProjectArticlePreview'}
              />
            ))}
          </View>
        ))}
      </Column>
    </View>
  )
}

const yearInset = 4

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    line: {
      height: size.spacing.md,
      left: yearInset,
      width: 2,
      backgroundColor: color.text.default,
    },
    list: {
      marginBottom: size.spacing.lg,
    },
    year: {
      backgroundColor: color.background.cutout,
      left: -yearInset,
      position: 'relative',
      zIndex: 2,
    },
  })
