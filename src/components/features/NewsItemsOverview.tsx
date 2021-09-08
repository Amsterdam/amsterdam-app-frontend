import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../../App'
import {getEnvironment} from '../../environment'
import {useFetch} from '../../hooks'
import {size} from '../../tokens'
import {NewsArticleList} from '../../types'
import {Box, Gutter, Title} from '../ui'
import {NewsArticleCard} from './NewsArticleCard'

type Props = {
  projectId: string
}

export const NewsItemsOverview = ({projectId}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()
  const news = useFetch<NewsArticleList>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {
      params: {'project-identifier': projectId},
    },
  })

  return news.data?.length ? (
    <Box background="light">
      <Gutter height={size.spacing.md} />
      <Title level={2} text="Nieuws" />
      <Gutter height={size.spacing.sm} />
      {news.data?.map((article, index) => (
        <React.Fragment key={article.title}>
          <NewsArticleCard
            newsArticle={article}
            onPress={() =>
              navigation.navigate(routes.projectNews.name, {article})
            }
          />
          {index < (news.data?.length ?? 0) - 1 && (
            <Gutter height={size.spacing.md} />
          )}
        </React.Fragment>
      ))}
    </Box>
  ) : null
}
