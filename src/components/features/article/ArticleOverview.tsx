import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useGetArticlesQuery} from '../../../services/articles'
import {ArticleSummary} from '../../../types'
import {PleaseWait, Title} from '../../ui'
import {Column, Grid, GridCell} from '../../ui/layout'
import {ArticlePreview} from './'

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
    useNavigation<StackNavigationProp<StackParams, 'ProjectNews'>>()
  const {data: articles, isLoading} = useGetArticlesQuery({
    limit,
    projectIds,
    sortBy,
    sortOrder,
  })

  const navigateToArticle = (article: ArticleSummary) => {
    if (article.type === 'news') {
      navigation.navigate(routes.projectNews.name, {
        id: article.identifier,
      })
    } else if (article.type === 'warning') {
      navigation.navigate(routes.projectWarning.name, {
        id: article.identifier,
      })
    }
  }

  if (isLoading) {
    return <PleaseWait />
  }

  return articles?.length ? (
    <Column gutter="sm">
      <Title level={2} text={title} />
      <Grid>
        {articles.map(article => (
          <GridCell key={article.identifier}>
            <ArticlePreview
              article={article}
              onPress={() => navigateToArticle(article)}
            />
          </GridCell>
        ))}
      </Grid>
    </Column>
  ) : null
}
