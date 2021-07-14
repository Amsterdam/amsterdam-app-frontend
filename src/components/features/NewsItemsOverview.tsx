import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {Gutter} from '../ui'
import {NewsArticleCard} from './NewsArticleCard'

type Props = {
  newsArticles: NewsArticle[]
}

export const NewsItemsOverview = ({newsArticles}: Props) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {newsArticles.map((article, index) => {
        return (
          <React.Fragment key={article.title}>
            <NewsArticleCard
              newsArticle={article}
              onPress={() =>
                navigation.navigate('ProjectNews', {newsArticle: article})
              }
            />
            {index < newsArticles.length - 1 && <Gutter height={15} />}
          </React.Fragment>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
})
