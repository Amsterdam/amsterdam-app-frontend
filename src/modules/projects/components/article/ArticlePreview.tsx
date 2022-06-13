import React from 'react'
import {TouchableHighlight, View} from 'react-native'
import {Card, CardBody, Text} from '../../../../components/ui'
import {Row} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {useEnvironment} from '../../../../store'
import {ArticleSummary} from '../../../../types'
import {mapImageSources, mapWarningImageSources} from '../../../../utils'
import {Hero} from '@/components/ui/Hero'

type Props = {
  article: ArticleSummary
  onPress: () => void
}

export const ArticlePreview = ({article, onPress}: Props) => {
  const environment = useEnvironment()

  const getImageSources = () => {
    if (article.type === 'news') {
      const imageSources = article.image?.sources
      return mapImageSources(imageSources, environment)
    }
    const mainImageFromProjectWarning = article?.images?.find(
      image => image.main,
    )
    return mapWarningImageSources(
      mainImageFromProjectWarning?.sources,
      environment,
    )
  }

  const imageSources = getImageSources()

  return (
    <TouchableHighlight accessibilityRole="button" onPress={onPress}>
      <Card>
        <CardBody>
          <Row gutter="md" valign="center">
            {imageSources && Object.keys(imageSources[0]).length ? (
              <Image aspectRatio="vintage" source={imageSources} />
            ) : (
              <Hero />
            )}
            <View>
              <Text>{article.title}</Text>
            </View>
          </Row>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}
