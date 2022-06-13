import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {PleaseWait} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {useGetArticlesQuery} from '../../../../services/articles'
import {ArticleSummary} from '../../../../types'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ArticlePreview} from '.'
import {Title} from '@/components/ui/typography'

type Props = {
  limit?: number
  projectIds?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  title: string
}

export const ArticleOverview = ({
  limit,
  projectIds,
  sortBy,
  sortOrder,
  title,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProjectsStackParams, ProjectsRouteName.projectNews>
    >()
  const {data: articles, isLoading} = useGetArticlesQuery({
    limit,
    projectIds,
    sortBy,
    sortOrder,
  })

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

  return articles?.length ? (
    <Column gutter="sm">
      <Title level="h2" text={title} />
      {articles.map(article => (
        <ArticlePreview
          article={article}
          onPress={() => navigateToArticle(article)}
        />
      ))}
    </Column>
  ) : null
}
