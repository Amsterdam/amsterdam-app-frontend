import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import HeroImage from '../../../assets/images/project-warning-hero.svg'
import {image as imageTokens} from '../../../tokens'
import {ArticleSummary} from '../../../types'
import {mapImageSources, mapWarningImageSources} from '../../../utils'
import {Card, CardBody, Image, Text} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  article: ArticleSummary
  onPress: () => void
}

export const ArticlePreview = ({article, onPress}: Props) => {
  const getImageSources = () => {
    if (article.type === 'news') {
      const imageSources = article.image?.sources
      return mapImageSources(imageSources)
    }
    const mainImageFromProjectWarning = article?.images?.find(
      image => image.main,
    )
    return mapWarningImageSources(mainImageFromProjectWarning?.sources)
  }

  const imageSources = getImageSources()

  return (
    <TouchableHighlight
      accessibilityRole="button"
      onPress={onPress}
      style={styles.row}>
      <Card>
        <CardBody>
          <Row gutter="md">
            {imageSources && Object.keys(imageSources[0]).length ? (
              <Image source={imageSources} style={styles.image} />
            ) : (
              <View style={styles.image}>
                <HeroImage />
              </View>
            )}
            <View style={styles.text}>
              <Text>{article.title}</Text>
            </View>
          </Row>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    aspectRatio: imageTokens.aspectRatio.vintage,
    flex: 1,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    flex: 2, // Also prevents overflow
  },
})
