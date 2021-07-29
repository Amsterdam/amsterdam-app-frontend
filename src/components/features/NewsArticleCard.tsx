import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {image, size} from '../../tokens'
import {Card, CardBody, Gutter, Image, Text} from '../ui'

type Props = {
  newsArticle: NewsArticle
  onPress: () => void
}

export const NewsArticleCard = ({onPress, newsArticle}: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.row}>
      <Card>
        <CardBody direction="row">
          <Image
            source={{uri: newsArticle.image_url}}
            style={styles.image}
            width={150}
          />
          <Gutter width={size.spacing.md} />
          <View style={styles.text}>
            <Text>{newsArticle.title}</Text>
          </View>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.default,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    flex: 1,
  },
})
