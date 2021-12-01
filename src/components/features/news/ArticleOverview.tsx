import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {DeviceContext} from '../../../providers'
import {size} from '../../../tokens'
import {Image, NewsArticle} from '../../../types'
import {Box, Title} from '../../ui'
import {Gutter} from '../../ui/layout'
import {ArticleOverviewItem} from './'

type Props = {
  projectId: string
}

type ArticleTeaser = {
  identifier: string
  image: Image | undefined
  title: string
}

export const ArticleOverview = ({projectId}: Props) => {
  const deviceContext = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()

  const newsArticles = useFetch<NewsArticle[]>({
    url: getEnvironment().apiUrl + '/project/news_by_project_id',
    options: {
      params: {'project-identifier': projectId},
    },
  })

  if (!newsArticles.data) {
    return null
  }

  const articleTeasers: ArticleTeaser[] = []

  newsArticles.data.forEach(article =>
    articleTeasers.push({
      identifier: article.identifier,
      image: article.images?.[0],
      title: article.title,
    }),
  )

  return (
    <Box>
      <Gutter height={size.spacing.md} />
      <Title level={2} text="Nieuws" />
      <Gutter height={size.spacing.sm} />
      <View style={deviceContext.isLandscape && styles.grid}>
        {newsArticles.data.map((article, index) => (
          <View
            key={`article-${index}`}
            style={[
              deviceContext.isLandscape && styles.item,
              styles.verticalGutter,
            ]}>
            <ArticleOverviewItem
              articleImage={article.images?.find(i => i.sources['220px'].url)}
              onPress={() =>
                navigation.navigate(routes.projectNews.name, {
                  id: article.identifier,
                })
              }
              title={article.title}
            />
          </View>
        ))}
      </View>
    </Box>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    paddingRight: 16,
  },
  verticalGutter: {
    paddingBottom: 16,
  },
})
