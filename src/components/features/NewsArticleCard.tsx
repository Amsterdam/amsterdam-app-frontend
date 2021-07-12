import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {Card, CardBody, Gutter, Text} from '../ui'
import {Image} from '../ui/Image'

type Props = {
  newsArticle: NewsArticle
  onPress: () => void
}

export const NewsArticleCard = ({onPress, newsArticle}: Props) => (
  <TouchableHighlight onPress={onPress} style={styles.wrapper}>
    <Card>
      <CardBody direction="row">
        <View style={styles.imageWrapper}>
          <Image source={newsArticle.imageSource} style={styles.image} />
        </View>
        <Gutter width={10} />
        <View style={styles.textWrapper}>
          <Text>{newsArticle.title}</Text>
        </View>
      </CardBody>
    </Card>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  image: {
    height: 80,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  imageWrapper: {
    width: '40%',
    height: '100%',
  },
  textWrapper: {
    width: '60%',
  },
})
