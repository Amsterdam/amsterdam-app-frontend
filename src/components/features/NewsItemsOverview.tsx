import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {size} from '../../tokens'
import {Gutter} from '../ui'
import {NewsArticleCard} from './NewsArticleCard'

type Props = {
  newsArticles: NewsArticle[]
}

export const NewsItemsOverview = ({newsArticles}: Props) => {
  const navigation = useNavigation()
  return (
    <View>
      {newsArticles.map((article, index) => {
        return (
          <React.Fragment key={article.title}>
            <NewsArticleCard
              newsArticle={article}
              onPress={() =>
                navigation.navigate('ProjectNews', {newsArticle: article})
              }
            />
            {index < newsArticles.length - 1 && (
              <Gutter height={size.spacing.md} />
            )}
          </React.Fragment>
        )
      })}
    </View>
  )
}
