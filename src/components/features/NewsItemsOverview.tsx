import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {useEffect} from 'react'
import {View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {size} from '../../tokens'
import {Gutter} from '../ui'
import {NewsArticleCard} from './NewsArticleCard'

const URL_NEWSFEED =
  'https://www.amsterdam.nl/projecten/kademuren/maatregelen-vernieuwing/da-costakade-vernieuwing-kademuren/nieuws-da-costakade/?new_json=true'

export const NewsItemsOverview = () => {
  const [news, setNews] = useState<NewsArticle[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    fetch(URL_NEWSFEED)
      .then(response => response.json())
      .then((data: NewsArticle[]) => setNews(data))
  }, [])

  return (
    <View>
      {news &&
        news.map((article, index) => {
          return (
            <React.Fragment key={article.title}>
              <NewsArticleCard
                newsArticle={article}
                onPress={() =>
                  navigation.navigate('ProjectNews', {newsArticle: article})
                }
              />
              {index < news.length - 1 && <Gutter height={size.spacing.md} />}
            </React.Fragment>
          )
        })}
    </View>
  )
}
