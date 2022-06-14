import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {PleaseWait} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {useGetArticlesQuery} from '../../../../services/articles'
import {ArticleSummary} from '../../../../types'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ArticlePreview} from '.'
import {Paragraph, Title} from '@/components/ui/typography'
import {Theme, useThemable} from '@/themes'
import {formatDate, isEmptyObject} from '@/utils'

type Props = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  title: string
}

type YearlyArticleSections = Record<string, ArticleSummary[]>

const getYearOfPublicationDate = (date: string) => formatDate(date).slice(-4)

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
      StackNavigationProp<ProjectsStackParams, ProjectsRouteName.projectNews>
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
      const foo = articles.reduce((result: YearlyArticleSections, article) => {
        const year = getYearOfPublicationDate(article.publication_date)
        return {
          ...result,
          [year]: {...result[year], [article.identifier]: article},
        }
      }, {})
      setYearlyArticleSections(foo)
    }
  }, [articles])

  const navigateToArticle = (article: ArticleSummary) => {
    if (article.type === 'news') {
      navigation.navigate(ProjectsRouteName.projectNews, {
        id: article.identifier,
      })
    } else if (article.type === 'warning') {
      navigation.navigate(ProjectsRouteName.projectWarning, {
        id: article.identifier,
      })
    }
  }

  if (isLoading) {
    return <PleaseWait />
  }

  return articles && yearlyArticleSections ? (
    <View style={styles.list}>
      <Column gutter="sm">
        <Title level="h2" text={title} />
        {!isEmptyObject(yearlyArticleSections) &&
          Object.keys(yearlyArticleSections).map((year, index) => (
            <View key={Object.keys(yearlyArticleSections)[index]}>
              {index > 0 && (
                <View style={styles.year}>
                  <Paragraph>{year}</Paragraph>
                </View>
              )}
              {Object.values(yearlyArticleSections[year]).map(article => (
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
