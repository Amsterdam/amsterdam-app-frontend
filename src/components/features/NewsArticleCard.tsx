import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {NewsArticle} from '../../data/projects'
import {Card, CardBody, Gutter, Text} from '../ui'
import {Image} from '../ui/Image'
import {image} from '../../tokens'

type Props = {
  newsArticle: NewsArticle
  onPress: () => void
}

export const NewsArticleCard = ({onPress, newsArticle}: Props) => (
  <TouchableHighlight onPress={onPress} style={styles.row}>
    <Card>
      <CardBody direction="row">
        <Image
          source={newsArticle.imageSource}
          style={styles.image}
          width={150}
        />
        <Gutter width={15} />
        <View style={styles.text}>
          <Text>{newsArticle.title}</Text>
        </View>
      </CardBody>
    </Card>
  </TouchableHighlight>
)

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
