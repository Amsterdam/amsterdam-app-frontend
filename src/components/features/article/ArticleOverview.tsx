import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {DeviceContext} from '../../../providers'
import {size} from '../../../tokens'
import {ArticleSummary} from '../../../types'
import {PleaseWait, Title} from '../../ui'
import {Column} from '../../ui/layout'
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
  const [articles, setArticles] = useState<ArticleSummary[] | undefined>()
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'ProjectNews'>>()

  const articlesApi = useFetch<ArticleSummary[]>({
    url: getEnvironment().apiUrl + '/articles',
    options: {
      params: {
        ...(limit && {limit}),
        ...(projectIds && {'project-ids': projectIds.join(',')}),
        ...(sortBy && {'sort-by': sortBy}),
        ...(sortOrder && {'sort-order': sortOrder}),
      },
    },
  })

  useEffect(() => {
    articlesApi.data && setArticles(articlesApi.data)
  }, [articlesApi.data])

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

  if (articlesApi.isLoading) {
    return <PleaseWait />
  }

  return articles?.length ? (
    <Column gutter="sm">
      <Title level={2} text={title} />
      <View style={device.isLandscape && styles.grid}>
        {articles.map(article => (
          <View
            key={article.identifier}
            style={[device.isLandscape && styles.item, styles.verticalGutter]}>
            <ArticlePreview
              article={article}
              onPress={() => navigateToArticle(article)}
            />
          </View>
        ))}
      </View>
    </Column>
  ) : null
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    paddingRight: size.spacing.sm,
  },
  verticalGutter: {
    paddingBottom: size.spacing.sm,
  },
})
