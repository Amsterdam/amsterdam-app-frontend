import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {Button, Gutter, Inset, Text} from '../ui'
import {Image} from '../ui/Image'

type Props = {
  newsArticles: NewsArticle[]
}

export const NewsItemsOverview = ({newsArticles}: Props) => {
  const navigation = useNavigation()
  return (
    <Inset style={styles.container}>
      {newsArticles.map(article => {
        return (
          <React.Fragment key={article.title}>
            <Button
              style={styles.button}
              onPress={() =>
                navigation.navigate('ProjectNews', {newsArticle: article})
              }>
              <View style={styles.imageWrapper}>
                <Image source={article.imageSource} />
              </View>
              <Gutter width={10} />
              <View style={styles.textWrapper}>
                <Text>{article.title}</Text>
              </View>
            </Button>
            <Gutter height={10} />
          </React.Fragment>
        )
      })}
    </Inset>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    minHeight: 120,
  },
  container: {
    backgroundColor: '#F5F5F5',
  },
  imageWrapper: {
    width: '40%',
    height: '100%',
  },
  textWrapper: {
    width: '60%',
  },
})
