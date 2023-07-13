import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ArticlePreview} from '@/modules/construction-work/components/article'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {useGetArticlesQuery} from '@/modules/construction-work/service'
import {ArticleSummary} from '@/modules/construction-work/types'
import {Theme, useThemable} from '@/themes'
import {getYearOfPublicationDate} from '@/utils'

type Props = {
  limit?: number
  projectId?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  title: string
}

type YearlyArticleSection = {
  data: ArticleSummary[]
  title: string
}

export const ArticleOverview = ({
  limit,
  projectId,
  sortBy,
  sortOrder,
  title,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName.projectNews
      >
    >()
  const styles = useThemable(createStyles)
  const {data: articles, isLoading} = useGetArticlesQuery({
    limit,
    projectIds: projectId ? [projectId] : [],
    sortBy,
    sortOrder,
  })
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

  const navigateToArticle = (article: ArticleSummary) => {
    if (article.type === 'news' || article.type === 'work') {
      navigation.navigate(ConstructionWorkRouteName.projectNews, {
        id: article.identifier,
        projectId,
      })
    } else if (article.type === 'warning') {
      navigation.navigate(ConstructionWorkRouteName.projectWarning, {
        id: article.identifier,
        projectId,
      })
    }
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
                key={article.identifier}
                onPress={() => navigateToArticle(article)}
                testID={`ConstructionWorkProjectArticle${article.identifier}Preview`}
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
