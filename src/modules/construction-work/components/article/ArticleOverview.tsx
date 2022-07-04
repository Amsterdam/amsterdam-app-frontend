import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {PleaseWait} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ArticlePreview} from '@/modules/construction-work/components/article'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {useGetArticlesQuery} from '@/services/articles'
import {Theme, useThemable} from '@/themes'
import {ArticleSummary} from '@/types'
import {getYearOfPublicationDate, isEmptyObject} from '@/utils'

type Props = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  title: string
}

type YearlyArticleSections = Record<string, ArticleSummary[]>

export const ArticleOverview = ({
  limit,
  projectIds,
  sortBy,
  sortOrder,
  title,
}: Props) => {
  const [yearlyArticleSections, setYearlyArticleSections] = useState<
    YearlyArticleSections | undefined
  >()
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
    projectIds,
    sortBy,
    sortOrder,
  })

  useEffect(() => {
    if (articles) {
      const sections = articles.reduce(
        (result: YearlyArticleSections, article) => {
          const year = getYearOfPublicationDate(article.publication_date)
          return {
            ...result,
            [year]: {...result[year], [article.identifier]: article},
          }
        },
        {},
      )
      setYearlyArticleSections(sections)
    }
  }, [articles])

  const navigateToArticle = (article: ArticleSummary) => {
    if (article.type === 'news') {
      navigation.navigate(ConstructionWorkRouteName.projectNews, {
        id: article.identifier,
      })
    } else if (article.type === 'warning') {
      navigation.navigate(ConstructionWorkRouteName.projectWarning, {
        id: article.identifier,
      })
    }
  }

  if (isLoading) {
    return <PleaseWait />
  }

  return articles &&
    yearlyArticleSections &&
    !isEmptyObject(yearlyArticleSections) ? (
    <View style={styles.list}>
      <Column gutter="sm">
        <Title level="h2" text={title} />
        {Object.entries(yearlyArticleSections)
          .reverse()
          .map(([year, articlesPerYear], index) => (
            <View key={year + index}>
              {index > 0 && (
                <View style={styles.year}>
                  <Paragraph>{year}</Paragraph>
                </View>
              )}
              {Object.values(articlesPerYear).map(article => (
                <ArticlePreview
                  article={article}
                  isFirst={
                    articles.findIndex(
                      a => a.identifier === article.identifier,
                    ) === 0
                  }
                  isLast={
                    articles.findIndex(
                      a => a.identifier === article.identifier,
                    ) ===
                    articles.length - 1
                  }
                  key={article.identifier}
                  onPress={() => navigateToArticle(article)}
                />
              ))}
            </View>
          ))}
      </Column>
    </View>
  ) : null
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    list: {
      marginBottom: size.spacing.lg,
    },
    year: {
      backgroundColor: 'white',
      left: -4,
      position: 'relative',
      zIndex: 2,
    },
  })