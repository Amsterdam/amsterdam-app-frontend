import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {View} from 'react-native'
import {routes} from '../../../App'
import {useFetch} from '../../hooks'
import {size} from '../../tokens'
import {NewsArticleList} from '../../types'
import {Gutter} from '../ui'
import {NewsArticleCard} from './NewsArticleCard'

export const NewsItemsOverview = () => {
  const navigation = useNavigation()
  const news = useFetch<NewsArticleList>({
    url: 'https://www.amsterdam.nl/projecten/kademuren/maatregelen-vernieuwing/da-costakade-vernieuwing-kademuren/nieuws-da-costakade/',
    options: {
      params: {
        new_json: 'true',
      },
    },
  })

  return (
    <View>
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
    </View>
  )
}
