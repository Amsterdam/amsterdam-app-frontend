import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {OrientationContext} from '../../../providers'
import {size} from '../../../tokens'
import {NewsArticleList} from '../../../types'
import {Box, Title} from '../../ui'
import {Gutter} from '../../ui/layout'
import {NewsArticleOverviewItem} from './'

type Props = {
  projectId: string
}

export const NewsArticleOverview = ({projectId}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()
  const news = useFetch<NewsArticleList>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {
      params: {'project-identifier': projectId},
    },
  })
  const orientationContext = useContext(OrientationContext)

  if (!news.data || !news.data?.length) {
    return null
  }

  return (
    <Box>
      <Gutter height={size.spacing.md} />
      <Title level={2} text="Nieuws" />
      <Gutter height={size.spacing.sm} />
      <View style={orientationContext.isLandscape && styles.grid}>
        {news.data.map((article, index) => (
          <View
            key={`article-${index}`}
            style={[
              orientationContext.isLandscape && styles.item,
              styles.verticalGutter,
            ]}>
            <NewsArticleOverviewItem
              newsArticle={article}
              onPress={() =>
                navigation.navigate(routes.projectNews.name, {article})
              }
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
